const temp0 = document.body.getElementsByTagName('pre')[0];
const initialData = temp0.textContent.trim().split("\n").filter(value => value).map(value => parseInt(value));

const [publicKeyOne, publicKeyTwo] = initialData;

const subjectNumber = 7;
const divider = 20201227;

let value = 1;
let loopKeyOne = null;
let loopKeyTwo = null;

let counter = 1;
while (loopKeyOne === null && loopKeyTwo === null) {
    value = (value * subjectNumber) % divider;
    if (publicKeyOne === value) {
        loopKeyOne = counter;
    }
    if (publicKeyTwo === value) {
        loopKeyTwo = counter;
    }
    counter++;
}

const calculateEncryptionKey = (loopSize, subjectNumber) => {
    let value = 1;
    for (let i = 0; i < loopSize; i++) {
        value = (value * subjectNumber) % divider;
    }

    return value;
}

let encryptionKey = null;
if (loopKeyOne) {
    encryptionKey = calculateEncryptionKey(loopKeyOne, publicKeyTwo);
} else if (loopKeyTwo) {
    encryptionKey = calculateEncryptionKey(loopKeyTwo, publicKeyOne);
}

console.log('Part One: ' + encryptionKey);