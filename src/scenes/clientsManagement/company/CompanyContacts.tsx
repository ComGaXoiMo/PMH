import * as React from "react";

import { Table } from "antd";

import { AppComponentListBase } from "@components/AppComponentBase";
import { L } from "@lib/abpUtility";
import { inject, observer } from "mobx-react";
import { portalLayouts } from "@components/Layout/Router/router.config";
import { Link } from "react-router-dom";
import AppConsts from "@lib/appconst";
import ContactStore from "@stores/clientManagement/contactStore";
import Stores from "@stores/storeIdentifier";
import DataTable from "@components/DataTable";
import withRouter from "@components/Layout/Router/withRouter";

const { align } = AppConsts;

export interface ICompanyContactsProps {
  history: any;
  contactStore: ContactStore;
  companyId?: number;
}

export interface ICompanyContactsState {
  pageSize: number;
  pageNumber: number;
}

@inject(Stores.ContactStore)
@observer
class CompanyContacts extends AppComponentListBase<
  ICompanyContactsProps,
  ICompanyContactsState
> {
  formRef: any = React.createRef();
  state = {
    pageSize: 10,
    pageNumber: 1,
  };

  async componentDidMount() {
    await this.getAll();
  }

  getAll = async () => {
    await this.props.contactStore.getAllinCompany({
      pageSize: this.state.pageSize,
      pageNumber: this.state.pageNumber,
      companyId: this.props.companyId,
    });
  };

  handleTableChange = (pagination: any) => {
    this.setState(
      { pageNumber: pagination.current, pageSize: pagination.pageSize },
      async () => await this.getAll()
    );
  };

  gotoDetail = (id) => {
    const { history } = this.props;
    id
      ? history.push(portalLayouts.contactDetail.path.replace(":id", id))
      : history.push(portalLayouts.contactCreate.path);
  };

  public render() {
    const {
      contactStore: { contactInCompany },
    } = this.props;
    const columns = [
      {
        title: L("CONTACT_NAME"),
        dataIndex: "name",
        key: "name",
        width: 200,
        ellipsis: true,
        render: (text, row) => (
          <Link
            to={
              {
                // pathname: portalLayouts.contactDetail.path.replace(":id", row.id),
              }
            }
          >
            {this.renderAvatar(text, row.businessName, row)}
          </Link>
        ),
      },
      {
        title: L("CONTACT_CONTACT_INFO"),
        dataIndex: "phone",
        key: "phone",
        width: 200,
        ellipsis: true,
        render: (text, row) => this.renderAvatar(text, row),
      },
      {
        title: L("CONTACT_POSITION"),
        dataIndex: "position",
        key: "position",
        width: 150,
        ellipsis: true,
        render: (text) => <>{text}</>,
      },
      // {
      //   title: L("CONTACT_LEVEL"),
      //   dataIndex: "level",
      //   key: "level",
      //   width: 150,
      //   render: (level) => <>{level?.levelName ?? ""}</>,
      // },
      {
        title: L("CONTACT_DESCRIPTION"),
        dataIndex: "description",
        key: "description",
        width: 200,
        ellipsis: true,
        render: (text) => <div className="text-muted small">{text}</div>,
      },
      {
        title: L("IS_ACTIVE"),
        dataIndex: "isActive",
        key: "isActive",
        width: 100,
        align: align.center,
        render: this.renderIsActive,
      },
      {
        title: L("LAST_UPDATE_BY"),
        dataIndex: "lastModifierUserName",
        key: "lastModifierUserName",
        width: 150,
        render: (text) => <>{text}</>,
      },
      {
        title: L("CREATED_AT"),
        dataIndex: "creationTime",
        key: "creationTime",
        width: 100,
        render: this.renderDate,
      },
      {
        title: L("CREATED_BY"),
        dataIndex: "creatorUserName",
        key: "creatorUserName",
        width: 150,
        ellipsis: true,
        render: (text) => <>{text}</>,
      },
    ];

    return (
      <>
        <DataTable
          title={this.L("CONTACT_LIST")}
          // onCreate={() => this.gotoDetail(null)}
          pagination={{
            pageSize: this.state.pageSize,
            total:
              contactInCompany === undefined ? 0 : contactInCompany.totalCount,
            onChange: this.handleTableChange,
          }}
        >
          <Table
            size="middle"
            className="custom-ant-table"
            rowKey={(record) => record.id}
            columns={columns}
            pagination={false}
            loading={this.props.contactStore.isLoading}
            dataSource={
              contactInCompany === undefined ? [] : contactInCompany.items
            }
            scroll={{ x: 800, scrollToFirstRowOnChange: true }}
          />
        </DataTable>
      </>
    );
  }
}

export default withRouter(CompanyContacts);
