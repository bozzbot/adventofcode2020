const temp0 = document.body.getElementsByTagName('pre')[0];
const tokenList = temp0.textContent.trim().replace(/\(/gm, '( ').replace(/\)/gm, ' )')
    .split("\n").filter(value => value).map(line => [...line.split(' ')]);

const expressionList = tokenList.map(tokens => {
    let index = 0;

    function parseExpressions() {
        const subset = [];
    
        while (index < tokens.length) {
            const token = tokens[index];
            index++;

            switch (token) {
                case '+':
                case '*':{
                    subset.push(token);
                    break;
                }
                case '(': {
                    // Add new subset to set
                    subset.push(parseExpressions());
                    break;
                }
                case ')': {
                    return subset;
                }
                // Numbers
                default: {
                    subset.push(parseInt(token));
                    break;
                }
            }
        }
    
        return subset;
    };

    return parseExpressions();
});

// part one
const evaluate = (expressions) => {
    let left = null;
    let operation = null;

    for (const expression of expressions) {
        switch (typeof expression) {
            case 'string':
                operation = expression;
                break;
            
            case 'number': 
                left = left === null ? expression : eval(`${left} ${operation} ${expression}`);
                break;
            
            case 'object':
                let subExpression = evaluate(expression);
                left = left === null ? subExpression : eval(`${left} ${operation} ${subExpression}`);
                break;

            default:
                console.error('Something went wrong evaluating ' + expression);
                break;
        }
    }

    return left;
}

const partOne = expressionList.reduce((accumulator, expressions) => (accumulator + evaluate(expressions)), 0);
console.log('Part One: ' + partOne);

// part two

const applyValue = (token) => {
    switch (typeof token) {
        case 'number': 
            return token;
        case 'object':
            return evaluatePrecedence(token);
        default:
            console.error('Something went wrong applying value ' + expression);
            break;
    }
}

const evaluatePrecedence = (expressions) => {
    let allowMultiplication = false;

    while (expressions.length > 1) {
        let checkedAddition = false;

        for (let i = 1; i < (expressions.length - 1); i++) {
            const token = expressions[i];

            if (allowMultiplication) {
                if (token === '*') {
                    expressions.splice(i - 1, 3, applyValue(expressions[i - 1]) * applyValue(expressions[i + 1]));
                    // Re-evaluate newly added result
                    i--;
                }
            } else {
                if (token === '+') {
                    expressions.splice(i - 1, 3, applyValue(expressions[i - 1]) + applyValue(expressions[i + 1]));
                    // Re-evaluate newly added result
                    i--;
                    checkedAddition = true;
                }
            }
        }

        if (!checkedAddition) {
            allowMultiplication = true;
        }
    }

    return applyValue(expressions[0]);
}

const partTwo = expressionList.reduce((accumulator, expressions) => (accumulator + evaluatePrecedence(expressions)), 0);
console.log('Part Two: ' + partTwo);