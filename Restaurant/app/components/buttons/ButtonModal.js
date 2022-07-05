import React from "react";
import { StyleSheet } from "react-native";
import {  Button } from "react-native-elements";

const ButtonModal = ({ text, isLoadig, onPress }) => {
  return (
    <Button
      title={text || ""}
      containerStyle={styles.btnContainer}
      buttonStyle={styles.btn}
      onPress={onPress}
      loading={isLoadig}
    />
  );
};

export default ButtonModal;

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#00a680",
  },
});
