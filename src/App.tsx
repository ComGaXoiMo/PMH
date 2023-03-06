import * as React from "react";

import Router from "./components/Layout/Router";
import SessionStore from "./stores/sessionStore";
import SignalRAspNetCoreHelper from "./lib/signalRAspNetCoreHelper";
import Stores from "./stores/storeIdentifier";
import { inject } from "mobx-react";
import withSplashScreen from "@components/Layout/SplashScreen";

export interface IAppProps {
  location: any;
  history: any;
  sessionStore?: SessionStore;
}

@inject(Stores.SessionStore)
class App extends React.Component<IAppProps> {
  state = { isLoading: true, needLoginStep: undefined };

  async componentDidMount() {
    await this.props.sessionStore!.getCurrentLoginInformations();

    if (
      !!this.props.sessionStore!.currentLogin.user &&
      this.props.sessionStore!.currentLogin.application.features["SignalR"]
    ) {
      if (
        this.props.sessionStore!.currentLogin.application.features[
          "SignalR.AspNetCore"
        ]
      ) {
        SignalRAspNetCoreHelper.initSignalR();
      }
    }

    this.setState({ isLoading: false });
  }

  public render() {
    if (this.state.isLoading) return null;

    return <Router />;
  }
}

export default withSplashScreen(App);
