const temp0 = document.body.getElementsByTagName('pre')[0];
const lines = temp0.textContent.trim().split("\n").filter(value => value);

// part one
let switchedTiles = new Set();
let x, y;

const mapHexTo2D = {
    'e': { q: 1, r: 0 },
    'se': { q: 0, r: 1 },
    'sw': { q: -1, r: 1 },
    'w': { q: -1, r: 0 },
    'nw': { q: 0, r: -1 },
    'ne': { q: 1, r: -1 },
}

for (const line of lines) {
    x = 0;
    y = 0;

    const paths = [...line.matchAll(/e|se|sw|w|nw|ne/g)].map(element => element[0]);

    for (const path of paths) {
        x += mapHexTo2D[path].q;
        y += mapHexTo2D[path].r;
    }

    const key = `${x}_${y}`;
    if (switchedTiles.has(key)) {
        switchedTiles.delete(key);
    } else {
        switchedTiles.add(key);
    }
}

console.log('Part One: ' + switchedTiles.size);

// part two
getAdjacentTiles = (x, y) => {
    const neighbours = [];
    for (const hexDirection in mapHexTo2D) {
        neighbours.push({
            x: x + mapHexTo2D[hexDirection].q,
            y: y + mapHexTo2D[hexDirection].r
        });
    }

    return neighbours
};

let livingTiles = new Set(switchedTiles);
let currentLivingTiles;
for (let i = 1; i <= 100; i++) {
    currentLivingTiles = new Set();
    for (const tile of livingTiles.keys()) {
        const [x, y] = tile.split('_').map(value => parseInt(value));
        const adjecentTiles = [...getAdjacentTiles(x, y), { x, y }];

        for (const adjecentTile of adjecentTiles) {
            const key = `${adjecentTile.x}_${adjecentTile.y}`;
            const livingTilesCount = getAdjacentTiles(adjecentTile.x, adjecentTile.y).filter(element => (livingTiles.has(`${element.x}_${element.y}`))).length;

            if (livingTiles.has(key)) {
                if (livingTilesCount === 0 || livingTilesCount > 2) {
                    currentLivingTiles.delete(key);
                } else {
                    currentLivingTiles.add(key);
                }
            } else {
                if (livingTilesCount === 2) {
                    currentLivingTiles.add(key);
                }
            }
        }
    }

    livingTiles = currentLivingTiles;
}

console.log('Part Two: ' + livingTiles.size);