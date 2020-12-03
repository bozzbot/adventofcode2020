const temp0 = document.body.getElementsByTagName('pre')[0];
const data = temp0.textContent.split("\n").filter(value => value).sort((a,b) => a-b);

// part one
let findAdditionTarget = (data, target) => {
    target = target || 2020;
    // Find good starting point
    let upperIndex = data.findIndex((value, index, list) => {
        return Math.abs(value - target/2) > Math.abs(list[index - 1] - target/2);
    });
    let lowerIndex = upperIndex - 1;
    let result = 0;

    while(result != target && lowerIndex !== 0 && upperIndex !== data.length) {
        if (lowerIndex === 0 && upperIndex < data.length) {
            upperIndex++;
        } else if (upperIndex === data.length && lowerIndex > 0) {
            lowerIndex--;
        } else {
            if (result < target) {
                upperIndex++;
            } else {
                lowerIndex--;
            }
        }
        result = parseInt(data[lowerIndex]) + parseInt(data[upperIndex]);
    }

    console.log([result, data[lowerIndex], data[upperIndex]]);
    return result === target ? data[lowerIndex] * data[upperIndex] : -1;
};
console.log('Part One: ' + findAdditionTarget(data));

// part two
let findTrippleAdditionTarget = (data, target) => {
    target = target || 2020;
    // Find good starting point
    let middleIndex = data.findIndex((value, index, list) => {
        return Math.abs(value - target/2) > Math.abs(list[index - 1] - target/2);
    });
    let upperIndex = middleIndex + 1;
    let lowerIndex = middleIndex - 1;
    let result = 0;

    while(result != target) {
        if (lowerIndex === 0 && upperIndex === data.length) {
            middleIndex--;
            if (middleIndex === 0) {
                break;
            }
            upperIndex = middleIndex + 1;
            lowerIndex = middleIndex - 1;
        } else if (lowerIndex === 0 && upperIndex < data.length) {
            upperIndex++;
        } else if (upperIndex === data.length && lowerIndex > 0) {
            lowerIndex--;
        } else {
            if (result < target) {
                upperIndex++;
            } else {
                lowerIndex--;
            }
        }
        result = parseInt(data[lowerIndex]) + parseInt(data[middleIndex]) + parseInt(data[upperIndex]);
    }

    console.log([result, data[lowerIndex], data[middleIndex], data[upperIndex]]);
    return result === target ? data[lowerIndex] * data[middleIndex] * data[upperIndex] : -1;
};
console.log('Part Two: ' + findTrippleAdditionTarget(data));