import React, { useEffect, useState } from 'react'
import { Form, Modal, Row, Col } from 'antd'
import { L, isGrantedAny } from '@lib/abpUtility'
import AppConsts, { appPermissions, fileTypeGroup } from '@lib/appconst'
import { validateMessages } from '@lib/validation'
import rules from './validation'
import FormTextArea from '@components/FormItem/FormTextArea'
import FormInput from '@components/FormItem/FormInput'
import ConfirmReason from '@components/Modals/ConfirmReason'
import FormSelectBox from '@components/FormItem/FormSelectBox'
import FormDateRangePicker from '@components/FormItem/FormDateRangePicker'
import FileUploadWrap from '@components/FileUpload'
import FormSwitch from '@components/FormItem/FormSwitch'

const { formVerticalLayout } = AppConsts

const AnnouncementFormModal = ({ visible, data, handleOK, handleCancel, announcementStore, fileStore }) => {
  const [form] = Form.useForm()
  const [initialValues, setInitialValues] = useState({})
  const [visibleConfirm, setVisibleConfirm] = useState(false)
  const [selectedType, setSelectedType] = useState()
  const [files, setFiles] = useState([] as any)

  useEffect(() => {
    if (data) {
      setInitialValues(data)
      form.setFieldsValue(data)
    }
  }, [data])

  const onRemoveFile = (file) => {
    const index = files.indexOf(file)
    const newFileList = files
    newFileList.splice(index, 1)
    setFiles(newFileList)
  }

  const beforeUploadFile = (file) => {
    setFiles([...files, file])
    return false
  }

  const onOk = async () => {
    return form.validateFields().then(async () => {
      const dataForm = form.getFieldsValue() || {}
      if (data.id) {
        await announcementStore.update({ ...dataForm, id: data.id })
      } else {
        await announcementStore.create({ ...data, ...dataForm })
      }

      await handleOK()
      handleCancel()
      form.resetFields()
    })
  }

  const onCancel = async () => {
    form.resetFields()
    handleCancel()
  }

  const onCancelRequest = async (reasonCancel) => {
    if (!data?.id) {
      return
    }

    await announcementStore.cancelRequest({ id: data.id, reasonCancel })
    setVisibleConfirm(false)
    await handleOK()
    handleCancel()
  }

  return (
    <>
      <Modal
        title={L('ANNOUNCEMENT_FORM_TITLE')}
        okText={L('BTN_SAVE')}
        visible={visible}
        confirmLoading={announcementStore.isLoading}
        destroyOnClose
        maskClosable={false}
        okButtonProps={{
          disabled: !isGrantedAny(appPermissions.announcement.create, appPermissions.announcement.update),
          className: !isGrantedAny(appPermissions.announcement.create, appPermissions.announcement.update) ? 'd-none' : ''
        }}
        onCancel={onCancel}
        onOk={onOk}
        forceRender
      >
        <Form
          layout="vertical"
          initialValues={initialValues}
          form={form}
          validateMessages={validateMessages}
          size="large"
        >
          <Row gutter={16}>
            <Col sm={{ span: 24 }}>
              <FormInput
                label="ANNOUNCEMENT_SUBJECT"
                name="subject"
                rule={rules.subject}
              />
            </Col>
            <Col md={{ span: 24 }}>
              <FormTextArea label="ANNOUNCEMENT_DESCRIPTION" name="message"
                            rule={rules.message} rows={2}/>
            </Col>
            <Col md={{ span: 24 }}>
              <FormSelectBox label="ANNOUNCEMENT_TYPE" name="announcementTypeId"
                             options={announcementStore.announcementTypes} onChange={setSelectedType}/>
            </Col>
            {selectedType === 1 &&
              <><Col md={{ span: 12 }}>
              <FormInput label="ANNOUNCEMENT_VERSION" name="version"/>
            </Col>
            < Col md={{span: 12}}>
              <FormSwitch label="ANNOUNCEMENT_UPDATE_FOR_CLIENT" name="forClient"/>
              </Col>
              </>
            }
            <Col md={{ span: 24 }}>
              <FormDateRangePicker label="ANNOUNCEMENT_FROM_TO_DATE" name="fromToDate"/>
            </Col>
            <Col sm={{ span: 24, offset: 0 }}>
              <Form.Item label={L('ANNOUNCEMENT_PICTURE_OR_VIDEO')} {...formVerticalLayout}>
                <FileUploadWrap
                  parentId={announcementStore.editAnnouncement?.guid}
                  fileStore={fileStore}
                  onRemoveFile={onRemoveFile}
                  beforeUploadFile={beforeUploadFile}
                  acceptedFileTypes={fileTypeGroup.images}
                ></FileUploadWrap>
              </Form.Item>
            </Col>
            <Col sm={{ span: 24, offset: 0 }}>
              <FormSwitch label="ANNOUNCEMENT_ACTIVE_STATUS" name="isActive"/>
            </Col>
          </Row>
        </Form>
      </Modal>
      <ConfirmReason
        title="ANNOUNCEMENT_CONFIRM_CANCEL_TITLE"
        confirmMessage="ANNOUNCEMENT_CONFIRM_CANCEL_MESSAGE"
        onOk={onCancelRequest}
        onCancel={setVisibleConfirm}
        visible={visibleConfirm}
      />
    </>
  )
}

export default AnnouncementFormModal
