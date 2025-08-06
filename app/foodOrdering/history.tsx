import type { RootState } from '@/src/foodOrdering/redux/store';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function OrderHistory() {
    const orders = useSelector((state: RootState) => state.orders.orders);

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return { datePart: 'Invalid date', timePart: '' };

        const datePart = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });

        const timePart = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });

        return { datePart, timePart };
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Order History</Text>

            <FlatList
                data={orders}
                keyExtractor={(o) => o.id}
                ListEmptyComponent={<Text style={styles.empty}>No orders placed yet.</Text>}
                renderItem={({ item }) => {
                    const { datePart, timePart } = formatDate(item.date);

                    return (
                        <View style={styles.card}>
                            <View style={styles.row}>
                                <View style={styles.infoBlock}>
                                    <Text style={styles.infoLabel}>Date</Text>
                                    <Text style={styles.infoValue}>{datePart}</Text>
                                </View>
                                <View style={styles.infoBlock}>
                                    <Text style={styles.infoLabel}>Time</Text>
                                    <Text style={styles.infoValue}>{timePart}</Text>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.infoBlock}>
                                    <Text style={styles.infoLabel}>Items</Text>
                                    <Text style={styles.infoValue}>{item.items.length}</Text>
                                </View>
                                <View style={styles.infoBlock}>
                                    <Text style={styles.infoLabel}>Total</Text>
                                    <Text style={[styles.infoValue, styles.total]}>${item.total.toFixed(2)}</Text>
                                </View>
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: '700',
        color: '#222',
        marginBottom: 24,
        textAlign: 'center',
        letterSpacing: 1,
    },
    empty: {
        textAlign: 'center',
        marginTop: 50,
        color: '#999',
        fontSize: 18,
        fontStyle: 'italic',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    infoBlock: {
        flex: 1,
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 14,
        color: '#888',
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    infoValue: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    total: {
        color: '#2c7a7b',
        fontWeight: '700',
    },
});
