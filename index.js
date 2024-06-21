const getTokenColor = (token) => {
    switch (token) {
        case 'keyword':
            return 'var(--token-keyword)';
        case 'text':
            return 'var(--token-text)';
        case 'identifier':
            return 'var(--token-identifier)';
        case 'paren.lparen':
            return 'var(--token-paren)';
        case 'paren.rparen':
            return 'var(--token-paren)';
        case 'punctuation':
            return 'var(--token-text)';
        case 'support.function':
            return 'var(--token-type-2)';
        case 'keyword.operator':
            return 'var(--token-operator)';
        case 'constant.numeric':
            return 'var(--token-constant-1)';
        case 'constant.language':
            return 'var(--token-constant-2)';
        case 'string':
            return 'var(--token-string)';
        default:
            console.warn("Detected unsuporrted token", token)
            return 'red';
    }
};

const tokensToLines = (tokens) => {
    const lines = [];
    let line = [];
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        console.log(token);
        while (token.value.includes('\n')) {
            lines.push(line);
            line = [];
            const index = token.value.indexOf('\n');
            token.value = token.value.slice(index + 1);
        }
        line.push(token);
    }
    lines.push(line);
    return lines;
}

const injectLines = (lines) => {
    const code = document.querySelector('.code');
    for (let line of lines) {
        console.log("Line", line)
        const lineElement = document.createElement('span');
        lineElement.classList.add('line');
        for (let token of line) {
            const tokenElement = document.createElement('pre');
            tokenElement.textContent = token.value;
            tokenElement.style.color = getTokenColor(token.type);
            lineElement.appendChild(tokenElement);
        }
        if (line.length === 0) {
            const tokenElement = document.createElement('pre');
            tokenElement.textContent = '\n';
            lineElement.appendChild(tokenElement);
        }
        code.appendChild(lineElement);
    }
    renderLineNumbers(lines.length);
}

const renderLineNumbers = (lines) => {
    console.log(lines)
    const lineNumbers = document.querySelector('.linenumbers');
    lineNumbers.innerHTML = '';
    for (let i = 0; i < lines; i++) {
        const lineNumber = document.createElement('span');
        lineNumber.classList.add('codeline');
        lineNumber.textContent = i + 1;
        lineNumbers.appendChild(lineNumber);
    }
}
