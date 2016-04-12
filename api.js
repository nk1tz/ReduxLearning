import superagent from 'superagent';

//---------- Constants ---------
// Big huge thesaurus API key:
const bhtKey = "41acd19c3639856d205e03a0c61fdb5b";
// Wordnik API key
const wordnikKey = "100965abc00a8e73f570b08578a0131af8b8ff98caefcae7d";

// --------- API calls ----------
//-------------------------------
class Api {

  getSynonym(word, cb) {
    superagent
    .get('https://words.bighugelabs.com/api/2/' + bhtKey + '/' + word + '/json')
    .end(function(err, res) {
      if (err || !res.ok) {
        console.log('Oh no! error');
      } else {
        var synonym = JSON.parse(res.text).adjective.syn.pop();
        return cb(synonym);
      }
    });
  }

  getDefinition(word, cb) {
    superagent
    .get('http://api.wordnik.com/v4/word.json/' + word + '/definitions?api_key=' + wordnikKey)
    .end(function(err, res) {
      if (err || !res.ok) {
        console.log('Oh no! error');
      } else {
        console.log();
        var definition = JSON.parse(res.text)[0].text;
        return cb(definition);
      }
    });
  }

}

export default new Api();
