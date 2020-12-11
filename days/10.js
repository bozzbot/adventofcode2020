const temp0 = document.body.getElementsByTagName('pre')[0];
const initialData = temp0.textContent.trim().split("\n").filter(value => value);

// part one
const data = ['0', ...initialData];

data.sort((a, b) => (a - b));
var differences = { 1: 0, 2: 0, 3: 1 };
for (let i = 1; i < data.length; i++) {
    let difference = parseInt(data[i]) - parseInt(data[i - 1]);
    differences[difference]++;
}

console.log('Part One: ' + (differences[1] * differences[3]));

// part two
// Second try without pseudo graph implementation that killed the browser tab.
// Thank to a tip, there is a way to calculate the possible connections by storing the sum of the previous three.
/**
 * 
 * (0) --- (1) --- (2) --- (3) --- (4) --- (7) --- (10) ...
 *             \       \
 *     `-- (2) --- (3) --- (4) --- (7) --- (10) ...
 *             \      
 *      `- (3) --- (4) --- (7) --- (10) ...
 * 
 * Count:
 *   (2) 2 Con, (3) 4 Con, (4) 7 Con, (7) 7 Con, (10) 7 Con
 * 
 * As an array:
 *  0  1  2  3  4  5   6   7  8   9   10 ...
 * [1, 1, 2, 4, 7, <>, <>, 7, <>, <>, 7, ...]
 */
let possibleCombinations = initialData.sort((a, b) => (a - b)).reduce((accumulator, current) => {
    let value = parseInt(current);
    accumulator[value] = (accumulator[value - 3] || 0) + (accumulator[value - 2] || 0) + (accumulator[value - 1] || 0);
    return accumulator;
}, [1]);

console.log('Part Two: ' + possibleCombinations.pop());