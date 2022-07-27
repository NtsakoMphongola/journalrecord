import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useRef, useState } from 'react'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../setup';
import firebase from 'firebase/compat/app';
import HomePage from './HomePage';

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationid, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
            .then(setVerificationId);
            setPhoneNumber('');
    };

    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationid,
            code,
        );
        firebase.auth().signInWithCredential(credential).then(() => {
            setCode('');
        })
        .catch((error) => {
            // show error message
            alert(error)
        })
        Alert.alert('Login successful. Welcome to journal vioce Record',)
    }

  return (
    <View style={styles.container}> 
        <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
      <Text style={styles.title}>Authentication</Text>
      <Text style={styles.otptext}>
        Login using OTP 
      </Text>
      <TextInput placeholder='Phone Number With Country Code' onChangeText={setPhoneNumber} keyboardType='phone-pad'
      autoCompleType='tel' style={styles.txtInput} />
      <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
        <Text style={styles.btntext}>Send verification code</Text>
      </TouchableOpacity>
      <TextInput placeholder='Confirm Code' onChangeText={setCode} keyboardType='number-pad'
       style={styles.txtInput1 } />
        <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
        <Text style={styles.btntext } onPress={HomePage}>Confirm code </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 25,
        width: 500,
        backgroundColor: 'gray',
        textAlign: 'center',
        borderRadius: 15,
        justifyContent: 'center',
        
    },
    title: {
        marginBottom: 50,
        borderBottomWidth: 5,
        backgroundColor: 'green',
        color: 'white',
        fontSize: 28,
        textTransform: 'uppercase'
    },
    txtInput: { 
        padding: 20,
        paddingTop: 25,
        marginBottom: 25,
        margin: 0,
        fontSize: 20,
        borderWidth: 5,
        backgroundColor: 'white',
        textAlign: 'center',
        justifyContent: 'space-between',
    },
    txtInput1: { 
        padding: 20,
        paddingTop: 25,
        borderWidth: 5,
        marginTop: 20,
        marginBottom: 25,
        margin: 0,
        fontSize: 20,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        textAlign: 'center',
    },
    sendCode: {
        padding: 20,
        backgroundColor: '#595421',
    },
    sendVerification: {
        padding: 20,
        backgroundColor: '#bb9915',
    }
})