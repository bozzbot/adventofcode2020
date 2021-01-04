const temp0 = document.body.getElementsByTagName('pre')[0];
const rawTiles = temp0.textContent.trim().split("\n\n").filter(value => value);


// const fs = require('fs');
// const rawTiles = fs.readFileSync('day20.txt', {encoding: 'utf-8'}).split('\n\n').filter(x => x);

// part one
const tiles = rawTiles.map(tile => {
    const lines = tile.split("\n");
    const id = lines[0].split('Tile ').pop().slice(0, -1);
    lines.shift();
    const left = lines.map(line => line[0]).join('');
    const right = lines.map(line => line[line.length - 1]).join('');
    // tiles can be rotated so we also need the reverse edges
    let edges = [lines[0], lines[lines.length - 1], left, right];
    edges = [...edges, ...edges.map(line => line.split('').reverse().join(''))];


    return {
        id,
        edges,
        lines,
        connections: []
    };
});

const findMatchingEdge = (tile1, tile2) => {
    for (const egde1 of tile1.edges) {
        for (const edge2 of tile2.edges) {
            if (egde1 === edge2) {
                return egde1;
            }
        }        
    }
    return null;
};

for (let i = 0; i < tiles.length; i++) {
    for (let j = (i + 1); j < tiles.length; j++) {
        let edge = findMatchingEdge(tiles[i], tiles[j]);
        if (edge) {
            tiles[i].connections.push({
                id: tiles[j].id,
                edge
            });
            tiles[j].connections.push({
                id: tiles[i].id,
                edge
            })
        }
    }
}

const cornerIds = tiles.filter(tile => tile.connections.length == 2).map(tile => tile.id);
const partOne = cornerIds.reduce((accumulator, current) => (accumulator * current));
console.log('Part One: ' + partOne);

// part two
// well, fuck