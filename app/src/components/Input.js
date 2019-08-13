import React from 'react';
import { Text, View, Image, TextInput, StyleSheet } from 'react-native';
import R from '../R';
const Input = ({
  image,
  placeholder,
  placeholderColor,
  onChangeText,
  secureTextEntry,
  keyboardType
}) => (
  <View style={inputStyle.c}>
    <View style={inputStyle.c1}>
      <Image source={image} />
    </View>
    <View style={inputStyle.c2}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        style={inputStyle.textinput}
        onChangeText={onChangeText}
        autoCapitalize='none'
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  </View>
);

const inputStyle = StyleSheet.create({
  textinput: {
    color: R.colors.b1,
    fontSize: 20,
    fontStyle: 'normal',
    fontFamily: R.fonts.GothamBold,
    paddingVertical: 10
  },
  c: {
    marginTop: 10,
    marginHorizontal: 30,
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: R.colors.b1
  },
  c1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  c2: {
    flex: 5
  },
  errorText: {
    color: R.colors.b1,
    fontSize: 20,
    fontStyle: 'normal',
    fontFamily: R.fonts.GothamBold
  }
});

export { Input };
