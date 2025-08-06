import { useRouter } from 'expo-router';
import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, clearCart, decreaseQuantity } from '../redux/cartSlice';

export default function CartScreen() {
    const cartItems = useSelector((state: any) => state.cart.items);
    const total = cartItems.reduce((s: number, i: any) => s + i.price * i.quantity, 0);
    const dispatch = useDispatch();
    const router = useRouter();

    const renderItem = ({ item }: any) => (
        <View style={styles.itemCard}>
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text>${item.price.toFixed(2)} × {item.quantity}</Text>
            </View>
            <View style={styles.itemActions}>
                <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => dispatch(addItem(item))}
                >
                    <Text style={styles.addText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => dispatch(decreaseQuantity(item.id))}
                >
                    <Text style={styles.removeTxt}>−</Text>
                </TouchableOpacity>
            </View>

        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Cart</Text>

            <TouchableOpacity
                onPress={() => dispatch(clearCart())}
                disabled={!cartItems.length}
                style={[styles.clearBtn, { display: cartItems.length ? 'flex' : 'none' }]}

            >
                <Text style={styles.clear}>Clear Cart</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={cartItems}
                    keyExtractor={(i) => i.id}
                    renderItem={renderItem}
                    ListEmptyComponent={<Text style={styles.empty}>Cart is empty.</Text>}
                />
            </View>
            <View style={styles.footer}>
                <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
                <TouchableOpacity
                    style={[styles.checkoutBtn, { opacity: cartItems.length ? 1 : 0.5 }]}
                    onPress={() => router.push('/foodOrdering/checkout')}
                    disabled={!cartItems.length}
                >
                    <Text style={styles.checkoutTxt}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7f7f7', padding: 16 },
    header: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 12 },
    clearBtn: {
        alignSelf: 'flex-end',
        marginBottom: 12,
        backgroundColor: '#4f6d7a',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    clear: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    itemCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    itemInfo: {},
    itemActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    itemName: { fontSize: 18, fontWeight: '600' },
    removeBtn: {
        backgroundColor: '#e74c3c',
        borderRadius: 6,
        paddingHorizontal: 14,
        paddingVertical: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeTxt: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    addBtn: {
        backgroundColor: '#4f6d7a',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 14,
        borderRadius: 6,
        paddingVertical: 6,
    },
    addText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
    empty: { textAlign: 'center', marginTop: 50, color: '#999' },
    footer: { paddingVertical: 12, borderTopWidth: 1, borderColor: '#ddd' },
    total: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
    checkoutBtn: {
        backgroundColor: '#4f6d7a',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    checkoutTxt: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

});
