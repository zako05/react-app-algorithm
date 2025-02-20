export function improveAnagramCounter(dictionary, query) {
  const anagramMap = new Map()
  const matchingWords = []

  for (const word of dictionary) {
    const sortedWord = word.split('').sort().join('')
    anagramMap
      .set(sortedWord, (anagramMap.get(sortedWord) || 0) + 1)
  }

  for (const word of query) {
    const sortedWord = word.split('').sort().join('')
    matchingWords.push(anagramMap.get(sortedWord) || 0)
  }

  return matchingWords
}
