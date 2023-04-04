import * as React from "react";
import { inject, observer } from "mobx-react";
import AppDataStore from "@stores/appDataStore";
import ContactStore from "@stores/clientManagement/contactStore";
import Stores from "@stores/storeIdentifier";
import withRouter from "@components/Layout/Router/withRouter";

export interface IContactProps {
  history: any;
  appDataStore: AppDataStore;
  contactStore: ContactStore;
}

export interface IContactState {
  maxResultCount: number;
}

@inject(Stores.ContactStore)
@inject(Stores.AppDataStore)
@inject()
@observer
class InquirieContact extends React.Component<IContactProps, IContactState> {
  formRef: any = React.createRef();

  state = {
    maxResultCount: 10,
  };

  async componentDidMount() {
    console.log("bao");
  }

  public render() {
    return <>bao</>;
  }
}
export default withRouter(InquirieContact);
