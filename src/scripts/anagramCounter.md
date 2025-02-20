# Problem Solving: Anagram Counter

This code implements two functions: `sortStringsInArray` and `anagramCounter`.

`sortStringsInArray`: This function takes an array of strings and returns a new array with each string sorted alphabetically by its characters. For example, "hello" becomes "ehllo".

`anagramCounter`: This function efficiently finds anagrams. It takes a dictionary of words and a query of words as input. It returns an array containing all words from the dictionary that are anagrams of any word in the query.

The `anagramCounter` function uses a `Map` data structure to store the sorted versions of the dictionary words as keys and the original words as values. This allows for efficient lookups when checking for anagrams in the query.  This approach reduces the time complexity from O(n*m) (using nested loops) to approximately O(n + m), where n is the size of the dictionary and m is the size of the query.

Example Usage:

const dictionary = ["cat", "dog", "tac", "god", "act"];
const query = ["cat", "god"];
const anagrams = anagramCounter(dictionary, query); // anagrams will be ["cat", "tac", "god", "dog"]

Assumptions:

* The code is case-sensitive (e.g., "Cat" and "cat" are considered different).
* It assumes that input strings contain only alphabetic characters.
