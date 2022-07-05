import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import firebase from "firebase";
import InputText from "../inputs/InputText";
import ButtonModal from "../buttons/ButtonModal";

export default function ChangeDisplayNameForm(props) {
  const { displayName, setShowModal, toastRef, setReloadUserInfo } = props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoadig, setIsLoading] = useState(false);

  const onSubmit = () => {
    setError(null);
    if (!newDisplayName) {
      setError("El nombre no puede ser vacío");
    } else if (displayName === newDisplayName) {
      setError("El nombre no puede ser igual al actual");
    } else {
      setIsLoading(true);
      const update = {
        displayName: newDisplayName,
      };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          console.log("Escelente desde firebase");
          setIsLoading(false);
          setReloadUserInfo(true);
          setShowModal(false);
        })
        .catch(() => {
          console.log("Error al actualizar el nombre");
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <InputText
        placeholder="Nombre y apellidos"
        icon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        value={displayName || ""}
        onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
        error={error}
      />
        <ButtonModal text="Change Name" isLoadig={isLoadig} onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  }
});
