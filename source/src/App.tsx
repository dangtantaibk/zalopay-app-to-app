// import React, { Component } from "react";
import React from 'react'
import { Component } from 'react';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import AppContainer from "./router";
import {persistor, store} from './store';
// tslint:disable-next-line:no-empty-interface
interface Props { }
// tslint:disable-next-line:no-empty-interface
interface State { }

export default class App extends Component<Props, State> {

  constructor(props: {}) {
    super(props);
    this.state = {
      error: undefined,
      hasError: false
    };
  }

  public componentDidCatch(error: Error) {
    this.setState({ error, hasError: true });
  }

  public render() {
    return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppContainer/>
          </PersistGate>
        </Provider>
    );
  }
}
