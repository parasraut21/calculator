import { useEffect, useCallback } from 'react';
import './calculator.css'

function Keypad(props: any) {
    let buttonClickFn = props.buttonFn

    const keysToHandle = ['1', '2', '3', '4', '5', '6', '7', '8', 
    '9', '0', '+', '-', 'Escape', '*', '/', '.', 'Enter', 'Backspace']

    const handleKeyPress = useCallback((event: any) => {
        if (keysToHandle.includes(event.key)) {
            const button = document.getElementById(event.key);
            if (button) {
            button.click();
            } 
        }
    }, []);

    useEffect(() => {
        // attach the event listener
        window.addEventListener('keydown', handleKeyPress)

        // remove the event listener
        return () => {
        window.removeEventListener('keydown', handleKeyPress)
        }
    }, [])

    return (
        <div>
            <div>
                <button className='button' onClick={() => buttonClickFn("**2")}>𝑥²</button>
                <button className='button sqrt' onClick={() => buttonClickFn("**0.5")}>²√𝑥</button>
                <button id='Escape' className='button' onClick={() => buttonClickFn("C")}>C</button>
                <button id='Backspace' className='button delete' onClick={() => buttonClickFn("#")}>{'␡'}</button>
            </div>
            <div>
                <button id='7' className='button' onClick={() => buttonClickFn("7")}>7</button>
                <button id='8' className='button' onClick={() => buttonClickFn("8")}>8</button>
                <button id='9' className='button' onClick={() => buttonClickFn("9")}>9</button>
                <button id='/' className='button' onClick={() => buttonClickFn("/")}>{'÷'}</button>
            </div>
            <div>
                <button id='4' className='button' onClick={() => buttonClickFn("4")}>4</button>
                <button id='5' className='button' onClick={() => buttonClickFn("5")}>5</button>
                <button id='6' className='button' onClick={() => buttonClickFn("6")}>6</button>
                <button id='*' className='button' onClick={() => buttonClickFn("*")}>x</button>
            </div>
            <div>
                <button id='1' className='button' onClick={() => buttonClickFn("1")}>1</button>
                <button id='2' className='button' onClick={() => buttonClickFn("2")}>2</button>
                <button id='3' className='button' onClick={() => buttonClickFn("3")}>3</button>
                <button id='-' className='button' onClick={() => buttonClickFn("-")}>-</button>
            </div>
            <div>
                <button id='.' className='button button-bottom' onClick={() => buttonClickFn(".")}>.</button>
                <button id='0' className='button button-bottom' onClick={() => buttonClickFn("0")}>0</button>
                <button id='+' className='button button-bottom' onClick={() => buttonClickFn("+")}>+</button>
                <button id='Enter' className='button equals' onClick={() => buttonClickFn("=")}>=</button>
            </div>
        </div>
    )
}

export default Keypad;