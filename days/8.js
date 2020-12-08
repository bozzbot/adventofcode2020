const temp0 = document.body.getElementsByTagName('pre')[0];
const data = temp0.textContent.trim().split("\n").filter(value => value);

// part one
let pointer = 0;
let processed = [];
let accumulator = 0;

// Keep track of the processed lines and stop loop if already in
while (!processed.includes(pointer)) {
    processed.push(pointer);
    let [command, parameter] = data[pointer].split(" ");

    switch(command) {
        case 'acc':
            accumulator += parseInt(parameter);
            pointer += 1;
            break;
        case 'jmp':
            pointer += parseInt(parameter);
            break;
        case 'nop':
            pointer += 1;
        default:
            break;
    }
}

console.log('Part One: ' + accumulator);

// part two
// Reuse found deadend
possibleCulprits = processed.filter(line => (/^(jmp|nop).*/.test(data[line])));
let accumulator2 = 0;

for (const possibleCulprit of possibleCulprits) {
    // Make a copy of the initial data
    data2 = [...data];
    let [command, parameter] = data2[possibleCulprit].split(" ");
    // Change one line
    data2[possibleCulprit] = (command === 'nop' ? 'jmp' : 'nop') + ' ' + parameter;

    // Reinit
    accumulator2 = 0;
    let pointer2 = 0;
    let processed2 = [];

    // Process until loop was found or end is reached
    while (!processed2.includes(pointer2) && data2[pointer2]) {
        let [command, parameter] = data2[pointer2].split(" ");
        processed2.push(pointer2);
    
        switch(command) {
            case 'acc':
                accumulator2 += parseInt(parameter);
                pointer2 += 1;
                break;
            case 'jmp':
                pointer2 += parseInt(parameter);
                break;
            case 'nop':
                pointer2 += 1;
            default:
                break;
        }
    }
    // End was reached
    if(data2[pointer2] === undefined) {
        break;
    }
}

console.log('Part Two: ' + accumulator2);
