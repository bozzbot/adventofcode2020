const temp0 = document.body.getElementsByTagName('pre')[0];
const initialData = temp0.textContent.trim().split("\n").filter(value => value);

// part one
let nextDeparture = initialData => {
    const time = parseInt(initialData[0]);
    const buses = initialData[1].split(',').filter(bus => bus !== 'x');

    let nextDepartureTime = 0;
    let nextDepartureBus = 0;

    for (let timeStep = time; nextDepartureTime === 0; timeStep++) {
        for (let bus of buses) {
            if (timeStep % bus === 0) {
                nextDepartureBus = bus;
                nextDepartureTime = timeStep;
                break;
            }
        }
    }
    return nextDepartureBus * (nextDepartureTime - time);
};

console.log('Part One: ' + nextDeparture(initialData));

// part two
// Chinese remainder, found this implementation: https://github.com/pnicorelli/nodejs-chinese-remainder
// Added BigInt handling for this case
function mul_inv(a, b){
    let b0 = b;
    let x0 = 0n;
    let x1 = 1n;
    let q, tmp;
    if(b == 1n){
        return 1n;
    }
    while(a > 1n){
        q = BigInt(a / b);
        tmp = a;
        a = b;
        b = tmp % b;
        tmp = x0;
        x0 = x1 - (q * x0);
        x1 = tmp;
    }
    if(x1 < 0n){
        x1 = x1 + b0;
    }
    return x1;
}

function chineseRemainder(a, n){
    let p = i = prod = 1n;
    let sm = 0n;
    for(let i = 0n; i < n.length; i++){
        prod = prod * n[i];
    }
    for(let i = 0n; i < n.length; i++){
        p = prod / n[i];
        sm = sm + (a[i] * mul_inv(p, n[i]) * p);
    }
    return sm % prod;
}

const absmod = (a, n) => {
    return ((a%n) + (10*n)) % n;
};

let modulos = [];
let remainders = [];

initialData[1].split(',').forEach((bus, index) => {
    if (bus === 'x') {
        return;
    }
    modulos.push(BigInt(bus));
    remainders.push(BigInt(absmod(bus - index, bus)));
});

let crt = chineseRemainder(remainders, modulos);
console.log('Part Two: ' + crt);