import { useState, useEffect } from 'react';
import './calculator.css'
import { calculateVal } from './calculatorFunctions';
import Keypad from './Keypad'

function Calculator() {
    const [mainDisplayVal, setMainDisplayVal]: [string, Function] = useState('')
    const [intermediaryVal, setIntermediaryVal]: [string, Function] = useState('')
    const [operatorInFlight, setOperatorInFlight]: [string, Function] = useState('')
    const [secondaryDisplayVal, setSecondaryDisplayVal]: [string, Function] = useState('')
    const [justCalculated, setJustCalculated]: [boolean, Function] = useState(false)

    // just for fun
    const [toastNoticiationClass, setToastNotificationClass]: [string, Function] = useState('hidden')

    interface symbolType {
        [key: string]: string
      }  
    const operators = ['+', '-', '*', '/', 'C', '#', '**2', '**0.5', '=']
    const symbols: symbolType = {'**2':'²','**0.5': '²√'}

    const operatorHandler = (operator: string) => {

        // Special behaviour for non mathematical operators
        if (operator === 'C') {
            // reset everything
            setSecondaryDisplayVal('')
            setMainDisplayVal('')
            setIntermediaryVal('')
            setOperatorInFlight('')
            return
        }
        if (operator === '#') {
            if (mainDisplayVal.length > 1) {
                setMainDisplayVal(mainDisplayVal.slice(0, -1))
            } else {
                setMainDisplayVal('')
            }
            return
        }
        
        // sqr and sqrt operators
        if (['**2', '**0.5'].includes(operator)) {
            powerHandler(operator)
            return
        }

        // This section is for changing operators, if a user has an inflight operator
        // and wants to change it, the calculator shouldn't try to make a calculation
        if (operatorInFlight && mainDisplayVal === '' ) {
            setOperatorInFlight(operator)
            return
        }

        if (secondaryDisplayVal !== '' || operator == '=') {
            continuousCalculationHandler(operator)
            return
        }

        /// if it's an operator, we want to add it to the display, but then if we add another number and operator
        //we want to calculated it
        // when we calculate it,
        setOperatorInFlight(operator)
        setIntermediaryVal(mainDisplayVal)
        // we haven't done a calculation here but it is used to 'reset' the main display so it 
        // can be overwritten
        setJustCalculated(true)
    }

    //FIX
    const powerHandler = (operator: string) => {     
        if (['**2', '**0.5'].includes(operator)) {
            // if there is no intermediary value, send the result to secondary display
            if (secondaryDisplayVal === '' || justCalculated) {
                const val = calculateVal(mainDisplayVal, '', operator)
                // setIntermediaryVal(val)
                if (operator == '**2') {
                    setSecondaryDisplayVal(mainDisplayVal + symbols[operator]+ '=')
                } else if (operator === '**0.5') {
                    setSecondaryDisplayVal(symbols[operator] + mainDisplayVal + '=')
                }
                setMainDisplayVal(val)

            } else {
                // if there is already an intemediary value, do the regular calculation with
                // new squared value e.g intermediaryVal = 5, operatorInFlight = '+', mainDispalVal= 2
                // operator here is **2, the result will be 5 + 2**2 (9)
                const val = calculateVal(intermediaryVal, (mainDisplayVal+operator), operatorInFlight)
                if (operator == '**2') {
                    setSecondaryDisplayVal(intermediaryVal + operatorInFlight + mainDisplayVal + symbols[operator] + '=')

                } else if (operator === '**0.5') {
                    setSecondaryDisplayVal(intermediaryVal + operatorInFlight + symbols[operator] + mainDisplayVal +  '=')
                }
                setMainDisplayVal(val)
            }
            setJustCalculated(true)
            return
        }
    }

    const continuousCalculationHandler = (operator: string) => {
        // this means that we want to calculate something
            // check if it's equals or another operator
            let  val = calculateVal(intermediaryVal, mainDisplayVal, operatorInFlight)

            if (operator !== '=') {
                // this is if there was an equals in the previous operator, meaning it's a fresh calculation
                if (justCalculated) {
                    setOperatorInFlight(operator)
                    setIntermediaryVal(mainDisplayVal)
                    return 
                }
                setOperatorInFlight(operator)
                setIntermediaryVal(val)
                setMainDisplayVal(val)
            }
            else {
                // stops equals being calculated with no values
                if (!mainDisplayVal && !secondaryDisplayVal) {
                    return
                }
                if (secondaryDisplayVal.slice(-1) !== '=') {
                    setSecondaryDisplayVal(secondaryDisplayVal + mainDisplayVal + '=')
                    setMainDisplayVal(val)
                }
            }
            setJustCalculated(true)
            return
    }
 
    // whenever the operator being used or the new answer changes, change the secondary text
    useEffect(() => {
        setSecondaryDisplayVal((intermediaryVal)  + operatorInFlight)
    }, [operatorInFlight, intermediaryVal])


    // handles all clicks to keypad
    const buttonClickFn = (val: string) => {
        if (operators.includes(val)) {
            operatorHandler(val)
            return
        } else {
            if (mainDisplayVal.length >= 14 && !justCalculated) {
                return 
            }
            if (mainDisplayVal !== '' && !secondaryDisplayVal.includes('=') && !justCalculated) {
                // regular path, if the main value is not blank, append number, if the value has just been 
                // calculated, treat it as a blank number

                // prevents duplicate .'s
                const match = mainDisplayVal.match(/\./g)
                if (match && match.length > 0 && val === '.') {
                    return
                }
                setMainDisplayVal(mainDisplayVal + val)

            } else {
                if(secondaryDisplayVal.includes('=')) {
                    // fresh new calculation
                    setSecondaryDisplayVal('')
                }

                if (val == '.') {
                    setMainDisplayVal('0.')
                } else if (val == '0') {
                    // no leading 0's
                    return
                } else {
                    setMainDisplayVal(val)
                }

                setJustCalculated(false)
            }
        }
    }

    const handleCopy = (e: any) => {
        e.clipboardData.setData('text/plain', mainDisplayVal.toString())
        e.preventDefault()

        setToastNotificationClass('toastNotification toastFadeIn')
        setTimeout(() => {
            setToastNotificationClass('toastNotification toastFadeOut')
        }, 1200);
    }
    const handlePaste = (e: any) => {
        const pasteData = e.clipboardData.getData('Text')
        let ensureNumbers = /^\d+$/

        if (ensureNumbers.test(pasteData)) {
            setMainDisplayVal(e.clipboardData.getData('Text'))
        }
    }

    useEffect(() => {
        // attach the event listener
        document.addEventListener("copy", handleCopy)
        window.addEventListener("paste", handlePaste)

        // remove the event listener
        return () => {
        window.removeEventListener("paste", handlePaste)
        document.removeEventListener("copy", handleCopy)
        }
    }, [mainDisplayVal])
    
    const secondaryDisplayValClass = secondaryDisplayVal !== '' ? 'calcVal' : 'calcVal hidden';
    
    return (
        <div>
            <div className={toastNoticiationClass}>Copied!</div>
            <div className={secondaryDisplayValClass} data-testid='secondaryDisplayVal'>{secondaryDisplayVal || 0}</div>
            <div className='displayVal' data-testid='mainDisplayVal'>{mainDisplayVal || '0'}</div>
            <Keypad buttonFn={buttonClickFn}/>
        </div>
    )
}

export default Calculator;