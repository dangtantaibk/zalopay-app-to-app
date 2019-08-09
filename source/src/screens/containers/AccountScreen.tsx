import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import {TouchableDebounce} from "../../components/TouchableDebounce";
import {colors} from "../../constants/theme";
import {StoreState} from "../../store";
import * as UserActions from "../../store/user/actions";

interface IStateInjectedProps {
  fontSizeForDisplay: number,
}

interface IDispatchInjectedProps {
  UserAction: typeof UserActions,
}

// tslint:disable-next-line:no-empty-interface
interface IProps extends IStateInjectedProps, IDispatchInjectedProps{

}

class AccountScreen extends Component<IProps> {

  public render() {
    const {UserAction, fontSizeForDisplay} = this.props;

    return (
        <View style={styles.container}>
          <Text style={[styles.welcome, {fontSize: fontSizeForDisplay}]}>
            Welcome to React Native!
          </Text>
          <Text style={{ fontSize: 20, marginBottom: 20 }}>
            Select fontSize for Text:
          </Text>
          <View>
            <TouchableDebounce onPress={() => {UserAction.changeFontSize(10)}}
                               style={styles.button}>
              <Text style={[styles.textButton, {fontSize: 12}]}>SMALL</Text>
            </TouchableDebounce>
            <TouchableDebounce onPress={() => {UserAction.changeFontSize(14)}}
                               style={styles.button}>
              <Text style={[styles.textButton, {fontSize: 14}]}>STANDARD</Text>
            </TouchableDebounce>
            <TouchableDebounce onPress={() => {UserAction.changeFontSize(18)}}
                               style={styles.button}>
              <Text style={[styles.textButton, {fontSize: 16}]}>LARGE</Text>
            </TouchableDebounce>
          </View>
        </View>
    );
  }
}

const mapStateToProps = (state: StoreState): IStateInjectedProps => ({
  fontSizeForDisplay: state.User.fontSizeForDisplay,
});

const mapDispatchToProps = (dispatch: Dispatch): IDispatchInjectedProps => ({
  UserAction: bindActionCreators(UserActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.main,
    borderRadius: 5,
    height: 50,
    margin: 5,
    width: 200,
    // tslint:disable-next-line:object-literal-sort-keys
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
    textAlign: 'center',
  },
  textButton: {
    color: 'white'
  },
  welcome: {
    margin: 10,
    textAlign: 'center',
  },
});