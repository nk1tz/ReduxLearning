import request from 'superagent';

// API calls
//-----------
// Big huge thesaurus API key:
var bhtKey = "41acd19c3639856d205e03a0c61fdb5b";

export function getSynonym(word) {
  request
  .get('https://words.bighugelabs.com/api/2/' + bhtKey + '/' + word + '/')
  .end(function(err, res) {
    if (err || !res.ok) {
      console.log('Oh no! error');
    } else {
      console.log(res.body);
      //do something with res.body -> maybe JSON.stringify() ?
    }
  });
}
