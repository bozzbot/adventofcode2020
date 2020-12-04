const temp0 = document.body.getElementsByTagName('pre')[0];
const data = temp0.textContent.split("\n\n").filter(value => value);

const fields = ['byr:', 'iyr:', 'eyr:', 'hgt:', 'hcl:', 'ecl:', 'pid:'];

// part one
const containsAll = (str, items) => {
    let found = true;
    for(let item of items) {
        if(!str.includes(item)) {
            found = false;
            break;
        }
    }
    return found;
};


let result = data.filter(passport => {
    return containsAll(passport, fields);
});

console.log('Part One: ' + result.length);

const vaildHeight = (str) => {
    if(str.includes('cm')) {
        let height = parseInt(str.replace('cm'));
        return height >= 150 && height <= 193;
    } 
    if(str.includes('in')) {
        let height = parseInt(str.replace('in'));
        return height >= 59 && height <= 76;
    }
    return false;
};

const validAll = (str, items) => {
    let valid = true;
    for(let item of items) {
        let dirty = str.split(item)[1];
        let value = dirty.replace(/[\s]+(.*)/g, '');

        switch (item) {
            case 'byr:':
                valid = value >= 1920 && value <= 2002;
                break;

            case 'iyr:':
                valid = value >= 2010 && value <= 2020;
                break;

            case 'eyr:':
                valid = value >= 2020 && value <= 2030;
                break;

            case 'hgt:':
                valid = vaildHeight(value);
                break;

            case 'hcl:':
                valid = /^\#[0-9a-f]{6}$/.test(value);
                break;
            
            case 'ecl:':
                valid = /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(value);
                break;
            
            case 'pid:':
                valid = /^[0-9]{9}$/.test(value);
                break;
        }
        if(!valid) {
            break;
        }
    }
    return valid;
};

let result2 = result.filter(passport => {
    return validAll(passport, fields);
});

console.log('Part Two: ' + result2.length);