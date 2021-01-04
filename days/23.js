// const temp0 = document.body.querySelectorAll('code.puzzle-cups')[0];
const temp0 = '598162734';

const initialData = temp0.trim().split('').filter(value => value).map(value => parseInt(value));

// part one
const cups = [...initialData];
let currentCup = cups[0];
let modulo = cups.length;

const retrieveNextCups = (list, number, pointer, modulo) => {
    let result = [];
    for (let i = pointer; i < pointer + number; i++) {
        result.push(list[(i % modulo + modulo) % modulo]);
    }
    for (const cup of result) {
        list.splice(list.indexOf(cup), 1);
    }
    return result;
}

for (let i = 0; i < 100; i++) {
    let currentCupIndex = cups.indexOf(currentCup);
    let extractedCups = retrieveNextCups(cups, 3, currentCupIndex + 1, modulo);
    currentCupIndex = cups.indexOf(currentCup);

    let targetValue = (cups[currentCupIndex] - 1) < 1 ? 9 : (cups[currentCupIndex] - 1);
    let destinationCup = cups.indexOf(targetValue);

    while (destinationCup < 0) {
        targetValue--;
        targetValue = (targetValue < 1) ? 9 : targetValue;
        destinationCup = cups.indexOf(targetValue);
    }

    cups.splice(destinationCup + 1, 0, ...extractedCups);
    currentCup = cups[(cups.indexOf(currentCup) + 1) % modulo];
}

const indexOfOne = cups.indexOf(1);
let endPointer = (indexOfOne + 1) % modulo;
const result = [];
while (endPointer != indexOfOne) {
    result.push(cups[endPointer]);
    endPointer = (endPointer + 1) % modulo;
}
console.log('Part One: ' + result.join(''));

// part two
// Prepare cups
const extendedCups = [...initialData].map(label => ({ label, next: null, previous: null }));
for (let i = 9; i < 1000000; i++) {
    extendedCups.push({ label: (i + 1), next: null, previous: null });
}
extendedCups.forEach((cup, index, list) => {
    const nextCup = list[(index + 1) < list.length ? (index + 1) : 0];
    const prevCup = list[(index - 1) >= 0  ? (index - 1) : (list.length - 1)];

    cup.next = nextCup;
    cup.previous = prevCup;
});
const extendedModulo = extendedCups.length;

const retrieveNextLinkedCups = (list, number, pointer, modulo) => {
    let result = [];
    for (let i = pointer; i < pointer + number; i++) {
        result.push(list[(i % modulo + modulo) % modulo]);
    }
    for (const cup of result) {
        list.splice(list.indexOf(cup), 1);
    }

    result[0].previous.next = result[number - 1].next;
    result[number - 1].next.previous = result[0].previous;
    result[number - 1].next = null;
    result[0].previous = null;

    return result;
}

const findCupByValue = (value) => {
    if (value < 1) {
        value = extendedModulo - value;
    }

    if (value <= initialInputMax) {
        return extendedCups.find(cup => cup.label === value);
    } else {
        return extendedCups[value - 1];
    }
}

currentCup = extendedCups[0];

for (let i = 0; i < 10000000; i++) {
    let currentCupIndex = extendedCups.findIndex(cup => cup.label === currentCup.label);
    let extractedCups = retrieveNextLinkedCups(extendedCups, 3, currentCupIndex + 1, extendedModulo);
    currentCupIndex = extendedCups.indexOf(currentCup);

    let targetValue = (extendedCups[currentCupIndex] - 1) < 1 ? 9 : (extendedCups[currentCupIndex] - 1);
    let destinationCup = extendedCups.indexOf(targetValue);

    while (destinationCup < 0) {
        targetValue--;
        targetValue = (targetValue < 1) ? 9 : targetValue;
        destinationCup = extendedCups.indexOf(targetValue);
    }

    extendedCups.splice(destinationCup + 1, 0, ...extractedCups);
    currentCup = extendedCups[(extendedCups.indexOf(currentCup) + 1) % extendedModulo];
}

const indexOfOneExtended = extendedCups.indexOf(1);
const nextTwoCups = retrieveNextCups(extendedCups, 2, indexOfOneExtended + 1, extendedModulo);
console.log(nextTwoCups);