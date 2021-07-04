const buttonRules = document.querySelector('.button-rules');
const buttonClose = document.querySelector('.rules--close');
const rules = document.querySelector('.rules');

const paper = document.querySelector('.paper')
const rock = document.querySelector('.rock')
const scissors = document.querySelector('.scissors');

const paper1 = paper.cloneNode(true);
paper1.classList.remove('position--paper');
const rock1 = rock.cloneNode(true)
rock1.classList.remove('position--rock');
const scissors1 = scissors.cloneNode(true);
scissors1.classList.remove('position--scissors');

const paper2 = paper1.cloneNode(true);
const rock2 = rock1.cloneNode(true)
const scissors2 = scissors1.cloneNode(true);

const pickOne = document.querySelector('.game');
const picked = document.querySelector('.picked');
const pick_user = document.querySelector('.user');
const pick_computer = document.querySelector('.house');

const resultado = document.querySelector('.result');
const printResult = document.querySelector('.div--h2-result')
const score = document.querySelector('#score');

// SHOW/HIDE RULES

buttonRules.addEventListener('click', function () {
    rules.style.visibility = 'visible';
});

buttonClose.addEventListener('click', function () {
    rules.style.visibility = 'hidden';
});

// GAME

class Game {
    constructor() {
        this.picks = {
            paper,
            rock,
            scissors
        }
        this.score = 0
        this.result
        this.pick
    }

    jugar() {
        this.pickHouse();
        this.listenUser();
    }

    pickHouse() {
        this.pick = Math.floor(Math.random() * 3);
        //console.log(this.pick);
    }

    pickToWords(pick) {
        switch (pick) {
            case 0:
                return 'paper';
            case 1:
                return 'rock';
            case 2:
                return 'scissors';
        }
    }

    comparar(user) {
        if (this.pickToWords(this.pick) != user) {
            if (this.pickToWords(this.pick) === 'scissors' && user === 'rock' || this.pickToWords(this.pick) === 'rock' && user === 'paper' || this.pickToWords(this.pick) === 'paper' && user === 'scissors') {
                this.result = 0;
            } else {
                this.result = 2;
            }
        } else if (this.pickToWords(this.pick) === user) {
            this.result = 3;
        }
        this.showHidden(user);
    }

    listenUser() {
        this.picks.paper.addEventListener('click', this.pickUser.bind(this));
        this.picks.rock.addEventListener('click', this.pickUser.bind(this));
        this.picks.scissors.addEventListener('click', this.pickUser.bind(this));
    }

    pickUser(ev) {
        let pickUser = ev.target.dataset.pick;
        this.comparar(pickUser);
    }

    showHidden(pickUser) {
        pickOne.style.display = 'none';
        picked.style.display = 'grid';
        switch (pickUser) {
            case 'paper':
                pick_user.insertAdjacentElement('afterend', paper1);
                break
            case 'rock':
                pick_user.insertAdjacentElement('afterend', rock1);
                break
            case 'scissors':
                pick_user.insertAdjacentElement('afterend', scissors1);
        }
        setTimeout(() => {
            this.printResult();
        }, 1000);
    }

    showPick() {
        switch (this.pick) {
            case 0:
                pick_computer.appendChild(paper2);
                break
            case 1:
                pick_computer.appendChild(rock2);
                break
            case 2:
                pick_computer.appendChild(scissors2);
        }

    }

    printResult() {
        this.showPick();
        switch (this.result) {
            case 0:
                this.score += 1;
                printResult.innerHTML = 'You Win'
                score.innerHTML = this.score;
                break
            case 2:
                if(this.score>0){
                    this.score -= 1;
                }
                printResult.innerHTML = 'You Lose'
                score.innerHTML = this.score
                break
            case 3:
                printResult.innerHTML = 'You Tie'
                break
        }
        resultado.style.visibility = 'visible';
    }

    again() {
        paper1.remove();
        scissors1.remove();
        rock1.remove();
        paper2.remove();
        scissors2.remove();
        rock2.remove();
        resultado.style.visibility = 'hidden';
        picked.style.display = 'none';
        pickOne.style.display = 'grid';
        this.pickHouse();
    }
}