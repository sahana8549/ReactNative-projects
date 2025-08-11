
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle: { backgroundColor: '#4f6d7a' },
          headerTintColor: '#fff',
          drawerActiveTintColor: '#4f6d7a',
          drawerLabelStyle: { fontSize: 16 },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
          }}
        />
        <Drawer.Screen
          name="foodOrdering"
          options={{
            drawerLabel: 'Food Ordering',
            title: ' 🍔 Food Ordering',
          }}
        />
        <Drawer.Screen
          name="profileUploader"
          options={{
            drawerLabel: 'Profile Uploader',
            title: 'Profile & Photo Upload',
          }}
        />
        <Drawer.Screen
          name="hangMan"
          options={{
            drawerLabel: 'Hang Man Game',
            title: 'Hang Man Game',
          }}
        />


      </Drawer>
    </GestureHandlerRootView>
  );
}
