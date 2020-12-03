const temp0 = document.body.getElementsByTagName('pre')[0];
const data = temp0.textContent.split("\n").filter(value => value);

// part one
const partOne = data.filter(line => {
    let [rule, password] = line.split(': ');
    let [amount, char] = rule.split(' ');
    let cleaned = password.replace(new RegExp(`[^${char}]`, 'g'), '');
    let re = new RegExp(`^${char}\{${amount.replace('-', ',')}\}$`);
    return re.test(cleaned);
});
console.log('Part One: ' + partOne.length);

// part two
const partTwo = data.filter(line => {
    let [rule, password] = line.split(': ');
    let [amount, char] = rule.split(' ');
    let [first, second] = amount.split('-');

    if (password.charAt(first - 1) === char && password.charAt(second - 1) === char) {
        return false;
    } else if (password.charAt(first - 1) === char || password.charAt(second - 1) === char) {
        return true;
    }
    return false;
});
console.log('Part Two: ' + partTwo.length);