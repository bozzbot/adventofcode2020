const temp0 = document.body.getElementsByTagName('pre')[0];
const data = temp0.textContent.trim().split("\n").filter(value => value);
const searchedBag = 'shiny gold';

// part one
const findDependencies = (data, name) => {
    let list = [ name ];
    for (const line of data) {
        let [value, dependency] = line.split(' bags contain ');
        if (dependency.includes(name)) {
            list = [ ...list, ...findDependencies(data, value) ];
        }
    }
    return list;
};

const partOne = findDependencies(data, searchedBag).filter((value, index, self) => (self.indexOf(value) === index));
// We can ignore the starting 'shiny gold' one
console.log('Part One: ' + (partOne.length - 1));

// part two
const resolveDependencies = (unparsedData, name) => {
    // Start working with strings to prevent unnecessary loops
    let start = unparsedData.indexOf(`${name} bags contain `);
    let ruleSet = unparsedData.slice(start, unparsedData.indexOf(".\n", start));
    let matches = [...ruleSet.matchAll(/([\d]+) ([\w]+ [\w]+) bag[s]?[\,]?/g)];
    if (Array.isArray(matches) && matches.length) {
        let temp = matches.map(dependencies => {
            return dependencies[1] * resolveDependencies(unparsedData, dependencies[2])
        });
        return 1 + temp.reduce((previous, current) => (previous + current));
    }
    return 1;
};

const partTwo = resolveDependencies(temp0.textContent.trim(), searchedBag);
// We can ignore the starting 'shiny gold' one
console.log('Part Two: ' + (partTwo - 1));