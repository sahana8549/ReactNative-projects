// app/profileUploader/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';

export default function ProfileUploaderLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: '#4f6d7a' },
                headerTintColor: '#fff',
            }}
        >
            <Stack.Screen name="index" options={{ title: 'Create Profile' }} />
            <Stack.Screen name="history" options={{ title: '' }} />
        </Stack>
    );
}
