import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function History() {
    const [profiles, setProfiles] = useState<any[]>([]);

    useFocusEffect(
        useCallback(() => {
            async function load() {
                const stored = await AsyncStorage.getItem('profiles');
                setProfiles(stored ? JSON.parse(stored) : []);
            }
            load();
        }, [])
    );

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity activeOpacity={0.8} style={styles.card}>
            <Image source={{ uri: item?.photo }} style={styles.thumb} />
            <View style={styles.info}>
                <Text style={styles.name}>{item?.name}</Text>
                <Text style={styles.email}>{item?.email}</Text>
                <Text style={styles.email}>{item?.phone}</Text>

            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>📂 Saved Profiles</Text>
            <FlatList
                data={profiles}
                keyExtractor={(p) => p.id}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={styles.empty}>No profiles yet.</Text>}
                contentContainerStyle={profiles.length === 0 && styles.emptyContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9', padding: 16 },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
        textAlign: 'center',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',

    },
    thumb: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginRight: 16,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    info: { flex: 1 },
    name: { fontSize: 18, fontWeight: '600', color: '#222' },
    email: { fontSize: 14, color: '#666', marginTop: 4 },
    empty: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginTop: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
    },
});
