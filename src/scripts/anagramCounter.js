export function sortStringsInArray(arrayOfStrings) {
  const sortedStrings = []

  for (let string of arrayOfStrings) {
    const sortedString = string.split('').sort().join('')
    sortedStrings.push(sortedString)
  }

  return sortedStrings
}

export function anagramCounter(dictionary, query) {
  const matchingWords = []
  const sortedDictionary = sortStringsInArray(dictionary)
  const sortedQuery = sortStringsInArray(query)

  for (const word of sortedQuery) {
    const filteredWords = sortedDictionary.filter(item => item === word)
    matchingWords.push(filteredWords.length)
  }

  return matchingWords
}
