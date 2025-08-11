import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface WordDisplayProps {
  word: string;
  guessedLetters: string[];

}

export default function WordDisplay({ word, guessedLetters }: WordDisplayProps) {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.scrollContainer}
      showsHorizontalScrollIndicator={false}
    >
      {word.split('').map((letter, index) => {
        const guessed = guessedLetters.includes(letter);
        return (
          <View key={index} style={[styles.letterBox, guessed && styles.guessedBox]}>
            <Text style={[styles.letter, guessed ? styles.guessedLetter : styles.hiddenLetter]}>
              {guessed ? letter : '_'}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: '100%',
    alignItems: 'center',
    flexWrap: 'wrap'
    , gap: 10

  },
  letterBox: {
    width: 38,
    height: 50,
    marginHorizontal: 6,
    borderBottomWidth: 3,
    borderColor: '#bbb',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#f5f7fa',
  },
  guessedBox: {
    backgroundColor: '#d1e7dd',
    borderColor: '#3c9d58',
  },
  letter: {
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center',
  },
  guessedLetter: {
    color: '#2e7d32',
  },
  hiddenLetter: {
    color: '#aaa',
  },
});
