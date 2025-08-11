import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Animatable.Image
                animation="bounceIn"
                duration={1500}
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png' }}
                style={styles.logo}
                resizeMode="contain"
            />
            <Animatable.Text animation="fadeInUp" delay={400} style={styles.title}>
                Welcome to App Hub
            </Animatable.Text>
            <Text style={styles.subtitle}>Choose a mini-app from the drawer menu or below.</Text>

            <TouchableOpacity
                onPress={() => router.push('/foodOrdering')}
                style={styles.exploreBtn}
            >
                <Text style={styles.exploreText}>Open Food Ordering App 🍔</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => router.push('/profileUploader')}
                style={[styles.exploreBtn, { backgroundColor: '#8e44ad' }]}
            >
                <Text style={styles.exploreText}>Open Profile Uploader App 📸</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => router.push('/hangMan')}
                style={[styles.exploreBtn, { backgroundColor: '#dfc00dff' }]}
            >
                <Text style={styles.exploreText}>Play Hangman Game 🎩</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fefefe',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,


    },
    logo: {
        width: 150,
        height: 150,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        marginTop: 24,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 8,
        textAlign: 'center',
    },
    exploreBtn: {
        marginTop: 20,
        backgroundColor: '#4f6d7a',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 10,
    },
    exploreText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
