import React, { useState } from "react";
import {Alert,  Dimensions, StyleSheet, Text, View, ScrollView } from "react-native";
import { Button, Icon, Input, Avatar, Image } from "react-native-elements";
import CountryPicker from "react-native-country-picker-modal";
import { map, size, filter, isEmpty } from "lodash";
import { loadImageFromGallery, validateEmail } from "../../utils/helpers";
import uuid from 'random-uuid-v4'


const widthScreen = Dimensions.get("window").width

export default function AddRestaurantform({
  toastRef,
  setLoading,
  navigation,
}) {
  const [formData, setFormData] = useState(defaultFormValues());
  const [errorName, setErrorName] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorAddress, setErrorAddress] = useState(null);
  const [errorPhone, setErrorPhone] = useState(null);
  const [imagesSelected, setImagesSelected] = useState([]);


  const addRestaurant = async () => {
    if (!validForm()){
        return
    }

    setLoading(true)
    const response = await uploadImages()
    setLoading(false)

  }

    const uploadImages = async()=>{
        const imagesUrl = [] 
        await Promise.all(
            map(imagesSelected, async(image)=>{
                const response  = await UploadImage(image, "restaurants", uuid() )
                if (response.statusResponse){
                    imagesUrl.push(response.url)
                }



            })

        )
        return imagesUrl
    }
  const validForm = () =>{
      clearErrors()
      let isvalid = true

      if (isEmpty(formData.name)){
          setErrorName("debes ingresar nombre de restaurante")
          isvalid = false
      }
      if (isEmpty(formData.address)){
        setErrorAddress("debes ingresar direccion de restaurante")
        isvalid = false
    }
    if (!validateEmail(formData.email)){
        setErrorEmail("debes ingresar un email de  restaurante valido")
        isvalid = false
    }
    if (size(formData.phone)< 10){
        setErrorPhone("debes ingresar un telefono de resturante valido")
        isvalid = false
    }
    if (isEmpty(formData.description)){
        setErrorDescription("debes ingresar una descripcion del resturante")
        isvalid = false
    }
}
  const clearErrors = () => {
    setErrorAddress(null)
    setErrorDescription(null)
    setErrorEmail(null)
    setErrorName(null)
    setErrorPhone(null)
}
  return (
    <ScrollView style={styles.viewContainer}>
        <ImageRestaurant
        imageRestaurant={imagesSelected[0]}
        />
      <FormAdd
        formData={formData}
        setFormData={setFormData}
        errorName={errorName}
        errorDescription={errorDescription}
        errorEmail={errorEmail}
        errorAddress={errorAddress}
        errorPhone={errorPhone}
      />
      <UploadImage
        toastRef={toastRef}
        imagesSelected={imagesSelected}
        setImagesSelected={setImagesSelected}
      />

      <Button
        title="crear restaurante"
        onPress={addRestaurant}
        buttonStyle={styles.btnAddRestaurant}
      />
    </ScrollView>
  );
}

function ImageRestaurant({ imageRestaurant }) {
    return (
        <View style={styles.viewPhoto}>
            <Image
                style={{ width: widthScreen, height: 200}}
                source={
                    imageRestaurant
                        ? { uri: imageRestaurant}
                        : require("../../../assets/no-image.png")
                }
            />
        </View>
    )
}


function UploadImage({ toastRef, imagesSelected, setImagesSelected }) {
    const imageSelect = async() => {
        const response = await loadImageFromGallery([4, 3])
        if (!response.status) {
            toastRef.current.show("No has seleccionado ninguna imagen.", 3000)
            return
        }
        setImagesSelected([...imagesSelected, response.image])
    }

const removeImage = (image) =>{
    Alert.alert(
    "Eliminar Imagen",
    "¿Estas seguro que quieres eliminar la imagen?",
    [
        {
            text: "No",
            style: "cancel"                    
        },
        {
            text: "Sí",
            onPress: () => {
                setImagesSelected(
                    filter(imagesSelected, (imageUrl) => imageUrl !== image)
                )
            }
        }
    ],
    { cancelable: false }
)
}


  return (
    <ScrollView horizontal style={styles.viewImages}>
      {size(imagesSelected) < 10 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      )}

      {
          map(imagesSelected, (imageRestaurant, index)=>(
              <Avatar
              key={index}
              style={styles.miniatureStyle}
              source={{uri: imageRestaurant}}
              onPress={()=> removeImage(imageRestaurant)}
              />
          ))
      }
    </ScrollView>
  );
}

function FormAdd({
  formData,
  setFormData,
  errorName,
  errorDescription,
  errorAddress,
  errorPhone,
  errorEmail,
}) {
  const [country, setCountry] = useState("MX");
  const [callingCode, setCallingCode] = useState("52");
  const [phone, setPhone] = useState("");

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Nombre del restaurante..."
        defaultValue={formData.name}
        onChange={(e) => onChange(e, "name")}
        errorMessage={errorName}
      />
      <Input
        placeholder="Dirección del restaurante..."
        defaultValue={formData.address}
        onChange={(e) => onChange(e, "address")}
        errorMessage={errorAddress}
      />
      <Input
        keyboardType="email-address"
        placeholder="Email del restaurante..."
        defaultValue={formData.email}
        onChange={(e) => onChange(e, "email")}
        errorMessage={errorEmail}
      />

      <View style={styles.phoneView}>
        <CountryPicker
          withFlag
          withCallingCode
          withFilter
          withCallingCodeButton
          containerStyle={styles.countryPicker}
          countryCode={country}
          onSelect={(country) => {
            setFormData({
              ...formData,
              "country": country.cca2,
              "callingCode": country.callingCode[0],
            });
          }}
        />

        <Input
          placeholder="WhatsApp del restaurante..."
          keyboardType="phone-pad"
          containerStyle={styles.inputPhone}
          defaultValue={formData.phone}
          onChange={(e) => onChange(e, "phone")}
          errorMessage={errorPhone}
        />
      </View>
      <Input
        placeholder="Descripción del restaurante..."
        multiline
        containerStyle={styles.textArea}
        defaultValue={formData.description}
        onChange={(e) => onChange(e, "description")}
        errorMessage={errorDescription}
      />
    </View>
  );
}

const defaultFormValues = () => {
  return {
    name: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    country: "MX",
    callingCode: "52",
  };
};
const styles = StyleSheet.create({
  viewContainer: {
    height: "100%",
  },
  viewForm: {
    marginHorizontal: 10,
  },

  textArea: {
    height: 100,
    width: "100%",
  },
  phoneView: {
    width: "80%",
    flexDirection: "row",
  },
  inputPhone: {
    width: "80%",
  },
  btnAddRestaurant: {
    margin: 20,
    backgroundColor: "red",
  },
  viewImages: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 79,
    backgroundColor: "#e3e3e3",
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20
  }
});
