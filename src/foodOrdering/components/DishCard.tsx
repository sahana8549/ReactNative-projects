import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, decreaseQuantity } from '../redux/cartSlice';
import type { FoodItem } from '../redux/foodSlice';
import { RootState } from '../redux/store';

export default function DishCard({
    item,
    index,
}: {
    item: FoodItem;
    index: number;
}) {
    const dispatch = useDispatch();
    const cartItem = useSelector((state: RootState) =>
        state.cart.items.find(i => i.id === item.id)
    );
    const quantity = cartItem?.quantity || 0; return (
        <Animatable.View animation="fadeInUp" delay={index * 100}>
            <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.img} />
                <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.desc}>{item.description}</Text>
                    <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                    <Text style={styles.price}>Quantity: {quantity}</Text>

                </View>

                <View style={styles.itemActions}>

                    {quantity > 0 && <TouchableOpacity
                        style={styles.removeBtn}
                        onPress={() => dispatch(decreaseQuantity(item.id))}
                    >
                        <Text style={styles.removeTxt}>−</Text>
                    </TouchableOpacity>}
                    <TouchableOpacity
                        style={styles.addBtn}
                        onPress={() => dispatch(addItem(item))}
                    >
                        <Text style={styles.addText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 12,
        borderRadius: 10,
        alignItems: 'center',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',

    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    info: {
        flex: 1,
        marginLeft: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
    },
    desc: {
        fontSize: 14,
        color: '#555',
        marginVertical: 4,
    },
    price: {
        fontSize: 16,
        color: '#4f6d7a',
        marginBottom: 8,
    },
    addBtn: {
        backgroundColor: '#4f6d7a',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    addText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    itemActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    }, removeBtn: {
        backgroundColor: '#e74c3c',
        borderRadius: 6,
        paddingHorizontal: 14,
        paddingVertical: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeTxt: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
