import React from "react";
import { StyleSheet } from "react-native";
import { Input } from "react-native-elements";

const InputText = ({placeholder, value, onChange, error, icon, is_secure }) => {
  return (
    <Input
      placeholder={placeholder    || ''}
      containerStyle={styles.input}
      rightIcon={icon}
      defaultValue={value || ""}
      onChange={onChange}
      errorMessage={error || false}
      secureTextEntry={is_secure}
    />
  );
};

export default InputText;


const styles = StyleSheet.create({
    input: {
      marginBottom: 10,
    },
})
