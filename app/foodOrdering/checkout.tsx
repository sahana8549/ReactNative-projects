import { clearCart } from '@/src/foodOrdering/redux/cartSlice';
import { addOrder } from '@/src/foodOrdering/redux/orderSlice';
import type { RootState } from '@/src/foodOrdering/redux/store';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function Checkout() {
    const cartItems = useSelector((s: RootState) => s.cart.items);
    const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const dispatch = useDispatch();
    const [showThankYou, setShowThankYou] = useState(false);
    const router = useRouter();

    const handlePayment = () => {
        const newOrder = {
            id: `${Date.now()}`,
            date: new Date().toISOString(),
            items: cartItems,
            total,
        };

        dispatch(addOrder(newOrder));
        dispatch(clearCart());
        setShowThankYou(true);

        setTimeout(() => {
            setShowThankYou(false);
            router.replace('/foodOrdering/history');
        }, 3000);
    };

    const renderItem = ({ item }: { item: typeof cartItems[0] }) => (
        <View style={styles.itemRow}>
            <Text style={styles.itemText}>
                {item.name} x {item.quantity}
            </Text>
            <Text style={styles.itemText}>
                ${(item.price * item.quantity).toFixed(2)}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Summary</Text>
            <View style={styles.itemsContainer}>
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#999', marginTop: 20 }}>Your cart is empty.</Text>}
                />
            </View>

            <View style={styles.summaryBox}>
                <Text style={styles.label}>Items Total:</Text>
                <Text style={styles.total}>${total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
                style={[styles.payBtn, { opacity: total ? 1 : 0.5 }]}
                onPress={handlePayment}
                disabled={total === 0}
            >
                <Text style={styles.payTxt}>Confirm & Pay</Text>
            </TouchableOpacity>

            <Modal transparent visible={showThankYou} animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.thankText}>🎉 Thank you for your order!</Text>
                        <Text style={styles.subText}>We’re preparing your delicious food 🍽️</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fdfdfd',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 24,
        textAlign: 'center',
    },
    summaryBox: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        boxShadow: ' 0px 3px 6px rgba(0, 0, 0, 0.05)',
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 18,
        color: '#666',
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4f6d7a',
    },
    payBtn: {
        backgroundColor: '#4f6d7a',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    payTxt: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 14,
        alignItems: 'center',
        maxWidth: 300,
    },
    thankText: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    },
    subText: {
        fontSize: 16,
        color: '#444',
        textAlign: 'center',
    },
    itemsContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        marginBottom: 20,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.04)',
        maxHeight: 250,  // limit height if many items
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
});
