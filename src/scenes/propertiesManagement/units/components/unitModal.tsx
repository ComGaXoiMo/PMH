import { inject, observer } from "mobx-react";
import React from "react";
import CustomDrawer from "@components/Drawer/CustomDrawer";
import { useForm } from "antd/es/form/Form";

type Props = {
  visible: boolean;
  id: any;
  title: string;
  //   genFeeStore: GenFeeStore
  onCancel: () => void;
};

const UnitModal = inject()(
  observer((props: Props) => {
    const [form] = useForm();
    React.useEffect(() => {
      if (props.id) {
        console.log("init");
        //   form.setFieldsValue(data)
      } else {
        form.resetFields();
      }
      console.log(props.title);
    }, [props.visible]);
    return (
      <CustomDrawer
        useBottomAction
        title={props.title}
        visible={props.visible}
        onClose={() => {
          form.resetFields(), props.onCancel();
        }}
        onSave={() => console.log(1)}
        getContainer={false}
      ></CustomDrawer>
    );
  })
);

export default UnitModal;
