// @ts-ignore
import Moment from "moment";
import * as React from 'react';
import { Component } from "react";
import { Modal, Picker, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface IProps {
  modalVisible: boolean,
  date: string,
  onClose: () => void,
  onDateChange: (item: string) => void
}

interface IState {
  date: number,
  month: number,
  year: number,
  valueMonthPicker: string
}

class DatePicker extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      date: 1,
      month: 1,
      valueMonthPicker: '',
      year: 1,
    };
  }

  public async componentDidMount() {
    let dateMili: Date;
    if (this.props.date) {
      const [day, month, year] = this.props.date.split("/");
      dateMili = new Date(parseInt(year, 0), parseInt(month, 0) - 1, parseInt(day, 0))
    } else {
      dateMili = new Date();
    }

    await this.setState({
      date: dateMili.getDate(),
      month: dateMili.getMonth(),
      year: dateMili.getFullYear(),
    })
  }

  public checkIsNaNDate() {
    const monthStr = '0' + this.state.month;
    const dayStr = '0' + this.state.date;
    const birthday = new Date(this.state.year + '-' + monthStr.slice(-2) + '-' + dayStr.slice(-2));
    let birthdayNew = new Date();
    if (isNaN(birthday.getTime())) {
      this.setState({ date: 1 });
      const monthStr1 = '0' + this.state.month;
      const dayStr1 = '0' + 1;
      birthdayNew = new Date(this.state.year + '-' + monthStr1.slice(-2) + '-' + dayStr1.slice(-2));
      return birthdayNew
    }
    return birthday
  }

  public render() {
    const monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const dayList = [];
    const yearList = [];
    for (let i = 1; i < 32; i++) {
      dayList.push(i);
    }
    for (let i = 1900; i < 2100; i++) {
      yearList.push(i);
    }
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => { this.props.onClose() }}
      >
        <View style={styles.modal}>
          <View style={styles.modalSelectBox}>
            <View style={styles.modalSelectBoxHeader}>
              <TouchableOpacity
                onPress={() => { this.props.onClose() }}
                style={styles.modalSelectBoxHeaderButton}
              >
                <Text
                  style={styles.modalSelectBoxHeaderButtonText}>{"Done"}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalSelectBoxBody}>
              <View style={{
                alignItems: 'baseline',
                backgroundColor: '#FFFFFF',
                flexDirection: 'row',
                paddingHorizontal: 0
              }}>
                <Picker
                  selectedValue={this.state.date}
                  style={{ flex: 1 }}
                  onValueChange={(itemValue) => this.setState({ date: parseInt(itemValue, 0) }, () => {
                    const birthday = this.checkIsNaNDate();
                    this.props.onDateChange(Moment(birthday).format("DD/MM/YYYY"));
                  })}
                >
                  {
                    dayList.map((item, index) => {
                      return <Picker.Item key={index} label={item.toString()} value={item} />;
                    })
                  }
                </Picker>
                <Picker
                  selectedValue={this.state.valueMonthPicker === '' ?
                    monthList[this.state.month] : this.state.valueMonthPicker}
                  style={{ flex: 1 }}
                  onValueChange={(itemValue, itemIndex) => {
                    // tslint:disable-next-line:no-console
                    console.log('milliseconds', itemValue);
                    this.setState({
                      month: itemIndex + 1,
                      valueMonthPicker: monthList[itemIndex]
                    }, () => {
                      const birthday = this.checkIsNaNDate();
                      this.props.onDateChange(Moment(birthday).format("DD/MM/YYYY"));
                    })
                  }}
                >
                  {
                    monthList.map((item, index) => {
                      return <Picker.Item key={index} label={item.toString()} value={item} />;
                    })
                  }
                </Picker>
                <Picker
                  selectedValue={this.state.year}
                  style={{ flex: 1 }}
                  onValueChange={(itemValue) => this.setState({ year: parseInt(itemValue, 0) }, () => {
                    const birthday = this.checkIsNaNDate();
                    this.props.onDateChange(Moment(birthday).format("DD/MM/YYYY"));
                  })}
                >
                  {
                    yearList.map((item, index) => {
                      return <Picker.Item key={index} label={item.toString()} value={item} />;
                    })
                  }
                </Picker>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export { DatePicker }

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(77, 92, 116, 0.85)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalSelectBox: {
    alignSelf: 'stretch',
    backgroundColor: '#FFFFFF',
    maxHeight: 300,
  },
  modalSelectBoxBody: {
    height: 200
  },
  modalSelectBoxHeader: {
    alignItems: 'flex-end',
    backgroundColor: '#F0F5F6',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  modalSelectBoxHeaderButton: {
    backgroundColor: 'transparent'
  },
  modalSelectBoxHeaderButtonText: {
    backgroundColor: 'transparent',
    color: '#00528F',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
