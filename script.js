const wordEl = document.getElementById('word');
const popup = document.querySelector('.popup-container');
const messageContainer = document.querySelector('.winner-notification-container');
const wronglettersArr = document.querySelector('.wrong-letter');
const figure = document.querySelectorAll('.figure-disp');
const message = document.querySelector('.winner');
const playAgain = document.querySelector('#play-again');


const words = ['javascript','java','python','cplusplus','csharp'];
let randomSelection = words[Math.floor(Math.random() * words.length)];
console.log(randomSelection);

const rightletters = [];
const wrongLetters = [];
console.log(wrongLetters);

function display() {
  wordEl.innerHTML = `
    ${randomSelection
      .split('')
      .map(
        el => `<span class="letters">
    ${rightletters.includes(el) ? el : ''}</span>`
      )
      .join('')}`;
    const wordDisplay = wordEl.innerText.replace(/\n/g,'')
    console.log(wordDisplay);
    if(wordDisplay === randomSelection) {
        message.innerText = 'You Won';
        messageContainer.style.display = 'flex';

    }
}

function updateWrongArray() {
    wronglettersArr.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong Guess</p>': ''}
    ${wrongLetters.map(el => `<span>${el}</span>`)}`

    figure.forEach((el,idx) => {
        const error = wrongLetters.length;
        if(idx < error) {
            el.style.display = 'block';
        } else {
            el.style.display = 'none';
        }
    })
    if (wrongLetters.length === figure.length) {
        message.innerText = 'You Lose';
        messageContainer.style.display = 'flex';
    }
}

function showPopup() {
    popup.classList.add('show');

    setTimeout(()=> {
        popup.classList.remove('show');
    },2000)
}

window.addEventListener('keydown', e=> {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const enterKey = e.key;
        if (randomSelection.includes(enterKey)) {
            if(!rightletters.includes(enterKey)){
                rightletters.push(enterKey);
                display();
            }
            else {
                showPopup();
            }
        }else {
            if(!wrongLetters.includes(enterKey)) {
                wrongLetters.push(enterKey);
    
                updateWrongArray();
            }
            else {
                showPopup();
            }
        }
        
    
    }
});
display();
playAgain.addEventListener('click', () => {
    rightletters.splice(0);
    wrongLetters.splice(0);
    randomSelection = words[Math.floor(Math.random() * words.length)];
    display();
    updateWrongArray();
    popup.style.display = 'none';
    messageContainer.style.display = 'none';
    
})

