import React from 'react';
import { Image, Dimensions, View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import { YellowBox } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./src/redux/configureStore";
import AppContainer from "./src/components/AppContainer";
import { COLORS } from "./src/constants"

const { persistor, store } = configureStore();
const { width, height } = Dimensions.get("window");

YellowBox.ignoreWarnings([
  "Setting a timer",
  "componentWillReceiveProps",
  "componentWillUpdate",
  "Animated: `useNativeDriver`",
]);


export default class App extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    SplashScreen.preventAutoHideAsync();
  }

  render() {
    if (!this.state.isReady) {
      return (
        <View style={{ flex: 1, alignItems:"center", justifyContent: "center", backgroundColor: COLORS.DALGRAK }}>
          <Image
            source={require('./assets/images/Logo.gif')}
            onLoad={this._cacheResourcesAsync}
            resizeMode="stretch"
            style={styles.logo}
          />
        </View>
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

  _cacheSplashResourcesAsync = async () => {
    const gif = require('./assets/images/Logo.gif');
    return Asset.fromModule(gif).downloadAsync();
  };

  _cacheResourcesAsync = async () => {
    SplashScreen.hideAsync();

    try {
      const images = [
        require('./assets/images/farmer.png'),
        require('./assets/images/loading.png'),
      ];

      const cacheImages = images.map(image => {
        return Asset.fromModule(image).downloadAsync();
      });

      await Promise.all(cacheImages);
    } catch (e) {
      console.warn(e);
    } finally {
      // this.setState({ isReady: true });
      setTimeout(() => {this.setState({isReady: true})},2500);
    }
  };
}
const styles = StyleSheet.create({
logo: {
    width: width,
    resizeMode: "contain",
  },
})