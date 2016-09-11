$.getScript('trie.js', function()
{
  function $$(id) {
    return document.getElementById(id);
  };

  var trie = new Trie();
  var wordRanks = [];
  var wiktionary = [];

  function readText(){
      jQuery.ajax({
          url : "wiktionary.txt",
          dataType: "text",
          success : function (data) {
              wiktionary = data.split('\n');
              for (var i = 0; i < wiktionary.length; i++) {
                var line = wiktionary[i].split('\t');
                var word = line[1];
                var rank = line[0];
                wordRanks[word] = rank;
                trie.add(word);
              }
          }
      });
  }

  function keyup() {
    var prefix = $$("inputBox").value;
    $$("list").innerHTML = "";
    if (prefix.length > 0) {
      var words = trie.findWords(prefix);
      words.sort(function(a, b) {
        return wordRanks[b] - wordRanks[a];
      })
      for (var i = 0; i < Math.min(words.length, 10); i++) {
        $$("list").innerHTML += "<li>" + words[i] + "</li>";
      }
    }
    updateVisibility();
  }

  function keydown() {
    updateVisibility();
  }

  function updateVisibility() {
    $$("list").style.visibility = ($$("inputBox").value.length == 0) ? "hidden" : "";
    $$("list").style.visibility = ($$("list").childNodes.length == 0) ? "hidden" : "";
  }
  readText();
  $("#inputBox").keyup(function() { keyup(); });
  $("#inputBox").keydown(function() { keydown(); })
});
