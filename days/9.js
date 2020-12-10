const temp0 = document.body.getElementsByTagName('pre')[0];
const initialData = temp0.textContent.trim().split("\n").filter(value => value);

// part one
// Use newly learned way after day 1
let findAdditionTarget = (range, target) => {
    let indexed = {};
    for (var i = 0; i < range.length; i++) {
        let number = range[i];
        indexed[number] = i;
    }
    for (var i = 0; i < range.length; i++) {
        let diff = target - range[i];
        if (indexed.hasOwnProperty(diff) && indexed[diff] !== i) {
            return [i, indexed[diff]];
        }
    }
};

let data = [...initialData];
let set = data.splice(0, 25);
let deviation = 0;

for(const number of data) {
    if(!findAdditionTarget([...set], parseInt(number))) {
        deviation = number;
        break;
    }
    set.shift();
    set.push(number);
}

console.log('Part One: ' + deviation);
deviation = parseInt(deviation);

// part two
let contiguousSet = [];
let addition = 0;
for (let contiguousSize = 2; contiguousSize <= 128; contiguousSize++) {
    let dataClone = [...initialData];
    contiguousSet = dataClone.splice(0, contiguousSize);
    for (const number of dataClone) {
        addition = contiguousSet.reduce((previous, current) => (parseInt(previous) + parseInt(current)));
        // No need to continue if one addend is greater then the deviation
        if (addition === deviation || contiguousSet[0] > deviation) {
            break;
        }
        contiguousSet.shift();
        contiguousSet.push(number);
    }
    if (addition === deviation) {
        break;
    }
}
contiguousSet.sort((a, b) => (a - b));
let partTwo = parseInt(contiguousSet[0]) + parseInt(contiguousSet[contiguousSet.length - 1]);

console.log('Found? ' + (addition === deviation));
console.log('Part Two: ' + partTwo);