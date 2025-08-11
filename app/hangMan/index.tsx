import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getWordWithClue } from '../hangMan/api/api';
import HangmanFigure from './components/HangmanFigure';
import Keyboard from './components/Keyboard';
import WordDisplay from './components/WordDisplay';

const MAX_WRONG = 6;

export default function HangmanGame() {
    const [word, setWord] = useState<string>('');
    const [clue, setClue] = useState<string>('');
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [wrongGuesses, setWrongGuesses] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [won, setWon] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch word + clue on mount
    useEffect(() => {
        fetchNewWord();
    }, []);

    const fetchNewWord = async () => {
        setLoading(true);
        try {
            const { word, clue } = await getWordWithClue();
            setWord(word);
            setClue(clue);
        } catch (error) {
            console.error('Failed to fetch word and clue:', error);
            setWord('EXPO');
            setClue('A framework for developing React Native apps.');
        } finally {
            setLoading(false);
        }
    };

    const onLetterPress = (letter: string) => {
        if (guessedLetters.includes(letter) || gameOver) return;

        const newGuesses = [...guessedLetters, letter];
        setGuessedLetters(newGuesses);

        if (!word.includes(letter)) {
            const wrong = wrongGuesses + 1;
            setWrongGuesses(wrong);
            if (wrong >= MAX_WRONG) {
                setGameOver(true);
                setWon(false);
            }
        } else {
            const allGuessed = word.split('').every((l) => newGuesses.includes(l));
            if (allGuessed) {
                setGameOver(true);
                setWon(true);
            }
        }
    };

    const resetGame = () => {
        setGuessedLetters([]);
        setWrongGuesses(0);
        setGameOver(false);
        setWon(false);
        fetchNewWord();
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4f6d7a" />
                <Text style={{ marginTop: 10 }}>Loading word & clue...</Text>
            </View>
        );
    }
    console.log('c;lue', clue);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>🎩 Hangman Game</Text>
            <Text style={styles.clueTitle}>🧠 Clue:</Text>
            <Text style={styles.clue}>{clue}</Text>

            <WordDisplay word={word} guessedLetters={guessedLetters} />
            <HangmanFigure wrongGuesses={wrongGuesses} />

            <Text style={styles.wrongText}>
                ❌ {wrongGuesses} / {MAX_WRONG} wrong guesses
            </Text>

            <Keyboard onLetterPress={onLetterPress} guessedLetters={guessedLetters} />

            <Modal visible={gameOver} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>{won ? '🎉 You Won!' : '☠️ Game Over'}</Text>
                        <Text style={styles.modalWord}>
                            Word was: <Text style={{ fontWeight: 'bold' }}>{word}</Text>
                        </Text>
                        <TouchableOpacity style={styles.button} onPress={resetGame}>
                            <Text style={styles.buttonText}>Play Again</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fdfdfd' },
    title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#2c3e50' },
    clueTitle: { fontSize: 18, textAlign: 'center', color: '#2c3e50', marginTop: 10, fontWeight: '600' },
    clue: { fontSize: 16, fontStyle: 'italic', textAlign: 'center', marginBottom: 20, color: '#7f8c8d' },
    wrongText: { textAlign: 'center', fontSize: 16, marginBottom: 10, color: '#c0392b' },

    modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalBox: { backgroundColor: '#fff', padding: 25, borderRadius: 10, alignItems: 'center', width: '80%' },
    modalTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    modalWord: { fontSize: 18, marginBottom: 20 },
    button: { backgroundColor: '#2c3e50', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
    buttonText: { color: '#fff', fontSize: 16 },

    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
