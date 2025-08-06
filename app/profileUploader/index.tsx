import Camera from '@/src/profileUploader/components/Camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type FormData = { name: string; email: string; phone: string };

export default function ProfileForm() {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [showCamera, setShowCamera] = useState(false);
    const router = useRouter();

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const onSubmit = async (data: FormData) => {
        if (!imageUri) return Alert.alert('Please pick or take a photo');
        const newProfile = { id: `${Date.now()}`, ...data, photo: imageUri };
        const prev = await AsyncStorage.getItem('profiles');
        const arr = prev ? JSON.parse(prev) : [];
        await AsyncStorage.setItem('profiles', JSON.stringify([newProfile, ...arr]));
        reset();
        setImageUri(null);
        router.push('/profileUploader/history');
    };

    if (showCamera) {
        return (
            <Camera
                onCapture={(uri) => {
                    setImageUri(uri);
                    setShowCamera(false);
                }}
                onCancel={() => setShowCamera(false)}
            />
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Create Your Profile</Text>

            <Controller
                name="name"
                control={control}
                rules={{ required: 'Name is required' }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={[styles.input, errors.name && styles.inputError]}
                        placeholder="Full Name"
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize="words"
                        returnKeyType="next"
                    />
                )}
            />
            {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

            <Controller
                name="email"
                control={control}
                rules={{
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
                }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={[styles.input, errors.email && styles.inputError]}
                        placeholder="Email Address"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={onChange}
                        value={value}
                        returnKeyType="next"
                    />
                )}
            />
            {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

            <Controller
                name="phone"
                control={control}
                rules={{
                    required: 'Phone number is required',
                    pattern: {
                        value: /^[0-9]{10}$/,
                        message: 'Enter a valid phone number',
                    },
                }}

                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={[styles.input, errors.phone && styles.inputError]}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        onChangeText={onChange}
                        value={value}
                        returnKeyType="done"
                    />
                )}
            />
            {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}

            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.btnOutline} onPress={pickImage} activeOpacity={0.7}>
                    <Text style={styles.btnOutlineText}>Pick from Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOutline} onPress={() => setShowCamera(true)} activeOpacity={0.7}>
                    <Text style={styles.btnOutlineText}>Take Photo</Text>
                </TouchableOpacity>
            </View>

            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.preview} />
            ) : (
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>No photo selected</Text>
                </View>
            )}

            <TouchableOpacity
                style={[styles.btnPrimary, !imageUri && styles.btnDisabled]}
                onPress={handleSubmit(onSubmit)}
                activeOpacity={imageUri ? 0.8 : 1}
                disabled={!imageUri}
            >
                <Text style={styles.btnPrimaryText}>Save Profile</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#fff',
        flexGrow: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 30,
        textAlign: 'center',
        color: '#1a1a1a',
    },
    input: {
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        marginBottom: 8,
        backgroundColor: '#fafafa',
        color: '#222',
    },
    inputError: {
        borderColor: '#e63946',
    },
    error: {
        color: '#e63946',
        marginBottom: 12,
        marginLeft: 4,
        fontWeight: '600',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    btnOutline: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 14,
        borderWidth: 2,
        borderColor: '#4a90e2',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f5ff',
    },
    btnOutlineText: {
        color: '#4a90e2',
        fontSize: 16,
        fontWeight: '600',
    },
    preview: {
        width: '100%',
        height: 220,
        borderRadius: 14,
        marginBottom: 24,
    },
    placeholder: {
        height: 220,
        borderRadius: 14,
        marginBottom: 24,
        backgroundColor: '#ececec',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#888',
        fontSize: 16,
        fontStyle: 'italic',
    },
    btnPrimary: {
        backgroundColor: '#4a90e2',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    btnPrimaryText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    btnDisabled: {
        backgroundColor: '#a1c4fd',
    },
});
