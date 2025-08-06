import CartIcon from '@/src/foodOrdering/components/CartIcon';
import DishCard from '@/src/foodOrdering/components/DishCard';
import type { RootState } from '@/src/foodOrdering/redux/store';
import { useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function MenuScreen() {
    const menu = useSelector((state: RootState) => state.food.menuItems);
    const navigation = useNavigation();
    const router = useRouter();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <CartIcon />,
        });
    }, [navigation]);
    return (
        <View style={{ flex: 1, backgroundColor: '#f7f7f7', padding: 16 }}>
            <FlatList
                data={menu}
                keyExtractor={i => i.id}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => router.push(`/foodOrdering/details/${item.id}`)}>
                        <DishCard item={item} index={index} />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
