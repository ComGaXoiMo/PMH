import React from 'react'

import {Col, Form, Row, Card, Tabs, Modal, Button} from 'antd'
import {isGrantedAny, L, LNotification} from '../../../../lib/abpUtility'
import {validateMessages} from '../../../../lib/validation'
import rules from './validation'
import {
  appPermissions,
  moduleIds,
  fileTypeGroup,
  workflowEvent,
} from '../../../../lib/appconst'
import {inject, observer} from 'mobx-react'
import Stores from '../../../../stores/storeIdentifier'
import FeedbackStore from '../../../../stores/communication/feedbackStore'
import WrapPageScroll from '../../../../components/WrapPageScroll'
import AppComponentBase from '../../../../components/AppComponentBase'
import WorkflowFormBuilder from '../../../workflow/formBuilder'
import WorkflowStore from '../../../../stores/workflow/workflowStore'
import {portalLayouts} from '../../../../components/Layout/Router/router.config'
import FileUploadWrap from '../../../../components/FileUpload'
import FileStore from '../../../../stores/common/fileStore'
import AuditLog from '../../../../components/AuditLog'
import AuditLogStore from '../../../../stores/common/auditLogStore'
import CommentStore from '../../../../stores/common/commentStore'
import SessionStore from '../../../../stores/sessionStore'
import CommentList from '../../../../components/CommentList'
import debounce from 'lodash/debounce'
import MasterDataStore from '@stores/master-data/masterDataStore'
import Spin from "antd/lib/spin"
import FormInput from "@components/FormItem/FormInput"
import userService from "@services/administrator/user/userService"
import FormSelect from "@components/FormItem/FormSelect"
import FormRating from "@components/FormItem/FormRating"

const {confirm} = Modal
const {TabPane} = Tabs
const tabKeys = {
  tabInfo: 'FEEDBACK_TAB_INFO',
  tabComment: 'FEEDBACK_TAB_COMMENTS',
  tabAuditLog: 'FEEDBACK_TAB_AUDIT_LOG'
}

export interface IFeedbackFormProps {
  match: any
  history: any
  feedbackStore: FeedbackStore
  masterDataStore: MasterDataStore
  workflowStore: WorkflowStore
  fileStore: FileStore
  auditLogStore: AuditLogStore
  commentStore: CommentStore
  sessionStore: SessionStore
}

@inject(
  Stores.FeedbackStore,
  Stores.MasterDataStore,
  Stores.WorkflowStore,
  Stores.UserStore,
  Stores.FileStore,
  Stores.AuditLogStore,
  Stores.CommentStore,
  Stores.SessionStore
)
@observer
class FeedbackDetail extends AppComponentBase<IFeedbackFormProps> {
  state = {
    isDirty: false,
    tabActiveKey: tabKeys.tabInfo,
    users: [] as any,
    feedbackTypes: [] as any,
    files: [] as any
  }
  formRef: any = React.createRef()

  async componentDidMount() {
    await Promise.all([
      this.getDetail(this.props.match?.params?.id),
      this.props.masterDataStore.getAllFeedbackTypes({})
    ])
  }

  getDetail = async (id?) => {
    // Init properties & custom field for workflow first
    const initWorkflow = await this.props.workflowStore.getWorkflowFields(moduleIds.feedback)
    if (!id) {
      await this.props.feedbackStore.createFeedback(initWorkflow.customFields)
    } else {
      await this.props.feedbackStore.get(id)
    }

    this.initData()
    this.initWorkflow(null, null, () => {
      this.formRef.current.setFieldsValue({
        ...this.props.feedbackStore.editFeedback
      })
    })
  }

  initData = () => {
    const {editFeedback} = this.props.feedbackStore
    if (editFeedback.id) {
      this.setState({users: [editFeedback.user]})
    }
  }

  initWorkflow = (event, value, cb?) => {
    if (this.props.match?.params?.id || this.props.feedbackStore.editFeedback?.workflow?.id) {
      if (cb) {
        return cb()
      }
      return
    }

    if (event === workflowEvent.init) {
      let defaultStatus = (this.props.workflowStore.wfStatus || []).find((item) => item.isDefault)
      let defaultRole = (this.props.workflowStore.wfRoles || []).find((item) => item.isDefault)
      let defaultPriority = (this.props.workflowStore.wfPriorities || []).find((item) => item.isDefault)

      if (this.props.feedbackStore.editFeedback?.workflow) {
        this.props.feedbackStore.editFeedback.workflow.statusId = defaultStatus?.id
        this.props.feedbackStore.editFeedback.workflow.roleId = defaultRole?.id
        this.props.feedbackStore.editFeedback.workflow.priorityId = defaultPriority?.id
      }

      if (cb) {
        return cb()
      }
      this.formRef.current.setFieldsValue({
        ...this.props.feedbackStore.editFeedback
      })
    }
  }

  onRemoveFile = (file) => {
    const index = this.state.files.indexOf(file)
    const newFileList = [...this.state.files]
    newFileList.splice(index, 1)
    this.setState({files: newFileList})
  }

  beforeUploadFile = (file) => {
    this.setState({files: [...this.state.files, file]})
    return false
  }

  onSave = () => {
    const form = this.formRef.current

    form.validateFields().then(async (values: any) => {
      if (this.props.feedbackStore.editFeedback?.id) {
        await this.props.feedbackStore.update(
          {
            ...this.props.feedbackStore.editFeedback,
            ...values
          },
          this.state.files
        )
      } else {
        await this.props.feedbackStore.create(values, this.state.files)
      }

      this.props.history.push(portalLayouts.communicationFeedback.path)
    })
  }

  onCancel = () => {
    if (this.state.isDirty) {
      confirm({
        title: LNotification('ARE_YOU_SURE'),
        okText: L('BTN_YES'),
        cancelText: L('BTN_NO'),
        onOk: () => {
          this.props.history.push(portalLayouts.communicationFeedback.path)
        }
      })
      return
    }
    this.props.history.push(portalLayouts.communicationFeedback.path)
  }

  findUsers = debounce(async (keyword) => {
    let users = await userService.filterOptions({
      isActive: true,
      keyword
    })
    this.setState({users})
  }, 200)

  selectUserProps = {
    onSearch: this.findUsers,
    onChange: async (userId) => {
      let user = (this.state.users || []).find((item) => item.id === userId)
      const currentForm = this.formRef.current
      if (currentForm && user) {
        currentForm.setFieldsValue({ user })
      }
    }
  }

  changeTab = (tabKey) => {
    this.setState({tabActiveKey: tabKey})
    // Refresh comment from Independent request
    if (tabKey === tabKeys.tabComment) {
      let params = {
        conversationUniqueId: this.props.feedbackStore.editFeedback?.workflow?.uniqueId,
        moduleId: moduleIds.feedback,
        maxResultCount: 10,
        skipCount: 0,
        isIncludeFile: true
      }
      this.props.commentStore.getAll(params)
    }
  }

  renderFeedbackId = () => {
    if (!this.props.feedbackStore.editFeedback?.id) {
      return ''
    }
    return (
      <b>
        {this.L('FEEDBACK_ID')}: {this.props.feedbackStore.editFeedback.id}
      </b>
    )
  }

  renderActions = (isLoading?) => {
    const {tabActiveKey} = this.state
    return (
      <Row>
        <Col sm={{span: 24, offset: 0}}>
          <Button className="mr-1" onClick={this.onCancel} shape="round">
            {L('BTN_CANCEL')}
          </Button>
          {tabActiveKey === tabKeys.tabInfo &&
          isGrantedAny(appPermissions.feedback.create, appPermissions.feedback.update) && (
            <Button type="primary" onClick={this.onSave} loading={isLoading} shape="round">
              {L('BTN_SAVE')}
            </Button>
          )}
        </Col>
      </Row>
    )
  }

  render() {
    const {
      feedbackStore: {editFeedback, isLoading},
      masterDataStore: {feedbackTypeOptions}
    } = this.props
    const {users} = this.state
    return (
      <WrapPageScroll renderActions={() => this.renderActions(isLoading)}>
        <Spin tip={L('LOADING')} spinning={isLoading || false}>
          <Tabs
            activeKey={this.state.tabActiveKey}
            onTabClick={this.changeTab}
            tabBarExtraContent={this.renderFeedbackId()}
          >
            <TabPane tab={L(tabKeys.tabInfo)} key={tabKeys.tabInfo}>
              <Card bordered={false} id="feedback-detail">
                <Form
                  ref={this.formRef}
                  layout={'vertical'}
                  onFinish={this.onSave}
                  onAbort={this.onCancel}
                  onValuesChange={() => this.setState({isDirty: true})}
                  validateMessages={validateMessages}
                  size="large"
                >
                  <Row gutter={[16, 0]}>
                    <Col sm={{span: 8, offset: 0}}>
                      <FormSelect label="FEEDBACK_USER" name="userId" options={users}
                                  selectProps={this.selectUserProps}
                                  rule={rules.userId} disabled={!!editFeedback?.id}/>
                    </Col>
                    <Col md={{ span: 8 }}>
                      <FormInput label="USER_EMAIL" name={['user', 'emailAddress']} disabled={true} />
                    </Col>
                    <Col md={{ span: 8 }}>
                      <FormInput label="USER_PHONE" name={['user', 'phoneNumber']} disabled={true} />
                    </Col>
                    <Col sm={{span: 24, offset: 0}}>
                      <FormSelect label="FEEDBACK_TYPE" name="feedbackTypeId" options={feedbackTypeOptions}
                                  rule={rules.feedbackTypeId} disabled={!!editFeedback?.id}/>
                    </Col>
                    <Col sm={{span: 24, offset: 0}}>
                      <Form.Item name="workflow" className="full-width">
                        <WorkflowFormBuilder
                          workflowStore={this.props.workflowStore}
                          moduleId={moduleIds.feedback}
                          onChange={this.initWorkflow}
                          parentTrackerId={this.formRef.current?.getFieldValue('feedbackTypeId')}
                        />
                      </Form.Item>
                    </Col>
                    {editFeedback.rating && (
                      <Col sm={{span: 24, offset: 0}}>
                        <Row>
                          <Col sm={{span: 8, offset: 0}}>
                            <FormRating label="FEEDBACK_RATING" name={['rating', 'rate']} disabled={true}/>
                          </Col>
                          <Col sm={{span: 16, offset: 0}}>
                            <FormInput label="FEEDBACK_RATING_COMMENT" name={['rating', 'comment']} disabled={true}/>
                          </Col>
                        </Row>
                      </Col>
                    )}
                    <Col sm={{span: 24, offset: 0}}>
                      <FileUploadWrap
                        parentId={editFeedback?.workflow?.uniqueId}
                        fileStore={this.props.fileStore}
                        onRemoveFile={this.onRemoveFile}
                        beforeUploadFile={this.beforeUploadFile}
                        acceptedFileTypes={fileTypeGroup.images}
                      ></FileUploadWrap>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </TabPane>
            <TabPane tab={L(tabKeys.tabComment)} key={tabKeys.tabComment} disabled={!editFeedback?.workflow?.uniqueId}>
              <CommentList
                moduleId={moduleIds.feedback}
                parentId={editFeedback?.workflow?.uniqueId}
                commentStore={this.props.commentStore}
                sessionStore={this.props.sessionStore}
                isPrivate={false}
              />
            </TabPane>
            <TabPane tab={L(tabKeys.tabAuditLog)} key={tabKeys.tabAuditLog} disabled={!editFeedback?.id}>
              <AuditLog
                moduleId={moduleIds.feedback}
                parentId={editFeedback?.id}
                auditLogStore={this.props.auditLogStore}
              />
            </TabPane>
          </Tabs>
        </Spin>
      </WrapPageScroll>
    )
  }
}

export default FeedbackDetail
