class Calculator {
    constructor (previousInput, currentInput) {
        this.previousInput = previousInput;
        this.currentInput = currentInput;
        this.readyToReset = false;
        this.clear();
    }

    clear () {
        negativeBtn.disabled = false;
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.readyToReset = false;
    }

    delete () {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    addNumber (number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return false;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation (operation) {
        if (this.currentOperand === '') {
            return false;
        }
        if (this.currentOperand !== '') {
            this.result ()
        }
        negativeBtn.disabled = false;
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    result () {
        let res;

        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) {
            return false;
        }

        switch (this.operation) {
            case '+':
                res = prev + current;
                break;
            case '-':
                res = prev - current;
                break;
            case '*':
                res = prev * current;
                break;
            case '÷':
                res = prev / current;
                break;
            case 'pow':
                res = Math.pow(prev, current);
                break;
            default:
                return false;
        }
        this.readyToReset = true;
        this.currentOperand = +res.toFixed(15);
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateNewNumber () {
        this.currentInput.innerHTML = this.currentOperand;
        if (this.operation != null) {
            this.previousInput.innerHTML = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousInput.innerHTML = '';
        }

        if (this.currentOperand == 'error') {
            this.currentInput.innerHTML = 'Error: нажмите AC'
        }
    }

    sqrtOperation () {
        let res = Math.sqrt(parseFloat(this.currentOperand)) || Math.sqrt(parseFloat(this.previousOperand));

        if (parseFloat(this.currentOperand) < 0) {
            res = 'error';
        }

        this.currentOperand = res;
        this.operation = undefined;
        this.previousOperand = res;
    }

    clearSqrt () {
        negativeBtn.disabled = false;

        if(this.currentOperand !== 3) {
            this.currentOperand = '';
        }
    }

    negativeOperation (negative) {
        let neg;
        if (this.currentOperand === '') {
            return false;
        }
        if ('±') {
            neg = this.currentInput.innerHTML = `-${this.currentOperand}`;
        }
        negativeBtn.disabled = true;
        this.currentOperand = neg;
    }
}

const numberBtn = document.querySelectorAll('.number');
const operationBtn = document.querySelectorAll('.operation');
const deleteBtn = document.querySelector('.delete');
const clearBtn = document.querySelector('.clear');
const negativeBtn = document.querySelector('.negative');
const sqrtBtn = document.querySelector('.sqrt');
const equalsBtn = document.querySelector('.equals');
const previousInput = document.querySelector('.previous-operand');
const currentInput = document.querySelector('.current-operand');

const calculator = new Calculator (previousInput, currentInput)

numberBtn.forEach(button => {
    button.addEventListener ('click', () => {
        if(calculator.previousOperand === "" && calculator.currentOperand !== "" && calculator.readyToReset) {
          calculator.currentOperand = "";
          calculator.readyToReset = false;
        }
        calculator.addNumber(button.innerHTML)
        calculator.updateNewNumber()
    })
});

operationBtn.forEach(button => {
    button.addEventListener ('click', () => {
        calculator.chooseOperation(button.innerHTML)
        calculator.updateNewNumber()
    })
});

equalsBtn.addEventListener('click', button => {
    calculator.result();
    calculator.updateNewNumber();
    negativeBtn.disabled = false;
});

clearBtn.addEventListener('click', button => {
    calculator.clear();
    calculator.updateNewNumber();
});

deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateNewNumber();
});

sqrtBtn.addEventListener('click', button => {
    calculator.sqrtOperation ();
    calculator.updateNewNumber();
    calculator.clearSqrt ();
});

negativeBtn.addEventListener('click', button => {
    calculator.negativeOperation ();
});
