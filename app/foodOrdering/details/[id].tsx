import { addItem } from '@/src/foodOrdering/redux/cartSlice';
import type { RootState } from "@/src/foodOrdering/redux/store";
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function DetailScreen() {
    const { id } = useLocalSearchParams();
    const item = useSelector((s: RootState) =>
        s.food.menuItems.find(m => m.id === id)
    );
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);

    if (!item) return <Text style={styles.notFound}>Item not found</Text>;

    const increaseQty = () => setQuantity(q => q + 1);
    const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            dispatch(addItem(item));
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Image source={{ uri: item.image }} style={styles.img} />
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.category}>{item.category ?? 'Category: Unknown'}</Text>
            <Text style={styles.desc}>{item.description}</Text>

            <View style={styles.priceQtyRow}>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>

            </View>

            <TouchableOpacity style={styles.btn} onPress={handleAddToCart}>
                <Text style={styles.btnText}>Add to Cart</Text>
            </TouchableOpacity>

            <View style={styles.nutritionSection}>
                <Text style={styles.nutritionTitle}>Nutrition Info</Text>
                <View style={styles.nutritionRow}>
                    <Text style={styles.nutritionLabel}>Calories:</Text>
                    <Text style={styles.nutritionValue}>{item.calories ?? 'N/A'}</Text>
                </View>
                <View style={styles.nutritionRow}>
                    <Text style={styles.nutritionLabel}>Protein:</Text>
                    <Text style={styles.nutritionValue}>{item.protein ?? 'N/A'}</Text>
                </View>
                <View style={styles.nutritionRow}>
                    <Text style={styles.nutritionLabel}>Carbs:</Text>
                    <Text style={styles.nutritionValue}>{item.carbs ?? 'N/A'}</Text>
                </View>
                <View style={styles.nutritionRow}>
                    <Text style={styles.nutritionLabel}>Fat:</Text>
                    <Text style={styles.nutritionValue}>{item.fat ?? 'N/A'}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    notFound: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
        color: '#777',
    },
    img: {
        width: '100%',
        height: 250,
        borderRadius: 12,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
    },
    category: {
        fontSize: 14,
        color: '#999',
        marginBottom: 10,
        fontStyle: 'italic',
    },
    desc: {
        fontSize: 16,
        lineHeight: 22,
        color: '#555',
        marginBottom: 20,
    },
    priceQtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    price: {
        fontSize: 24,
        fontWeight: '700',
        color: '#4f6d7a',
    },
    btn: {
        backgroundColor: '#4f6d7a',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 32,
    },
    btnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    nutritionSection: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 20,
    },
    nutritionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#4f6d7a',
        marginBottom: 12,
    },
    nutritionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    nutritionLabel: {
        color: '#666',
        fontSize: 16,
    },
    nutritionValue: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    },
});
