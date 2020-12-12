const temp0 = "L.LL.LL.LL\n\
LLLLLLL.LL\n\
L.L.L..L..\n\
LLLL.LL.LL\n\
L.LL.LL.LL\n\
L.LLLLL.LL\n\
..L.L.....\n\
LLLLLLLLLL\n\
L.LLLLLL.L\n\
L.LLLLL.LL";

const initialData = temp0.trim().split("\n").map(line => (line.split(''))).filter(value => value);


// const temp0 = document.body.getElementsByTagName('pre')[0];
// const initialData = temp0.textContent.trim().split("\n").map(line => (line.split(''))).filter(value => value);

// part one
// Cartesian procedural neighbors finder, see https://github.com/gbirke/game-of-life-functional-grid/blob/master/src/find_neighbors_cartesian_procedural.js
const findNeighbors = (grid, row, col) => {
    const maxRow = grid.length;
    const maxCol = grid[0].length;
    let cells = [];

    for (let rowModifier = -1; rowModifier <= 1; rowModifier++) {
        const rowIndex = row + rowModifier;
        if (rowIndex < 0 || rowIndex >= maxRow) {
            continue;
        }
        for (let colModifier = -1; colModifier <= 1; colModifier++) {
            const colIndex = col + colModifier;
            if (colIndex < 0 || colIndex >= maxCol || (colIndex === col && rowIndex === row)) {
                continue;
            }
            cells.push(grid[rowIndex][colIndex]);
        }
    }

    return cells;
};

const determineOccupied = (data) => {
    let oldGrid = "0";
    let newGrid = "1";
    while (oldGrid != newGrid) {
        let newState = [...new Array(data.length)].map(() => ([...new Array(data[0].length)]));
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].length; j++) {
                if (data[i][j] !== '.') {
                    // let neighbours = data.slice(Math.max((i - 1), 0), Math.min((i + 1, data.length))).map(line => line.slice(Math.max((j - 1), 0), Math.min((j + 1, line.length))));
                    let neighbours = findNeighbors(data, i, j);
                    let size = neighbours.length;
                    let neighboursText = neighbours.join();
                    let emptyMatch = neighboursText.match(/[L|\.]/g);
                    let occupiedMatch = neighboursText.match(/[\#]/g);
                    
                    if (emptyMatch && emptyMatch.length === size) {
                        newState[i][j] = '#';
                    } else if (occupiedMatch && occupiedMatch.length >= 4) {
                        newState[i][j] = 'L';
                    } else {
                        newState[i][j] = data[i][j];
                    }
                } else {
                    newState[i][j] = data[i][j];
                }
            }
        }

        oldGrid = data.join("\n");
        newGrid = newState.join("\n");
        
        data = newState;
    }

    return data;
}

let occupiedGrid = determineOccupied([...initialData]);
let seatsTaken = occupiedGrid.join().match(/#/g).length;
console.log('Part One: ' + seatsTaken);

