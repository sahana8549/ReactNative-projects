export const getWordWithClue = async (): Promise<{ word: string; clue: string }> => {
    const wordRes = await fetch('https://random-word-api.herokuapp.com/word?number=1');
    const [word] = await wordRes.json();

    const definitionRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const definitionJson = await definitionRes.json();

    const clue =
        definitionJson?.[0]?.meanings?.[0]?.definitions?.[0]?.definition ??
        'A framework for developing React Native apps.';

    return {
        word: definitionJson?.[0]?.meanings?.[0]?.definitions?.[0]?.definition ? word.toUpperCase() : "EXPO",
        clue,
    };
};
