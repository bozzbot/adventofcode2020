const temp0 = document.body.getElementsByTagName('pre')[0];
const [ruleData, messageData] = temp0.textContent.trim().split("\n\n").filter(value => value);

const messages = messageData.split("\n");
const rules = ruleData.split("\n").map(rule => rule.split(': '))
    .sort((a, b) => (parseInt(a[0]) - parseInt(b[0]))).map(rule => rule[1]);

let ruleCache = new Map();

// part one
const generateRegex = (index) => {
  if(ruleCache.has(index)) {
      return ruleCache.get(index);
  }

  if(rules[index].match(/"[\w]"/)) {
    ruleCache.set(index, rules[index].slice(1,-1));
    return rules[index].slice(1,-1);
  }

  const rule = rules[index].split(' | ');
//   const expression = `(${rule.map(index => `(${index.split(' ').map(idx => generateRegex(idx)).join('')})`).join('|')})`;
  const expression = `(?:${rule.map(idx => `${idx.split(' ').map(jdx => generateRegex(jdx)).join('')}`).join('|')})`;

  ruleCache.set(index, expression);

  return expression;
}

const monsterRegex = new RegExp(`^${generateRegex(0)}$`);
const partOne = messages.filter(index => index.match(monsterRegex)).length;
console.log('Part One: ' + partOne);

// part two
ruleCache = new Map();
const rule42 = generateRegex(42);
const rule31 = generateRegex(31);

ruleCache.set('8', `(?:${rule42}+)`);
let simplify = '';
for(let index = 1; index <= rules.length; index++) {
    simplify += `(?:${rule42}{${index}}${rule31}{${index}})|`
}
ruleCache.set('11', `(${simplify.slice(0, -1)})`);

const loopingRegex = new RegExp(`^${generateRegex(0)}$`);

const partTwo = messages.filter(index => index.match(loopingRegex)).length;
console.log('Part Two: ' + partTwo);
