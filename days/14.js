const temp0 = document.body.getElementsByTagName('pre')[0];
const initialData = temp0.textContent.trim().split("\n").filter(value => value);

// part one
let programOne = (data) => {
    let memory = [];
    let [andMask, orMask] = ['', ''];
    let memoryRegex = /mem\[([\d]+)\] = ([\d]+)$/g;

    for (const line of data) {
        let [command, value] = line.split(' = ');

        if (command === 'mask') {
            andMask = '0b' + value.replace(/X/g, '1');
            orMask = '0b' + value.replace(/X/g, '0');
            continue;
        }

        let [original, index, decimal] = [...line.matchAll(memoryRegex)].pop();
    
        memory[index] = BigInt(decimal);
        memory[index] |= BigInt(orMask);
        memory[index] &= BigInt(andMask);
    }

    return memory;
};

let partOne = programOne(initialData).reduce((accumulator, current) => (accumulator + current));
console.log('Part One: ' + partOne);

// part two
let programTwo = (data) => {
    let memory = new Map();
    let mask = '';
    let bitmasks = [];
    let memoryRegex = /mem\[([\d]+)\] = ([\d]+)$/g;
    let floatingBitRegex = /X/g;

    for (const line of data) {
        let[command, value] = line.split(' = ');
        if (command === 'mask') {
            let count = (value.match(floatingBitRegex) || []).length;
            bitmasks = [];
            // Create all variations of bitmasks
            for (let i = 0; i < 2 ** count; i++) {
                let bitmask = i.toString(2).padStart(count, '0');
                bitmasks.push(bitmask);
            }
            mask = value;
            continue;
        }

        let [original, index, decimal] = [...line.matchAll(memoryRegex)].pop();
        let binaryIndex = [...parseInt(index).toString(2).padStart(36, '0')];

        // Set the value to all addresses
        for (const bitmask of bitmasks) {
            let bitmaskPosition = 0;
            let address = mask.split('').map((char, i) => {
                if (char === 'X') {
                    return bitmask[bitmaskPosition++];
                }
                return parseInt(char) | parseInt(binaryIndex[i]);
            }).join('').padStart(36, '0');

            // console.log(binaryIndex);
            // console.log('mask');
            // console.log(mask);
            // console.log('address');
            // console.log(address);
            // console.log(BigInt('0b' + address));

            memory.set(BigInt('0b' + address), BigInt(decimal));
        }
    }

    return memory;
};

const sum = (memory) => {
    let result = 0n;
    memory.forEach((current) => {
        result += current;
    });
    return result;
}

const memory = programTwo(initialData);
// console.log(memory);
partTwo = sum(memory);
console.log('Part Two: ' + partTwo);