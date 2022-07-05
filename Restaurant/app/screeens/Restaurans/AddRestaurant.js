import React,{useRef, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AddRestaurantform from '../../components/Restaurans/AddRestaurantform'
import Loading from '../../components/Loading'

export default function AddRestaurant({navigation}) {
    const toastRef = useRef()
    const [loading, setLoading] = useState(false)
    return (
        <KeyboardAwareScrollView>
           <AddRestaurantform 
           toastRef={toastRef} 
           setLoading={setLoading}
           navigation={navigation}
           />

           <Loading isVisible={loading} text='creando restaurante'/>
           <Toast ref={toastRef} position='center' opacity={0.9}/>
           </KeyboardAwareScrollView>
        
    )
}

const styles = StyleSheet.create({})

