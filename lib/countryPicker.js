import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Picker, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import Country from './country';
import styles from './styles';
import { FlatList } from 'react-native';
import { AntDesign, EvilIcons } from '@expo/vector-icons'
import Modal from 'react-native-modal'

const PickerItem = Picker.Item;

const propTypes = {
  buttonColor: PropTypes.string,
  labels: PropTypes.array,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  itemStyle: PropTypes.object,
  onSubmit: PropTypes.func,
  onPressCancel: PropTypes.func,
  onPressConfirm: PropTypes.func,
};

export default class CountryPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonColor: this.props.buttonColor || '#007AFF',
      modalVisible: false,
      search: '',
      selectedCountry: this.props.selectedCountry || Country.getAll()[0],
    };

    this.onPressCancel = this.onPressCancel.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedCountry: nextProps.selectedCountry,
    });
  }

  selectCountry(selectedCountry) {
    this.setState({
      selectedCountry,
    });
  }

  onPressCancel() {
    if (this.props.onPressCancel) {
      this.props.onPressCancel();
    }

    this.setState({
      modalVisible: false,
    });
  }

  onPressSubmit() {
    if (this.props.onPressConfirm) {
      this.props.onPressConfirm();
    }

    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.selectedCountry);
    }

    this.setState({
      modalVisible: false,
    });
  }

  onValueChange(selectedCountry) {
    // this.setState({
    //   selectedCountry,
    // });

    if (this.props.onPressConfirm) {
      this.props.onPressConfirm();
    }

    if (this.props.onSubmit) {
      this.props.onSubmit(selectedCountry);
    }

    this.setState({
      selectedCountry,
      modalVisible: false,
    });
  }

  show() {
    this.setState({
      modalVisible: true,
    });
  }
  selectCountryInputHandler(countryName) {
    // let selectedCountry=Country.getAll().filter(cnt=>cnt.name==countryName)
    this.setState({
      search: countryName
    });
    // console.log(Country.getAll().filter(cnt => cnt.name.includes(countryName)))
  }

  renderItem(country, index) {
    return <PickerItem key={country.iso2} value={country.iso2} label={country.name} />;
  }

  render() {
    const { buttonColor } = this.state;
    const itemStyle = this.props.itemStyle || {};
    return (
      <Modal
        // animationType="slide"
        // transparent
        isVisible={this.state.modalVisible}
        animationInTiming={500}
        animationIn='slideInUp'
        animationOutTiming={500}
        animationOut='slideOutDown'
        style={{ justifyContent: 'flex-end', marginBottom: 0 }}
      // onRequestClose={() => {
      //   console.log('Country picker has been closed.');
      // }}
      >
        <TouchableOpacity activeOpacity={1} onPress={this.onPressSubmit} style={styles.basicContainer}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: this.props.pickerBackgroundColor || 'white' },
            ]}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 40, marginVertical: 3, alignItems: 'center', width: '100%', paddingHorizontal: 30 }}>
              <TextInput style={{ width: '100%', borderBottomColor: 'gray', borderBottomWidth: 0.5 }}
                placeholder="Select Country"
                value={this.state.search}
                onChangeText={(country) => this.selectCountryInputHandler(country)}
              />
              {/* <TouchableOpacity onPress={this.onPressSubmit}>
               
                <EvilIcons name="close" size={24} color="black" />
               
              </TouchableOpacity> */}
            </View>
            <View style={styles.buttonView}>
              {/* <TouchableOpacity onPress={this.onPressCancel}>
                <Text style={[{ color: buttonColor }, this.props.buttonTextStyle]}>
                  {this.props.cancelText || 'Cancel'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.onPressSubmit}>
                <Text style={[{ color: buttonColor }, this.props.buttonTextStyle]}>
                  {this.props.confirmText || 'Confirm'}
                </Text>
              </TouchableOpacity> */}
              <FlatList data={Country.getAll().filter(cnt => cnt.name.includes(this.state.search))}
                renderItem={itemData => (
                  <TouchableOpacity onPress={() => this.onValueChange(itemData.item.iso2)} style={{ justifyContent: 'space-between', flexDirection: 'row', height: 30 }}>
                    <Text style={{ fontFamily: 'montserrat-semiBold', color: this.state.selectedCountry === itemData.item.iso2 ? '#564CAC' : 'black', fontSize: 12 }}>{itemData.item.name} +{itemData.item.dialCode}</Text>
                    {/* <Text>+{itemData.item.dialCode}</Text> #36306D */}
                    {/* <Text>+{itemData.item.areaCodes}</Text>
                    <Text>+{itemData.item.priority}</Text> */}
                    {/* <Text>{itemData.item.iso2}</Text>  backgroundColor: this.state.selectedCountry === itemData.item.iso2 ? 'red' : 'transparent' */}
                    <TouchableOpacity onPress={() => { }}>
                      <AntDesign name="checkcircle" size={22} color={this.state.selectedCountry === itemData.item.iso2 ? '#2AB7CA' : 'transparent'} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                )}
              />
            </View>
            {/* <View style={{ height: 100 }}>
              
            </View> */}
            {/* <View style={styles.mainBox}>
              <Picker
                ref={(ref) => {
                  this.picker = ref;
                }}
                style={styles.bottomPicker}
                selectedValue={this.state.selectedCountry}
                onValueChange={country => this.onValueChange(country)}
                itemStyle={itemStyle}
                mode="dialog"
              >
                {Country.getAll().map((country, index) => this.renderItem(country, index))}
              </Picker>
            </View> */}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

CountryPicker.propTypes = propTypes;




