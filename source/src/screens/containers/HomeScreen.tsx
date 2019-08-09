import CryptoJS from 'crypto-js';
import React, { Component } from 'react';
import {
  Alert,
  Button,
  KeyboardAvoidingView, NativeEventEmitter, NativeModules,
  ScrollView,
  StyleSheet,
  Text, TextInput,
} from 'react-native';
import {connect} from "react-redux";
import {StoreState} from "../../store";

interface IStateInjectedProps {
  fontSizeForDisplay: number,
}

// tslint:disable-next-line:no-empty-interface
interface IProps extends IStateInjectedProps{

}

interface IState {
  money: string,
  token: string,
  returnCode: number
}

let apptransid = 1811232010

const { PayZaloBridge } = NativeModules;

const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);

class HomeScreen extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      money: '10000',
      returnCode: 0,
      token:'',
    }
  }

  public componentDidMount(): void {
    payZaloBridgeEmitter.addListener(
        'EventPayZalo',
        (data) => {
          // tslint:disable-next-line:no-console
          console.log('Kết quả giao dịch: ' + data.returnCode);
          if(data.returnCode === 1){
            Alert.alert('', 'Giao dịch thành công!');
          }else{
            Alert.alert('','Giao dịch thất bại! ' + data.returnCode);
          }
        }
    );
  }

  public createOrder = () => {
    apptransid += 1
    const appid = 352
    // tslint:disable-next-line:radix
    const amount = parseInt(this.state.money)
    const appuser = "demozpdk"
    const apptime = (new Date).getTime()
    const embeddata = "{\"promotioninfo\":\"{\\\"campaigncode\\\":\\\"yeah\\\"}\",\"merchantinfo\":\"embeddata123\"}"
    const item = "[{\\\"itemid\\\":\\\"knb\\\",\\\"itemname\\\":\\\"kim nguyen bao\\\",\\\"itemquantity\\\":10,\\\"itemprice\\\":50000}]"
    const description = "Simple demo zpdk"
    const hmacInput = appid +"|"+ apptransid +"|"+ appuser +"|"+ amount +"|" + apptime +"|"+ embeddata +"|" +item
    const mac = CryptoJS.HmacSHA256(hmacInput, "5NQvhuNM3C8eBD8SBIajpgAgKhiO79yG")
    // tslint:disable-next-line:no-console
    console.log('====================================');
    // tslint:disable-next-line:no-console
    console.log("hmacInput: " + hmacInput);
    // tslint:disable-next-line:no-console
    console.log("mac: " + mac);
    // tslint:disable-next-line:no-console
    console.log('====================================');
    const order = {
      'appid':appid,
      'appuser': appuser,
      // tslint:disable-next-line:object-literal-sort-keys
      'apptime' : apptime,
      'amount' : amount,
      'apptransid': apptransid,
      'embeddata' : embeddata,
      'item':item,
      'description': description,
      'mac': mac
    }
    // tslint:disable-next-line:no-console
    console.log(order)

    let formBody = []
    // tslint:disable-next-line:forin
    for (const i in order) {
      const encodedKey = encodeURIComponent(i);
      // @ts-ignore
      const encodedValue = encodeURIComponent(order[i]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    // @ts-ignore
    formBody = formBody.join("&");
    fetch('https://sandbox.zalopay.com.vn/v001/tpe/createorder', {
      method: 'POST',
      // tslint:disable-next-line:object-literal-sort-keys
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    }).then(response => response.json())
        .then(resJson => {
          // tslint:disable-next-line:no-console
          console.log(resJson)
          this.setState({
            returnCode: resJson.returncode,
            token: resJson.zptranstoken,
          })
        })
        .catch((error)=>{
          // tslint:disable-next-line:no-console
          console.log("error ", error)
        })
  }

  public payOrder = () => {
    const payZP = NativeModules.PayZaloBridge;
    payZP.payOrder(this.state.token);
  }

  public render() {
    return (
        <ScrollView>
          <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.welcome}>Demo ZPDK</Text>
            <Text style={styles.welcome}>Input amount:</Text>
            <TextInput
                onChangeText = {(value) => this.setState({
                  money: value
                })}
                value={this.state.money}
                keyboardType="numeric"
                placeholder="Input amount" />

            <Button
                title="Create order"
                onPress={()=>{this.createOrder()}}
            />

            <Text style={styles.welcome}>ZpTranstoken: {this.state.token}</Text>
            <Text style={styles.welcome}>returncode: {this.state.returnCode}</Text>

            {this.state.returnCode === 1 ?
                <Button
                    title="Pay order"
                    onPress={()=>{this.payOrder()}}
                /> : null
            }
          </KeyboardAvoidingView>
        </ScrollView>
    );
  }
}

const mapStateToProps = (state: StoreState): IStateInjectedProps => ({
  fontSizeForDisplay: state.User.fontSizeForDisplay,
});

export default connect(mapStateToProps, null)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
  welcome: {
    margin: 10,
    textAlign: 'center',
  },
});
