import React from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { YellowBox } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./src/redux/configureStore";
import AppContainer from "./src/components/AppContainer";

const { persistor, store } = configureStore();

YellowBox.ignoreWarnings([
  "Setting a timer",
  "componentWillReceiveProps",
  "componentWillUpdate",
  "Animated: `useNativeDriver`",
]);

class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };
  
  render() {
    const { isLoadingComplete } = this.state;
    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
  _loadAssetsAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/farmer.png'),
        require('./assets/images/dalgrak_white.png'),
        require('./assets/images/dalgrak_full.png'),
      ]),
      Font.loadAsync({
        ...Ionicons.font,
        ...MaterialIcons.font,
      }),
    ]);
  };
  _handleLoadingError = (error) => {
    console.error(error);
  };
  _handleFinishLoading = async () => {
    this.setState({
      isLoadingComplete: true,
    });
  };
}

export default App;
