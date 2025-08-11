import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
interface KeyboardProps {
  onLetterPress: (letter: string) => void;
  guessedLetters: string[];

}
export default function Keyboard({ onLetterPress, guessedLetters }: KeyboardProps) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <View style={styles.keyboard}>
      {alphabet.map((letter) => (
        <TouchableOpacity
          key={letter}
          style={[
            styles.key,
            guessedLetters.includes(letter) && styles.disabledKey,
          ]}
          onPress={() => onLetterPress(letter)}
          disabled={guessedLetters.includes(letter)}
        >
          <Text style={styles.keyText}>{letter}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  key: {
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    width: 40,
    alignItems: 'center',
    marginBottom: Platform.OS === 'android' ? 40 : 0,
  },
  disabledKey: {
    backgroundColor: '#bdc3c7',
  },
  keyText: {
    fontSize: 16,
    color: '#2c3e50',
  },
});
