class Calculator {
    constructor(prevoperandtext, currentoperandtext){
        this.prevoperandtext = prevoperandtext
        this.currentoperandtext = currentoperandtext
        this.clear()
    }

    clear(){
       this.currentoperand = ''
       this.prevoperand = ''
       this.operation = undefined
    }

    delete(){
          this.currentoperand = this.currentoperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number === '.' && this.currentoperand.includes('.')) return 
          this.currentoperand = this.currentoperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentoperand === '') return
        if(this.prevoperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.prevoperand = this.currentoperand
        this.currentoperand = ''
    }

    compute(){
         let computation
         const prev = parseFloat(this.prevoperand)
         const current = parseFloat(this.currentoperand)
         if(isNaN(prev) || isNaN(current)) return
         switch(this.operation){
            case '+' :
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
                default:
                    return
         }
         this.currentoperand = computation
         this.operation = undefined
         this.prevoperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }
        else{
            return integerDisplay
        }
    } 

    updateDisplay(){
        this.currentoperandtext.innerText = this.getDisplayNumber(this.currentoperand)
        if(this.operation != null){
            this.prevoperandtext.innerText = `${this.getDisplayNumber($this.prevoperand)} ${this.operation}`
        }  
         else{
            this.prevoperandtext.innerText = ''
         }
    }

}

const numberbtns = document.querySelectorAll('[data-number]')
const operationbtns = document.querySelectorAll('[data-operation]')
const equalsbtn = document.querySelector('[data-equal]')
const deletebtn = document.querySelector('[data-delete]')
const allclearbtn = document.querySelector('[data-allclear]')
const prevoperandtext = document.querySelector('[data-prev-operand]')
const currentoperandtext = document.querySelector('[data-current-operand]')

const calculator = new Calculator(prevoperandtext, currentoperandtext)


numberbtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


operationbtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


equalsbtn.addEventListener('click', button => { 
        calculator.compute()
        calculator.updateDisplay()
})

allclearbtn.addEventListener('click', button => { 
    calculator.clear()
    calculator.updateDisplay()
})

deletebtn.addEventListener('click', button => { 
    calculator.delete()
    calculator.updateDisplay()
})