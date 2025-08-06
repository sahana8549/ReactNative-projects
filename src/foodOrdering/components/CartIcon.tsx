import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function CartIcon() {
    const router = useRouter();
    const totalQuantity = useSelector((state: any) =>
        state.cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0)
    );

    return (
        <TouchableOpacity onPress={() => router.push('/foodOrdering/cart')} style={styles.container}>
            <Feather name="shopping-cart" size={30} color="black" style={styles.cartIcon} />
            {
                totalQuantity > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{totalQuantity}</Text>
                    </View>
                )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    cartIcon: {
        width: 30,
        height: 30,
    },
    badge: {
        position: 'absolute',
        right: 4,
        top: 2,
        backgroundColor: '#ff3b30',
        borderRadius: 10,
        width: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
});
