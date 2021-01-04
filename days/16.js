const temp0 = document.body.getElementsByTagName('pre')[0];
const [constraints, myTicketData, otherTicketData] = temp0.textContent.trim().split("\n\n").filter(value => value);

// part one
const inRange = (number, start, end) => {
    return number >= Math.min(start, end) && number <= Math.max(start, end);
}

const ruleRegex = /([\d]+\-[\d]+)/gm;
const rules = constraints.match(ruleRegex);

let otherTickets = otherTicketData.split("\n").splice(1);

let invalidTicketValues = [];
let validTickets = otherTickets.filter(ticket => {
    let tickteValues = ticket.split(',').map(value => {
        let valid = false;
        for (const rule of rules) {
            let [start, end] = rule.split('-');
            if (inRange(parseInt(value), parseInt(start), parseInt(end))) {
                valid = true;
                break;
            }
        }

        if (!valid) {
            invalidTicketValues.push(value);
        }

        return valid;
    });

    return tickteValues.every(value => !!value);
});

const partOne = invalidTicketValues.reduce((accumulator, current) => (accumulator + parseInt(current)), 0);
console.log('Part One: ' + partOne);

// part two
const validTicketTokens = [...validTickets].map(ticket => ticket.split(',').map(value => parseInt(value)));
const departueRuleRegex = /^departure[^:]+: (?<set1>[\d]+\-[\d]+) or (?<set2>[\d]+\-[\d]+)/gm;
const departureRuleMatches = [...constraints.matchAll(departueRuleRegex)];

// create rule list
let departueRules = departureRuleMatches.map(ruleMatch => {
    const rule = {};
    const [start1, end1] = ruleMatch[1].split('-');
    const [start2, end2] = ruleMatch[2].split('-');

    rule['name'] = ruleMatch[0].split(':').shift();
    rule['range'] = ruleMatch[1] + ' || ' + ruleMatch[2];
    rule['check'] = (number) => (inRange(number, parseInt(start1), parseInt(end1)) || inRange(number, parseInt(start2), parseInt(end2)));
    return rule;
})

const columns = validTickets[0].split(',').length;
let columnRuleMap = new Map();

for (let col = 0; col < columns; col++) {
    let departureRulesClone = [...departueRules];
    for (const ticketTokens of validTicketTokens) {
        let deleteFlags = [];
        let i = 0;
        for(const rule of departureRulesClone) {
            // console.log('Check if value ' + ticketTokens[col] + ' is in range: ');
            // console.log(rule.range);
            // console.log(rule.check(ticketTokens[col]));
            if (!rule.check(ticketTokens[col])) {
                deleteFlags.push(i);
            }
            i++;
        }
        for (const deleteIndex of deleteFlags) {
            departureRulesClone.splice(deleteIndex, 1);
        }
        if (departureRulesClone.length === 0) {
            break;
        }
    }

    console.log('*** col Done ' + col);
    if (departureRulesClone.length === 1) {
        console.log('Rule for column found!');
        console.log(departureRulesClone);
        console.log(col);

        let ruleName = departureRulesClone[0].name;
        columnRuleMap.set(col, ruleName);
        departueRules = departueRules.filter(rule => rule.name !== ruleName);
    } else if (departureRulesClone.length > 1) {
        console.log('Mulitple Rules Matching all values');
        console.log(departureRulesClone);
    } 

    if (departueRules.length === columnRuleMap.size) {
        console.log('departueRules.length === columnRuleMap.size');
        break;
    }
}

console.log(columnRuleMap);