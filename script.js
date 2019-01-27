const words = ['front', 'around', 'strange', 'stripe', 'basket', 
'balloon', 'steep'];
const app_id = '418ce3a2';
const app_key = '928ab8752a231fc9b7d146d9e7ced8b6';
var language = 'en';
var idx = 0;
var secondClue;
var clue;

function loadCurrWord() {
    console.log(words[idx]);
    var url = 'https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com:443/api/v1/entries/' + language + '/' + words[idx].toLowerCase()

        // So that the modal loads when the page is loaded
        fetch(url, {
            headers: {'app_id': app_id, 'app_key': app_key}
        })
    .then((resp) => resp.json()) // Transform the data into json
        .then(function(data) {
            clue = data['results'][0]['lexicalEntries'][0]['entries'][0]['senses'][0]['definitions'][0];
            secondClue = JSON.stringify(data['results'][0]['lexicalEntries'][0]['entries'][0]['senses'][0]['examples'][0]['text']);
            console.log(data['results'][0]['lexicalEntries'][0]['entries'][0]['senses'][0]['examples'][0]['text']);
    var item = document.getElementById('clue');
    item.innerText = clue;
    clue = JSON.stringify(clue);
        })
    return;
}

function skipQuestion() {
    idx = idx + 1;
    loadCurrWord();
}

$(window).on('load',function(){
    loadCurrWord();
});

function skipQuestion() {
    idx = idx + 1;
    loadCurrWord();
}

function checkSubmission() {
    $('#myModal').modal('show');
    var answer = document.getElementById('answer').value
    if (answer.toLowerCase() == words[idx]) {
        document.getElementById('result').innerHTML = 'Your answer is correct! <br> Good Job!';
        idx = idx + 1;
        loadCurrWord();
    } else {
    document.getElementById('result').innerHTML = 'Your answer is not correct!';
    var item = document.getElementById('clue');
    secondClue = secondClue.replace(words[idx], '_____');
    console.log(typeof secondClue)
    item.innerText = clue + '\n\n' + secondClue;
    console.log(item.innerText);
  }
        return;
}
