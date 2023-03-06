import CKEditor from "ckeditor4-react";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Switch,
  Upload,
} from "antd";
import { FormInstance } from "antd/lib/form";
import get from "lodash/get";
import { inject, observer } from "mobx-react";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { isGrantedAny, L, LNotification } from "@lib/abpUtility";
import { Language } from "@services/administrator/language/dto/language";
import NewsStore from "@stores/communication/newsStore";
import Stores from "@stores/storeIdentifier";
import utils from "@utils/utils";
import "./news-edit.less";
import NewsCategoryStore from "@stores/communication/newsCategoryStore";
import { toJS } from "mobx";
import trim from "lodash/trim";
import WrapPageScroll from "@components/WrapPageScroll";
import { PlusOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload/interface";
import last from "lodash/last";
import {
  buildFileUrlWithEncToken,
  filterOptions,
  image2Base64,
  notifySuccess,
} from "@lib/helper";
import { validateMessages } from "@lib/validation";
import { ImageFile } from "@models/File";
import noPhoto from "@assets/images/logo.svg";
import Select from "@components/Select";
import debounce from "lodash/debounce";
import { ruleNews } from "@scenes/communication/news/edit/form-validation";
import { appPermissions, ckeditorToolbar } from "@lib/appconst";
import { EventType } from "@models/communication/News";
import map from "lodash/map";
import AppComponentBase from "@components/AppComponentBase";
import moment from "moment";

const rules = {
  categoryId: [{ required: true }],
  projectIds: [{ required: true }],
  unitIds: [{ required: true }],
  sortOrder: [{ required: true }],
  ...ruleNews,
};

interface NewsEditState {
  selectedLanguage: string;
  editorError: boolean;
  saving: boolean;
  imageUrl: any;
  imageFile: File | Blob | undefined;
  image: ImageFile | null;
  isAllProject: boolean;
  isAllUnit: boolean;
  publishToProject: boolean;
  loading: boolean;
  buildings: any;
  unitTypes: any;
  units: any;
  filterUnit: any;
}

interface NewsEditProps extends RouteComponentProps {
  newsStore: NewsStore;
  newsCategoryStore: NewsCategoryStore;
}
const MAX_RESULT_COUNT = 1000;
@inject(Stores.NewsStore, Stores.NewsCategoryStore)
@observer
export default class NewsEditor extends AppComponentBase<
  NewsEditProps,
  NewsEditState
> {
  languages: Language[];
  form = React.createRef<FormInstance>();
  categoryParams = { maxResultCount: MAX_RESULT_COUNT, isActive: true };

  constructor(props: NewsEditProps) {
    super(props);
    this.languages = utils.getLanguages();

    this.state = {
      selectedLanguage:
        get(global["abp"], "localization.currentLanguage.name") ||
        this.languages[0].name,
      editorError: false,
      saving: false,
      imageUrl: null,
      imageFile: undefined,
      image: null,
      isAllProject: false,
      isAllUnit: false,
      publishToProject: true,
      loading: true,
      buildings: [],
      unitTypes: [],
      units: [],
      filterUnit: {
        maxResultCount: MAX_RESULT_COUNT,
        isActive: true,
        projectId: undefined,
        buildingId: undefined,
        typeId: undefined,
      },
    };
  }

  async componentDidMount() {
    const newsId = get(this.props, "match.params.id");
    const { newsStore, newsCategoryStore } = this.props;

    await Promise.all([newsCategoryStore.getAll(this.categoryParams)]);

    if (newsId) {
      await newsStore.getForEdit(newsId);
      newsStore.computeEditedNews();
      const images = await newsStore.getImage(newsStore.editedNews.uniqueId);
      if (images && images.length) {
        this.setState({
          image: images[0] as any,
          isAllProject: newsStore.editedNews.isAllProject,
          imageUrl: buildFileUrlWithEncToken((images[0] as any).fileUrl),
        });
      }
      const getComputedData =
        newsStore.editSingleLanguageNews[this.state.selectedLanguage];
      const categoryId = newsStore.editedNews?.categoryId || "";
      const projectIds = newsStore.editedNews?.isAllProject
        ? [-1]
        : toJS(newsStore.editedNews?.projectIds);
      const isPublicToProject =
        newsStore.editedNews.eventType === EventType.PROJECT;
      this.form.current?.setFieldsValue({
        ...getComputedData,
        categoryId,
        projectIds,
        eventType: isPublicToProject,
        unitIds: map(newsStore.editedNews.units, "id"),
        isActive: newsStore.editedNews?.isActive,
        sortOrder: newsStore.editedNews.sortOrder,
        startDate: moment(newsStore.editedNews?.startDate),
        endDate: moment(newsStore.editedNews?.endDate),
        isPublic: newsStore.editedNews?.isPublic,
        isHighlight: newsStore.editedNews?.isHighlight,
      });
      this.setState({
        publishToProject: isPublicToProject,
        units: newsStore.editedNews.units || [],
      });
    } else {
      newsStore.createEmptyNews();
    }

    this.setState({
      loading: false,
    });
  }

  componentWillUnmount(): void {
    this.props.newsStore.resetForm();
  }

  onChangeLanguage = (event) => {
    const { newsStore } = this.props;
    const formData = this.form.current?.getFieldsValue();
    newsStore.updateEditedSingleLanguageNews(this.state.selectedLanguage, {
      ...formData,
    });
    this.setState(
      { selectedLanguage: event.target.value, editorError: false },
      () => {
        const getData =
          this.props.newsStore.editSingleLanguageNews[
            this.state.selectedLanguage
          ];
        this.form.current?.setFieldsValue({
          ...getData,
          categoryId: formData?.categoryId,
          projectIds: formData?.projectIds,
          unitIds: formData?.unitIds,
          isActive: formData?.isActive,
          sortOrder: formData?.sortOrder,
          eventType: formData?.eventType,
        });
      }
    );
  };

  onContentChange = (event) => {
    const { selectedLanguage, editorError } = this.state;
    const content = event.editor.getData();
    this.props.newsStore.updateEditedSingleLanguageNews(selectedLanguage, {
      content,
    });
    if (editorError) {
      this.setState({ editorError: false });
    }
  };

  onSave = async () => {
    const editNewsId = get(this.props, "match.params.id");
    const { newsStore } = this.props;
    const { selectedLanguage, isAllProject } = this.state;
    const formData = this.form.current?.getFieldsValue() || {};

    this.form.current?.validateFields().then(() => {
      if (
        !trim(
          newsStore.editSingleLanguageNews[this.state.selectedLanguage].content
        )
      ) {
        this.setState({ editorError: true });
        return;
      }
      const computedData = newsStore.computeFormData(
        {
          subject: formData.subject,
          shortDescription: formData.shortDescription,
        },
        selectedLanguage
      );

      const payload = {
        ...computedData,
        isAllProject,
        projectIds: isAllProject ? [] : formData.projectIds,
        categoryId: formData.categoryId,
        sortOrder: formData.sortOrder,
        isActive: formData.isActive,
        eventType: formData.eventType ? 1 : 2,
        unitIds: formData.unitIds || [],
        startDate: moment(formData.startDate).toISOString(),
        endDate: moment(formData.endDate).toISOString(),
        isPublic: formData.isPublic,
        isHighlight: formData.isHighlight,
      };

      let updatedNews;
      this.setState({ saving: true }, async () => {
        if (editNewsId) {
          await newsStore.update({
            ...payload,
            id: newsStore.editedNews?.id,
          });
          updatedNews = newsStore.editedNews;
        } else {
          updatedNews = await newsStore.create(payload);
        }
        const { imageFile, image } = this.state;
        if (imageFile) {
          // activateOrDeactivate old file
          if (image) {
            await newsStore.deleteImage(image.guid);
          }
          await newsStore.uploadImage(
            updatedNews.uniqueId,
            this.state.imageFile
          );
        }
        notifySuccess(
          LNotification("SUCCESS"),
          LNotification(
            L(
              editNewsId
                ? "NEWS_UPDATE_SUCCESSFULLY"
                : "NEWS_CREATE_SUCCESSFULLY"
            )
          )
        );
        this.props.history.goBack();
      });
    });
  };

  renderButtonActions = () => (
    <Row>
      <Col flex="1"></Col>
      <Col className={"mr-2 ml-auto"}>
        <Button onClick={this.props.history?.goBack} shape="round">
          {L("BTN_CANCEL")}
        </Button>
      </Col>
      {isGrantedAny(appPermissions.news.create, appPermissions.news.update) && (
        <Col>
          <Button
            type="primary"
            onClick={this.onSave}
            loading={this.state.saving}
            shape="round"
          >
            {L("BTN_SAVE")}
          </Button>
        </Col>
      )}
    </Row>
  );

  uploadButton = () => (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">{L("BTN_UPLOAD")}</div>
    </div>
  );

  handleUploadChange = async (info: UploadChangeParam<any>) => {
    const { fileList = [] } = info;
    if (fileList.length) {
      const file = last(fileList)?.originFileObj;
      this.setState({
        imageFile: file,
        imageUrl: await image2Base64(file),
      });
    }
  };

  onPublishChange = (checked: boolean) => {
    this.setState({ publishToProject: checked });
    if (checked) {
      this.form.current?.setFields([
        {
          name: "unitIds",
          touched: false,
          validating: false,
          errors: [],
          value: [],
        },
        {
          name: "projectIds",
          touched: false,
          validating: false,
          errors: [],
          value: [],
        },
      ]);
    }
  };

  render() {
    const { newsCategoryStore } = this.props;

    const editorContent = get(
      this.props,
      `newsStore.editSingleLanguageNews[${this.state.selectedLanguage}].content`
    );

    return (
      <WrapPageScroll renderActions={this.renderButtonActions}>
        <div className="news-edit-container flex column">
          <div className="news-edit-banner">
            <img
              src={this.state.imageUrl || noPhoto}
              alt=""
              className={this.state.imageUrl ? "" : "no-photo"}
              style={{ objectFit: "cover" }}
            />
            <Upload
              name="avatar"
              accept=".jpg, .jpeg, .png"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={this.handleUploadChange}
            >
              {this.uploadButton()}
            </Upload>
          </div>
          <div className="news-edit-content">
            <h3>{L("NEWS_SELECT_LANGUAGE_TO_CREATE_UPDATE")}</h3>
            <Radio.Group
              value={this.state.selectedLanguage}
              onChange={this.onChangeLanguage}
            >
              {this.languages.map((lang) => (
                <Radio.Button key={lang.name} value={lang.name}>
                  <i className={lang.icon} />
                  &nbsp;{lang.displayName}
                </Radio.Button>
              ))}
            </Radio.Group>
            <Divider />
            <div className="news-edit-form mt-1">
              <Form
                ref={this.form}
                name="newsForm"
                layout="vertical"
                validateMessages={validateMessages}
                initialValues={{ isActive: true, eventType: true }}
                size="large"
              >
                <Row gutter={16}>
                  <Col md={{ span: 8 }} sm={{ span: 24 }}>
                    <Form.Item
                      name="categoryId"
                      label={L("NEWS_FILTER_CATEGORY")}
                      rules={rules.categoryId}
                    >
                      <Select
                        allowClear
                        showSearch
                        filterOption={filterOptions}
                      >
                        {newsCategoryStore.pageResult?.items?.map(
                          (category, index) => (
                            <Select.Option key={index} value={category.id}>
                              {category.name}
                            </Select.Option>
                          )
                        )}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col md={{ span: 8 }} sm={{ span: 24 }}>
                    <Form.Item
                      name={"sortOrder"}
                      label={L("FILTER_SORT_ORDER")}
                      rules={rules.sortOrder}
                    >
                      <InputNumber min={0} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col md={{ span: 6 }} sm={{ span: 24 }}>
                    <Form.Item
                      name="isActive"
                      label={L("NEWS_ACTIVE")}
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col md={{ span: 8 }} sm={{ span: 24 }}>
                    <Form.Item name={"startDate"} label={L("FILTER_STARTDATE")}>
                      <DatePicker className="w-100" />
                    </Form.Item>
                  </Col>
                  <Col md={{ span: 8 }} sm={{ span: 24 }}>
                    <Form.Item name={"endDate"} label={L("FILTER_ENDDATE")}>
                      <DatePicker className="w-100" />
                    </Form.Item>
                  </Col>
                  <Col md={{ span: 3 }} sm={{ span: 24 }}>
                    <Form.Item
                      name="isPublic"
                      label={L("NEWS_PUBLIC")}
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col md={{ span: 3 }} sm={{ span: 24 }}>
                    <Form.Item
                      name="isHighlight"
                      label={L("NEWS_HIGHLIGHT")}
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="subject"
                  label={L("NEWS_SUBJECT")}
                  rules={rules.subject}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="shortDescription"
                  label={L("NEWS_SHORT_DESCRIPTION")}
                  rules={rules.description}
                >
                  <Input.TextArea rows={3} />
                </Form.Item>
              </Form>
              <div className="flex column mt-1 mb-1">
                <div>
                  <span className="error">*</span>
                  <label>{L("NEWS_CONTENT")}</label>
                </div>
              </div>
              <div
                className={`flex column news-editor ${
                  this.state.editorError ? "error" : ""
                }`}
                style={{ minHeight: 200 }}
              >
                {!this.state.loading && (
                  <CKEditor
                    config={{
                      autoGrow_minHeight: 200,
                      language:
                        get(
                          global["abp"],
                          "localization.currentLanguage.name"
                        ) || this.languages[0].name,
                      ...ckeditorToolbar,
                    }}
                    data={editorContent}
                    onChange={debounce(this.onContentChange, 200)}
                  />
                )}
                {this.state.editorError && (
                  <span className="error">{L("NEWS_CONTENT_REQUIRED")}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </WrapPageScroll>
    );
  }
}
