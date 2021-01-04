const temp0 = document.body.getElementsByTagName('pre')[0];
const decks = temp0.textContent.trim().split("\n\n").filter(value => value)
    .map(deck => (deck.split("\n").map(card => parseInt(card)))).map(deck => deck.slice(1, deck.length));

let [deckOne, deckTwo] = JSON.parse(JSON.stringify(decks));

// part one
while (deckOne.length > 0 && deckTwo.length > 0) {
    let cardOne = deckOne.shift();
    let cardTwo = deckTwo.shift();

    if (cardOne > cardTwo) {
        deckOne.push(cardOne, cardTwo);
    } else {
        deckTwo.push(cardTwo, cardOne);
    }
}

const winner = deckOne.length ? deckOne : deckTwo;

const points = winner.reduce((accumulator, current, index, deck) => (accumulator + (current * (deck.length - index))), 0);

console.log('Part One: ' + points);

// part two
[deckOne, deckTwo] = JSON.parse(JSON.stringify(decks));

const recursiveCombat = (deckOne, deckTwo) => {
    const previousRoundsOne = new Set();
    const previousRoundsTwo = new Set();

    while(deckOne.length > 0 && deckTwo.length > 0){
        const deckRoundP1 = deckOne.join(',');
        const deckRoundP2 = deckTwo.join(',');

        if(previousRoundsOne.has(deckRoundP1) || previousRoundsTwo.has(deckRoundP2)) {
            return [deckOne.reduce((accumulator, current, index, deck) => (accumulator + (current * (deck.length - index))), 0), 1];
        }

        const cardOne = deckOne.shift();
        const cardTwo = deckTwo.shift();

        // Check for length / card value 
        if(cardOne <= deckOne.length && cardTwo <= deckTwo.length){
            const [, winner] = recursiveCombat(deckOne.slice(0, cardOne), deckTwo.slice(0, cardTwo));
            if(winner == 1) {
                deckOne.push(cardOne, cardTwo);
            } else {
                deckTwo.push(cardTwo, cardOne);
            }
        } else {
            if(cardOne > cardTwo) {
                deckOne.push(cardOne, cardTwo);
            } else { 
                deckTwo.push(cardTwo, cardOne);
            } 
        }

        previousRoundsOne.add(deckRoundP1);
        previousRoundsTwo.add(deckRoundP2);
    }

    winningDeck = deckOne.length > 0 ? deckOne : deckTwo;

    const score = winningDeck.reduce((accumulator, current, index, deck) => (accumulator + (current * (deck.length - index))), 0);

    return [score, deckOne.length > 0 ? 1 : 2];
}

const partTwo = recursiveCombat(deckOne, deckTwo);
console.log('Part Two: ' + partTwo[0]);