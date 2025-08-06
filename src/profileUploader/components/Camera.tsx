// //  MyApps / src / profileUploader / components / Camera.tsx
// import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
// import { useRef, useState } from 'react';
// import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function Camera() {
//     const [facing, setFacing] = useState<CameraType>('back');
//     const [permission, requestPermission] = useCameraPermissions();
//     const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
//     const cameraRef = useRef<CameraView>(null);

//     if (!permission) {
//         return <View />;
//     }

//     if (!permission.granted) {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.message}>We need your permission to show the camera</Text>
//                 <Button onPress={requestPermission} title="Grant Permission" />
//             </View>
//         );
//     }

//     const toggleCameraFacing = () => {
//         setFacing((current) => (current === 'back' ? 'front' : 'back'));
//     };

//     const takePhoto = async () => {
//         if (cameraRef.current) {
//             const photo = await cameraRef.current.takePictureAsync();
//             setCapturedPhoto(photo.uri);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
//                 <View style={styles.buttonContainer}>
//                     <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
//                         <Text style={styles.text}>Flip</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.captureButton} onPress={takePhoto} />
//                 </View>
//             </CameraView>

//             {capturedPhoto && (
//                 <View style={styles.previewContainer}>
//                     <Text style={styles.previewText}>Captured Photo:</Text>
//                     <Image source={{ uri: capturedPhoto }} style={styles.previewImage} />
//                 </View>
//             )}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: { flex: 1 },
//     message: {
//         textAlign: 'center',
//         paddingBottom: 10,
//         fontSize: 16,
//     },
//     camera: {
//         flex: 1,
//     },
//     buttonContainer: {
//         position: 'absolute',
//         bottom: 30,
//         width: '100%',
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         alignItems: 'center',
//     },
//     button: {
//         backgroundColor: 'rgba(0,0,0,0.4)',
//         padding: 10,
//         borderRadius: 8,
//     },
//     captureButton: {
//         width: 70,
//         height: 70,
//         borderRadius: 35,
//         backgroundColor: '#fff',
//         borderWidth: 3,
//         borderColor: '#000',
//     },
//     text: {
//         color: 'white',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     previewContainer: {
//         alignItems: 'center',
//         padding: 16,
//         backgroundColor: '#eee',
//     },
//     previewText: {
//         fontSize: 16,
//         fontWeight: '600',
//         marginBottom: 8,
//     },
//     previewImage: {
//         width: '90%',
//         height: 300,
//         borderRadius: 10,
//     },
// });
// src/components/profileUploader/components/Camera.tsx
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function Camera({
    onCapture,
    onCancel,
}: {
    onCapture: (uri: string) => void;
    onCancel: () => void;
}) {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);

    if (!permission) return <View />;
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need permission to use the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    const toggleCameraFacing = () => {
        setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
    };

    const takePhoto = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            onCapture(photo.uri);
        }
    };

    return (
        <View style={styles.container}>
            <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.captureButton} onPress={takePhoto} />
                    <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                        <Text style={styles.text}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
        fontSize: 16,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 10,
        borderRadius: 8,
    },
    cancelButton: {
        backgroundColor: 'rgba(255,0,0,0.6)',
        padding: 10,
        borderRadius: 8,
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: '#000',
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
