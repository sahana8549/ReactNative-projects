import { store } from '@/src/foodOrdering/redux/store';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';

export default function FoodOrderingLayout() {
    return (
        <Provider store={store}>
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: '#4f6d7a' },
                    headerTintColor: '#fff',
                    title: '',
                }}
            />
        </Provider>
    );
}

