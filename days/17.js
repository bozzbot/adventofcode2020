const temp0 = document.body.getElementsByTagName('pre')[0];
const initialData = temp0.textContent.trim().split("\n").filter(value => value);

let map = new Map();
let map4d = new Map();

initialData.map((line, y) => {
    line.split('').map((value, x) => {
        // Initialise map with coordinates and values
        map.set(`${x},${y},0`, (value === '#'));
    })
});

initialData.map((line, y) => {
    line.split('').map((value, x) => {
        // Initialise map with coordinates and values
        map4d.set(`${x},${y},0,0`, (value === '#'));
    })
});

// part one
const findNeighbours = (x, y, z, map) => {
    const result = [];
    for (let i = (x - 1); i <= (x + 1); i++) {
        for (let j = (y - 1); j <= (y + 1); j++) {
            for (let k = (z - 1); k <= (z + 1); k++) {
                if(i != x || j != y || k != z ) {
                    const key = `${i},${j},${k}`;
                    if(map.has(key)) {
                        result.push(map.get(key));
                    } else {
                        result.push(false);
                    }
                }
            }
        }
    }
    return result;
}

const solveCube = (map) => {
    for (let i = 0; i < 6; i++) {

        let [minX, minY, minZ] = [null, null, null];
        let [maxX, maxY, maxZ] = [null, null, null];
        const keys = map.keys();
    
        // Define ranges
        for (const key of keys) {
            const [x,y,z] = key.split(',').map(x => parseInt(x));
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            minZ = Math.min(minZ, z);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
            maxZ = Math.max(maxZ, z);
        }
    
        const nextStep = new Map();
    
        for (let x = (minX - 1); x <= (maxX + 1); x++) {
            for (let y = (minY - 1); y <= (maxY + 1); y++) {
                for (let z = (minZ - 1); z <= (maxZ + 1); z++) {
                    const neighbours = findNeighbours(x, y, z, map);
                    const activeNeibours = neighbours.filter(value => !!value).length;
                    const key = `${x},${y},${z}`;
                    const isActive = map.has(key) ? map.get(key) : false;
                    if(isActive && activeNeibours !== 2 && activeNeibours !== 3) {
                        nextStep.set(key, false);
                    } else if(!isActive && activeNeibours === 3) {
                        nextStep.set(key, true);
                    } else {
                        nextStep.set(key, isActive);
                    }
                }
            }
        }
        map = nextStep;
    }

    return map;
}

const state = solveCube(map);
const partOne = [...state.values()].filter(value => !!value).reduce((accumulator, current) => (accumulator + current));

console.log('Part One: ' + partOne);

// part two
const findNeighbours4d = (x, y, z, w, map) => {
    const result = [];
    for (let i = (x - 1); i <= (x + 1); i++) {
        for (let j = (y - 1); j <= (y + 1); j++) {
            for (let k = (z - 1); k <= (z + 1); k++) {
                for (let l = (w - 1); l <= (w + 1); l++) {
                    if(i != x || j != y || k != z || l != w) {
                        const key = `${i},${j},${k},${l}`;
                        if(map.has(key)) {
                            result.push(map.get(key));
                        } else {
                            result.push(false);
                        }
                    }
                }
            }
        }
    }
    return result;
}

const solveCube4d = (map) => {
    for (let i = 0; i < 6; i++) {

        let [minX, minY, minZ, minW] = [null, null, null, null];
        let [maxX, maxY, maxZ, maxW] = [null, null, null, null];
        const keys = map.keys();
    
        // Define ranges
        for (const key of keys) {
            const [x,y,z,w] = key.split(',').map(x => parseInt(x));
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            minZ = Math.min(minZ, z);
            minW = Math.min(minW, w);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
            maxZ = Math.max(maxZ, z);
            maxW = Math.max(maxW, w);
        }
    
        const nextStep = new Map();
    
        for (let x = (minX - 1); x <= (maxX + 1); x++) {
            for (let y = (minY - 1); y <= (maxY + 1); y++) {
                for (let z = (minZ - 1); z <= (maxZ + 1); z++) {
                    for (let w = (minW - 1); w <= (maxW + 1); w++) {
                        const neighbours = findNeighbours4d(x, y, z, w, map);
                        const activeNeibours = neighbours.filter(value => !!value).length;
                        const key = `${x},${y},${z},${w}`;
                        const isActive = map.has(key) ? map.get(key) : false;
                        if(isActive && activeNeibours !== 2 && activeNeibours !== 3) {
                            nextStep.set(key, false);
                        } else if(!isActive && activeNeibours === 3) {
                            nextStep.set(key, true);
                        } else {
                            nextStep.set(key, isActive);
                        }
                    }
                }
            }
        }
        map = nextStep;
    }

    return map;
}

const state4d = solveCube4d(map4d);
const partTwo = [...state4d.values()].filter(value => !!value).reduce((accumulator, current) => (accumulator + current));

console.log('Part Two: ' + partTwo);
