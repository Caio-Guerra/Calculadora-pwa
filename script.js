class Calculator {
    constructor(prevEl, currEl) {
        this.prevEl = prevEl;
        this.currEl = currEl;
        this.clear();
    }

    clear() {
        this.current = '';
        this.previous = '';
        this.operation = null;
        this.updateDisplay();
    }

    delete() {
        this.current = this.current.toString().slice(0, -1);
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.current.includes('.')) return;
        this.current += number.toString();
        this.updateDisplay();
    }

    chooseOperation(op) {
        if (this.current === '') return;
        if (this.previous !== '') this.compute();
        this.operation = op;
        this.previous = this.current;
        this.current = '';
        this.updateDisplay();
    }

    compute() {
        const prev = parseFloat(this.previous);
        const curr = parseFloat(this.current);
        if (isNaN(prev) || isNaN(curr)) return;

        switch (this.operation) {
            case '+': this.current = prev + curr; break;
            case '-': this.current = prev - curr; break;
            case '*': this.current = prev * curr; break;
            case '/': this.current = prev / curr; break;
        }
        this.operation = null;
        this.previous = '';
        this.updateDisplay();
    }

    updateDisplay() {
        this.currEl.innerText = this.current || '0';
        this.prevEl.innerText = this.operation ? `${this.previous} ${this.operation}` : '';
    }
}

// Inicialização
const prevEl = document.querySelector('#previous-operand');
const currEl = document.querySelector('#current-operand');
const calc = new Calculator(prevEl, currEl);

// Botões
document.querySelectorAll('[data-number]').forEach(btn =>
    btn.addEventListener('click', () => calc.appendNumber(btn.innerText))
);

document.querySelectorAll('[data-operation]').forEach(btn =>
    btn.addEventListener('click', () => calc.chooseOperation(btn.innerText))
);

document.querySelector('[data-equals]').addEventListener('click', () => calc.compute());
document.querySelector('[data-clear]').addEventListener('click', () => calc.clear());
document.querySelector('[data-delete]').addEventListener('click', () => calc.delete());

// Suporte ao teclado
document.addEventListener('keydown', e => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') calc.appendNumber(e.key);
    if (['+', '-', '*', '/'].includes(e.key)) calc.chooseOperation(e.key);
    if (e.key === 'Enter' || e.key === '=') calc.compute();
    if (e.key === 'Backspace') calc.delete();
    if (e.key === 'Escape') calc.clear();
});

//Registrar SW
 if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("service-worker.js")
                .then(() => console.log("Service Worker registrado com sucesso!"))
                .catch(err => console.log("Erro ao registrar Service Worker:", err));
        }
