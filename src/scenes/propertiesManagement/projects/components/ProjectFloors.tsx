import * as React from "react";

import { Form, Button, Table } from "antd";
import { L } from "@lib/abpUtility";
import { validateMessages } from "@lib/validation";
import { formatNumber, renderIsActive } from "@lib/helper";
import AppDataStore from "@stores/appDataStore";
import AppConsts from "@lib/appconst";
import { RowFloorModel } from "@models/project/projectModel";
import {
  buildEditableCell,
  EditableCell,
} from "@components/DataTable/EditableCell";
import Popconfirm from "antd/lib/popconfirm";
import {
  CloseOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons/lib";
import DataTable from "@components/DataTable";
import ProjectStore from "@stores/projects/projectStore";
import { AppComponentListBase } from "@components/AppComponentBase";

const { align } = AppConsts;
export interface IProjectAddressProps {
  appDataStore: AppDataStore;
  projectStore: ProjectStore;
  projectId: number;
}

class ProjectFloors extends AppComponentListBase<IProjectAddressProps, any> {
  formRef: any = React.createRef();

  state = {
    maxResultCount: 10,
    skipCount: 0,
    editingRowKey: "",
    editFloor: {} as any,
    floors: [] as any,
  };

  componentDidMount = async () => {
    await this.getAll();
  };

  getAll = async () => {
    await this.props.projectStore.getFloors(this.props.projectId, {
      maxResultCount: this.state.maxResultCount,
      skipCount: this.state.skipCount,
    });

    this.setState({ floors: this.props.projectStore.floors });
  };

  changeDealPayment = async (name, value) => {
    this.setState({ editFloor: { ...this.state.editFloor, [name]: value } });
  };

  handleAddRow = () => {
    const newRow = new RowFloorModel();
    this.formRef.current?.setFieldsValue({ ...newRow });
    this.setState({
      floors: [...this.state.floors, newRow],
      editingRowKey: newRow.key,
    });
  };

  handleCreateOrUpdate = async (key) => {
    try {
      const form = this.formRef.current;
      let editedRowIndex = this.state.floors.findIndex(
        (item) => item.key === key
      );
      if (editedRowIndex === -1) {
        return;
      }
      // Update case
      form.validateFields().then(async (values: any) => {
        let editRecord = this.state.floors.find((item) => item.key === key);
        if (editRecord?.id) {
          await this.props.projectStore.updateFloor({
            ...editRecord,
            ...values,
          });
        } else {
          await this.props.projectStore.createFloor({
            ...values,
            projectId: this.props.projectId,
          });
        }

        this.getAll();
        this.setState({ editingRowKey: "" });
      });
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  isEditing = (record) => record.key === this.state.editingRowKey;

  editRow = (record) => {
    this.formRef.current?.setFieldsValue({ ...record });
    this.setState({ editingRowKey: record.key });
  };

  cancelEditRow = (record) => {
    let { floors } = this.state;
    if (!record.id) {
      floors = (floors || []).filter((item) => item.key !== record.key);
    }
    this.setState({ floors, editingRowKey: undefined });
  };

  public render() {
    const columns = [
      {
        title: L("FLOOR_NAME"),
        dataIndex: "floorName",
        key: "floorName",
        width: "10%",
        render: (text: string) => <>{text}</>,
        onCell: (record) =>
          buildEditableCell(
            record,
            "text",
            "floorName",
            L("FLOOR_NAME"),
            this.isEditing
          ),
      },
      {
        title: L("FLOOR_SIZE"),
        dataIndex: "size",
        key: "size",
        width: "10%",
        // align: align.right,
        render: (text: string) => <>{formatNumber(text)}</>,
        onCell: (record) =>
          buildEditableCell(
            record,
            "number",
            "size",
            L("FLOOR_SIZE"),
            this.isEditing,
            null,
            true
          ),
      },
      {
        title: L("IS_ACTIVE"),
        dataIndex: "isActive",
        key: "isActive",
        width: "10%",
        align: align.center,
        render: renderIsActive,
      },
      {
        title: L("ACTIONS"),
        dataIndex: "action",
        width: "10%",
        align: align.center,
        fixed: align.right,
        render: (_: any, record: any) => {
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <Button
                size="small"
                className="ml-1"
                shape="circle"
                icon={<SaveOutlined />}
                onClick={() => this.handleCreateOrUpdate(record.key)}
              />
              <Popconfirm
                title={L("ARE_YOU_SURE_YOU_WANT_CANCEL")}
                onConfirm={() => this.cancelEditRow(record)}
              >
                <Button
                  size="small"
                  className="ml-1"
                  shape="circle"
                  icon={<CloseOutlined />}
                />
              </Popconfirm>
            </span>
          ) : (
            <span>
              <Button
                size="small"
                className="ml-1"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => this.editRow(record)}
                disabled={this.state.editingRowKey?.length > 0}
              />
            </span>
          );
        },
      },
      {
        title: L(""),
        dataIndex: "",
        key: "",
        width: "",
        // align: align.right,
        render: () => <></>,
      },
    ];

    const { floors } = this.state;

    return (
      <>
        <DataTable
          title={this.L("DEAL_PAYMENT_LIST")}
          onCreate={this.handleAddRow}
          // disabledCreate={this.state.editingRowKey?.length > 0}
        >
          <Form
            ref={this.formRef}
            component={false}
            validateMessages={validateMessages}
            layout={"vertical"}
          >
            <Table
              size="middle"
              className="custom-ant-table ant-form-vertical"
              rowKey={(record) => record.key}
              columns={columns}
              pagination={false}
              dataSource={floors || []}
              scroll={{ x: 800 }}
              bordered
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
            />
          </Form>
        </DataTable>
      </>
    );
  }
}

export default ProjectFloors;
