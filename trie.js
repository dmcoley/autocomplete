/* Constructs a new Node setting the isWord flag
   to false and an empty array of children */
function Node() {
  this.isWord = false;
  this.children = [];
}

/* Constructs a new Trie with the root set
   as a default empty Node */
function Trie() {
  this.root = new Node();
}

/* Inserts the given word into the Trie */
Trie.prototype.add = function(word) {
  traverse(this.root, word, true);
}

/* Returns true iff the given word is in the Trie */
Trie.prototype.search = function(word) {
  return traverse(this.root, word, false);
}

/* Returns true iff there is any word in the 
   Trie that starts with the given prefix */
Trie.prototype.startsWith = function(prefix) {
  return traverse(this.root, prefix, false);
}

/* Returns an array of all words in the Trie
   that start with the given prefix */
Trie.prototype.findWords = function(prefix) {
  var words = [];
  var curr = this.root;
  for (var i = 0; i < prefix.length; i++) {
    var difference = prefix.charAt(i).charCodeAt(0) - 'a'.charCodeAt(0);
    if (!curr.children[difference]) {
      return words;
    }
    curr = curr.children[difference]
  } 
  findWords(curr, words, prefix);
  return words;  
}

/* Accumulates the given array of words with all valid words
   in the Trie that start from the given curr Node */
var findWords = function(curr, words, currWord) {
  if (!curr) {
    return;
  } else if (curr.isWord) {
    words.push(currWord);
  } else {
    for (var i = 0; i < curr.children.length; i++) {
      if (curr.children[i]) {
        findWords(curr.children[i], words, currWord + String.fromCharCode('a'.charCodeAt(0)+ i));
      }
    }
  }
}

/* Traverses the Trie with the given root Node
   and adds Nodes or returns different boolean 
   values dependent on the create flag's value */
var traverse = function(root, word, create) {
  var curr = root;
  for (var i = 0; i < word.length; i++) {
    var index = word.charAt(i).charCodeAt(0) - 'a'.charCodeAt(0);
    if (!curr.children[index]) {
      if (create) {
        curr.children[index] = new Node();
      } else {
        return false;
      }
    }
    curr = curr.children[index];
  }
  if (create) {
    curr.isWord = true;
  }
  return curr.isWord;
}
