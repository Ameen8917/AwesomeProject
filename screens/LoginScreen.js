import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Image, TextInput } from 'react-native'
import Users from '../model/users';
import { login } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {

        let data = {
            email,
            password
        }

        if (!email) {
            alert('Please fill Email');
            return;
        }
        if (!password) {
            alert('Please fill Password');
            return;
        }

        // checking user exist or not in database
        // for demo using dummy user data json
        const foundUser = Users.filter(item => {
            return data.email === item.email && data.password === item.password;
        })

        if (foundUser.length == 0) return alert("Invalid Credential");

        if (foundUser) {
            dispatch(login({
                id: foundUser[0].id,
                email: foundUser[0].email,
                username: foundUser[0].username,
                token: foundUser[0].token
            }))
            AsyncStorage.setItem('token', foundUser[0].token)
            navigation.replace('Home');
        } else {
            alert('Invalid Credential')
        }

    }


    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ paddingHorizontal: 25 }}>
                <View
                    style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../Image/rn-icon.png')}
                        style={{ height: 200, width: 200, resizeMode: 'contain', margin: 30, }}
                    />
                </View>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: 30,
                    }}>
                    Login
                </Text>

                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder={"Email ID"}
                        style={{ flex: 1, paddingVertical: 0 }}
                        keyboardType="email-address"
                        onChangeText={(val) => setEmail(val)}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder={"Password"}
                        style={{ flex: 1, paddingVertical: 0 }}
                        secureTextEntry={true}
                        onChangeText={(val) => setPassword(val)}
                    />
                </View>

                <TouchableOpacity
                    onPress={handleLogin}
                    style={{ backgroundColor: '#307ecc', padding: 15, borderRadius: 10, marginBottom: 30 }}
                >
                    <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 16, color: '#fff' }}>Login</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    inputWrapper: {
        flexDirection: 'row',
        borderBottomColor: '#ccc', borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
    }
})
