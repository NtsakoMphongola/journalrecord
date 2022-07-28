import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Button } from 'react-native';
import React, { useRef, useState } from 'react'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../setup';
import firebase from 'firebase/compat/app';
import HomePage from './HomePage';

const Login = ({navigation}) => {
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
            alert('Please enter your Phone Number', error)
        });
        if(!code.trim()) {
        alert('Enter Code');
        return; 
    } else {
        alert('Welcome');
            navigation.navigate('HomePage');
        }; 
    }
    
    return (
        <View style={styles.container}> 
            <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
            <Text style={styles.title}>Authentication</Text>
            <Text style={styles.otptext}>Login using OTP </Text>
            <TextInput placeholder='Phone Number With Country Code' keyboardType='phone-pad' onChange={setVerificationId}
            autoCompleType='tel' style={styles.txtInput} />
            <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
                <Text style={styles.btntext}>Send verification code</Text>
            </TouchableOpacity>
            <TextInput placeholder='Confirm Code' keyboardType='number-pad' onChange={setCode}
            style={styles.txtInput1 } />
                <TouchableOpacity style={styles.sendCode} onPress = {confirmCode}>
                <Text style={styles.btntext } >Confirm code </Text>
            </TouchableOpacity>
        </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        width: 500,
        borderRadius: 15,
        backgroundColor: 'gray',
        textAlign: 'center',
        justifyContent: 'center',
    },
    title: {
        paddingTop: 10,
        marginBottom: 25,
        borderBottomWidth: 5,
        fontSize: 28,
        backgroundColor: 'green',
        color: 'white',
        textTransform: 'uppercase'
    },
    otptext: {
        fontSize: 24,
        padding: 10,
        textTransform: 'uppercase'
    },
    txtInput: { 
        padding: 20,
        paddingTop: 25,
        marginBottom: 25,
        margin: 0,
        fontSize: 20,
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: 'white',
        textAlign: 'center',
        justifyContent: 'space-between',
    },
    txtInput1: { 
        padding: 20,
        paddingTop: 25,
        borderWidth: 2,
        borderRadius: 15,
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
        borderRadius: 15,
        backgroundColor: '#ff5421',
    },
    sendVerification: {
        padding: 20, 
        borderRadius: 15,
        backgroundColor: '#bb9915',
    },
    btntext: {
        fontSize: 24,
    }
})