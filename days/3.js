const temp0 = document.body.getElementsByTagName('pre')[0];
const data = temp0.textContent.split("\n").filter(value => value);

// part one with extension for part two
const slopeing = (data, offset, down) => {
    let position = 0;
    offset = offset || 3;

    const max = data[0].length;
    let trees = 0;
    
    data.map((line, index) => {
        if (down && index % down === 1) {
            return;
        }
        if (line.charAt(position % max) === '#') {
            trees++;
        }
        position += offset;
        return;
    });
    return trees;
}
let partOne = slopeing(data, 3, false);
console.log('Part One: ' + partOne);

// 
let partTwo = slopeing(data, 1, false) * partOne * slopeing(data, 5, false) * slopeing(data, 7, false) * slopeing(data, 1, 2);
console.log('Part Two: ' + partTwo);
