import { useState } from 'react';
import './calculator.css'

function Calculator() {
    const [a, setA]: [string, Function] = useState('0')
    const [calcVal, setCalcVal]: [string, Function] = useState('0')
    const [operatorUsed, setOperatorUsed]: [boolean, Function] = useState(false)
    const [justCalulated, setJustCalculated]: [boolean, Function] = useState(false)

    const operators = ['+', '-', '*', '/', 'C', '#', '**2', '**0.5', '=']

    const customEval = (stringToEval: string) => {
        var factor = Math.pow(10, 12)
        return Math.round(eval(stringToEval) * factor) / factor
    }

    const calculateVal = (operator: string) => {
        const calculatedVal = customEval(calcVal + a)
        console.log('calculating')
        if (operator != '=') {
            setCalcVal(calculatedVal + operator)
        } else {
            console.log('im here', a, calcVal)
            setCalcVal(calcVal + a + '=')
            setOperatorUsed(false)
            console.log('set operator in claculatgeVal')
        }
        setA(calculatedVal)
        setJustCalculated(true)
    }

    const operatorFn = (operator: string) => {

        if (operator === '#') {
            if (a.length > 1) {
                setA(a.slice(0, -1))
            }
            return
        }
        if (['**2', '**0.5'].includes(operator)) {
            setCalcVal('sqr ' + a)
            setA(customEval(a + operator))
            setOperatorUsed(false)
            setJustCalculated(true)
            return
        }
        if (operator == 'C') {
            setOperatorUsed(false)
            console.log('set operator in clear')
            setA('0')
            setCalcVal('0')
            return
        }
        if (!operatorUsed) {
            setCalcVal(a + operator)
            setJustCalculated(true)
        } else {
            calculateVal(operator)
        } 
        if (operator != '=') {
        setOperatorUsed(true)

        }
        console.log('set operator in operateFn')
    }

    const buttonClickFn = (val: string) => {
        // if the calculator input is an operator
        if (operators.includes(val)) {
            operatorFn(val)
            return
        }
        else {
            if (a !== '0' && !justCalulated) {
                if (a.slice(-1) == '.' && val == '.') {
                    return
                }
                setA(a + val)
            } else {
                if(calcVal.includes('=')) {
                    setCalcVal('')
                }
                if (val == '.') {
                    setA('0.')
                } else {
                    setA(val)
                    setJustCalculated(false)
                }
            }
        }
    }

    let calcRender = (calcVal: string) => {
        {if (calcVal != '0') {
            console.log('returning')
            return (
                
                <div className='calcVal'>{calcVal}</div>

            )
        }
         else {
            return (
                <div className='calcVal hidden'>{calcVal}</div>
            )
         }
    }

    }

    return (
        <div>
            
            {calcRender(calcVal)}
            <div className='displayVal'>{a}</div>
            <div>
                <button className='button' onClick={() => buttonClickFn("**2")}>𝑥²</button>
                <button className='button' onClick={() => buttonClickFn("**0.5")}>²√𝑥</button>
                <button className='button' onClick={() => buttonClickFn("C")}>C</button>
                <button className='button delete' onClick={() => buttonClickFn("#")}>{'␡'}</button>
            </div>
            <div>
                <button className='button' onClick={() => buttonClickFn("7")}>7</button>
                <button className='button' onClick={() => buttonClickFn("8")}>8</button>
                <button className='button' onClick={() => buttonClickFn("9")}>9</button>
                <button className='button' onClick={() => buttonClickFn("/")}>{'÷'}</button>
            </div>
            <div>
                <button className='button' onClick={() => buttonClickFn("4")}>4</button>
                <button className='button' onClick={() => buttonClickFn("5")}>5</button>
                <button className='button' onClick={() => buttonClickFn("6")}>6</button>
                <button className='button' onClick={() => buttonClickFn("*")}>x</button>
            </div>
            <div>
                <button className='button' onClick={() => buttonClickFn("1")}>1</button>
                <button className='button' onClick={() => buttonClickFn("2")}>2</button>
                <button className='button' onClick={() => buttonClickFn("3")}>3</button>
                <button className='button' onClick={() => buttonClickFn("-")}>-</button>
            </div>
            <div>
                <button className='button' onClick={() => buttonClickFn(".")}>.</button>
                <button className='button' onClick={() => buttonClickFn("0")}>0</button>
                <button className='button' onClick={() => buttonClickFn("+")}>+</button>
                <button className='button equals' onClick={() => buttonClickFn("=")}>=</button>
            </div>
        </div>
    )
}

export default Calculator;