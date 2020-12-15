const temp0 = document.body.querySelectorAll('code.puzzle-input')[0];
const initialData = temp0.textContent.trim().split(",").filter(value => value).map(value => parseInt(value));

// part one
let recitation = (initialData, target) => {
    let spokenNumbers = [...initialData];
    let i = 0;

    for (i = spokenNumbers.length; i < target; i++) {
        let lastNumber = spokenNumbers[i - 1];
        let speakNumber = 0;
        if (spokenNumbers.slice(0, -1).includes(lastNumber)) {
            speakNumber = i - (parseInt(spokenNumbers.slice(0, -1).lastIndexOf(lastNumber)) + 1);
        }
        spokenNumbers.push(speakNumber);
    }

    return spokenNumbers.pop();
};

let partOne = recitation(initialData, 2020);
console.log('Part One: ' + partOne);

// partTwo
let improvedRecitation = (initialData, target) => {
    // Just use a proper data structure. Also we only need the last index.
    let map = new Map();
    let lastNumber = 0;

    for (let i = 0; i < target ; i++) {
        if(initialData[i] || initialData[i] === 0){
            lastNumber = initialData[i];
            map.set(lastNumber, i+1);
        } else if (!map.has(lastNumber)) {
            map.set(lastNumber, i);
            lastNumber = 0;
        } else{
            let lastIndex = map.get(lastNumber);
            map.set(lastNumber, i);
            lastNumber = i - lastIndex;
        }
    }

    return lastNumber;
};

let partTwo = improvedRecitation(initialData, 30000000);
console.log('Part Two: ' + partTwo);