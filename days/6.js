const temp0 = document.body.getElementsByTagName('pre')[0];
const data = temp0.textContent.trim().split("\n\n").filter(value => value);

// part one
const removeDuplicateCharacters = (text) => {
    return text.split('').filter((item, pos, self) => {
        return self.indexOf(item) === pos;
    }).join('');
};

let partOne = data.map(group => {
    return removeDuplicateCharacters(group.replace(/[\s]/g, '')).length;
}).reduce((initial, current) => (initial + current));

console.log('Part One: ' + partOne);

// part two
const presentInAllAnswers = (text) => {
    console.log('*** text');
    console.log(text);
    // Minus 1 as the first occurence will not be kept
    let threshold = text.split("\n").length - 1;
    console.log('threshold: ' + threshold);
    let occurences = text.replace(/[\s]/g, '').split('').filter((item, pos, self) => {
        return self.indexOf(item) !== pos;
    }).reduce((initial, current) => {
        typeof initial[current] == 'undefined' ? initial[current] = 1 : initial[current] += 1;

        return initial;
    }, {});
    console.log(occurences);
    return Object.keys(occurences).filter((key) => (occurences[key] >= threshold));
};

let partTwo = data.map(group => {
    return /[\s]+/g.test(group.trim()) ? presentInAllAnswers(group).length : removeDuplicateCharacters(group.replace(/[\s]/g, '')).length;
}).reduce((initial, current) => (initial + current));

console.log('Part Two: ' + partTwo);