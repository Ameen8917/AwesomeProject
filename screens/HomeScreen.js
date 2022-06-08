import AsyncStorage from '@react-native-community/async-storage'
import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../features/products/productSlice'

const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector((state) => state.products)

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        navigation.replace('Login');
    }

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    return (
        <View style={{ flex: 1, paddingHorizontal: 20 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity
                    style={{ alignSelf: 'center', backgroundColor: '#000', padding: 10, marginTop: 20, width: 100, borderRadius: 10 }}
                    onPress={handleLogout}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '500' }}>Logout</Text>
                </TouchableOpacity>
            </View>


            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {products.length > 0 && products.map(item => {
                    return (
                        <View key={item.id} style={styles.card}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View style={{ flex: 1, borderColor: '#efefef', borderWidth: 2, borderRadius: 10, padding: 10 }}>
                                    <Image source={{ uri: item.image }}
                                        style={{ width: 100, height: 100, }} />
                                </View>
                                <View style={{ flex: 2, marginLeft: 10 }}>
                                    <Text style={{ fontWeight: '500', marginBottom: 5, fontSize: 16, color: '#000', textTransform: 'capitalize' }} numberOfLines={1}>{item.title}</Text>
                                    <Text style={{ fontWeight: '400', marginBottom: 5, fontSize: 14, color: 'grey', textTransform: 'capitalize' }} numberOfLines={1}>{item.category}</Text>
                                    <Text style={{ fontWeight: '400', marginBottom: 5, fontSize: 10, color: 'grey', textTransform: 'capitalize' }} numberOfLines={3}>{item.description}</Text>
                                    <View style={{ borderTopWidth: 1, borderTopColor: '#efefef', }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                            <Text style={{ fontWeight: '700', fontSize: 16, color: '#000' }}>{item.price}</Text>
                                            <TouchableOpacity style={{ backgroundColor: 'green', paddingHorizontal: 15, paddingVertical: 4, borderRadius: 15 }}>
                                                <Text style={{ color: '#fff', fontWeight: '500' }}>Add</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>)
                })}
            </ScrollView>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        marginVertical: 10
    }
})