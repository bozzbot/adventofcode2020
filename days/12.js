const temp0 = document.body.getElementsByTagName('pre')[0];
const initialData = temp0.textContent.trim().split("\n").filter(value => value);

// part one
const partOne = (data) => {
    let direction = 0;
    const directionMap = { 0: 'E', 90: 'S', 180: 'W', 270: 'N' }; 
    const position = { x: 0, y: 0 };

    for (const instruction of data) {
        let [original, action, value] = [...instruction.matchAll(/([\w]{1})([\d]+)/g)].pop();
        value = parseInt(value);

        if (action === 'F') {
            action = directionMap[Math.abs(direction)];
        }

        switch (action) {
            case 'N':
                position.y += value;
                break;
        
            case 'S':
                position.y -= value;
                break;

            case 'E':
                position.x += value;
                break;

            case 'W':
                position.x -= value;
                break;

            case 'R':
                direction = (direction + value) % 360;
                break;

            case 'L':
                direction = (direction + (360 - value)) % 360;
                break;
        }
    }

    return (Math.abs(position.y) + Math.abs(position.x));
};

// console.log(position);
console.log('Part One: ' + partOne(initialData));

// part two
const partTwo = (data) => {
    const position = { x: 0, y: 0, wx: 10, wy: 1 };
    let [wx, wy] = [0, 0];

    const calculateRotation = (value) => {
        let angle = value * Math.PI / 180;
        let wx = (position.wx * Math.cos(angle)) - (position.wy * Math.sin(angle));
        let wy = (position.wx * Math.sin(angle)) + (position.wy * Math.cos(angle));

        return [wx, wy];
    }

    for (const instruction of data) {
        let [original, action, value] = [...instruction.matchAll(/([\w]{1})([\d]+)/g)].pop();
        value = parseInt(value);

        switch (action) {
            case 'N':
                position.wy += value;
                break;
        
            case 'S':
                position.wy -= value;
                break;

            case 'E':
                position.wx += value;
                break;

            case 'W':
                position.wx -= value;
                break;

            case 'R':
                // Use negative value
                [wx, wy] = calculateRotation(-value);
                position.wx = Math.round(wx);
                position.wy = Math.round(wy);
                break;

            case 'L':
                [wx, wy] = calculateRotation(value);
                position.wx = Math.round(wx);
                position.wy = Math.round(wy);
                break;

            case 'F':
                position.x += value * position.wx;
                position.y += value * position.wy;
                break;
        }
    }

    return (Math.abs(position.y) + Math.abs(position.x));
};
// console.log(position);
console.log('Part Two: ' + partTwo(initialData));