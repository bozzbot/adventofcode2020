const temp0 = document.body.getElementsByTagName('pre')[0];

// part one
// Transform to binary
const data = temp0.textContent.replace(/[BR]/g, 1).replace(/[FL]/g, 0).split("\n").sort().filter(value => value);
const highest = data.pop();
// convert to decimal
const [row, column] = [highest.slice(0, 7), highest.slice(7)].map(value => parseInt(value, 2));
console.log('Part One: ' + (row * 8 + column));

// part two
// Find missing number in list
const partTwo = data.map((value, index, me) => ( parseInt(me[index + 1], 2) - parseInt(value, 2) > 1 && parseInt(value, 2) + 1 )).filter(Number).pop();
console.log('Part Two: ' + partTwo);


// Initial visual solution...
// let seats = [...new Array(128)].map(() => (['', '', '', '', '', '', '', '']));

// for(const pass of data) {
//     let [row, column] = [pass.slice(0, 7), pass.slice(7)].map(value => parseInt(value, 2));
//     seats[row][column] = '👤';
// }

// console.table(seats);