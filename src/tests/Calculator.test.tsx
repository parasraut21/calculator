import {describe, expect, afterEach, beforeEach, it} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';

import Calculator from '../components/calculator/Calculator';


describe("Keyboard test", () => {
    let [key1, key2, key3, key4, key5, key6, key7, key8, 
        key9, key0, keyTimes, keyDivide, keyDelete, keyClear,
        keyAdd, keySubtract, keySqr, keySqrt, keyEq, keyDot,
        displayVal, secondaryDisplayVal
        ] = [] as HTMLElement[];
    
    let testNumber423: Function
    let testNumber12: Function

    beforeEach(()=> {
        render(<Calculator/>);
        // Numbers
        key1 = screen.getByText('1')
        key2 = screen.getByText('2')
        key3 = screen.getByText('3')
        key4 = screen.getByText('4')
        key5 = screen.getByText('5')
        key6 = screen.getByText('6')
        key7 = screen.getByText('7')
        key8 = screen.getByText('8')
        key9 = screen.getByText('9')
        key0 = screen.getByRole('button', {
            name: '0'
        })

        // Operators
        keyTimes = screen.getByText('x')
        keyDivide = screen.getByText('÷')
        keyDelete = screen.getByText('␡')
        keyClear = screen.getByText('C')
        keyAdd = screen.getByText('+')
        keySubtract = screen.getByText('-')
        keySqrt = screen.getByText('²√𝑥')
        keySqr = screen.getByText('𝑥²')
        keyEq = screen.getByText('=')
        keyDot = screen.getByText('.')

        displayVal = screen.getByTestId('mainDisplayVal')
        secondaryDisplayVal = screen.getByTestId('secondaryDisplayVal')
    })

    afterEach(() => {
        fireEvent.click(keyClear)
    })

    it("should be able to type numbers", () => {
        fireEvent.click(key3)
        fireEvent.click(key2)
        fireEvent.click(key5)
        fireEvent.click(key6)
        fireEvent.click(key7)

        expect(displayVal.innerHTML).toEqual('32567')
    })

    it("should add numbers", () => {
        fireEvent.click(key4)
        fireEvent.click(key2)
        fireEvent.click(key3)

        expect(displayVal.innerHTML).toEqual('423')
        fireEvent.click(keyAdd)

        fireEvent.click(key1)
        fireEvent.click(key2)

        fireEvent.click(keyEq)

        expect(displayVal.innerHTML).toEqual('435')
    })

    it("should subract numbers", () => {
        fireEvent.click(key5)
        fireEvent.click(key0)

        fireEvent.click(keySubtract)

        fireEvent.click(key1)
        fireEvent.click(key2)

        fireEvent.click(keyEq)

        expect(displayVal.innerHTML).toEqual('38')
    })

    it("should handle negative results", () => {
        fireEvent.click(key5)
        fireEvent.click(keySubtract)
        fireEvent.click(key8)
        fireEvent.click(keyEq)

        expect(displayVal.innerHTML).toEqual('-3')
    })

    it("should handle multiplication", () => {
        fireEvent.click(key5)
        fireEvent.click(keyTimes)
        fireEvent.click(key8)
        fireEvent.click(keyEq)

        expect(displayVal.innerHTML).toEqual('40')
    })

    it("should handle division", () => {
        fireEvent.click(key5)
        fireEvent.click(keyDivide)
        fireEvent.click(key2)
        fireEvent.click(keyEq)

        expect(displayVal.innerHTML).toEqual('2.5')
    })

    it("should be able to endlessly calculate", () => {
        fireEvent.click(key5)
        fireEvent.click(keySubtract)
        fireEvent.click(key8)
        fireEvent.click(keyAdd)

        expect(displayVal.innerHTML).toEqual('-3')
        fireEvent.click(key2)
        fireEvent.click(keySubtract)

        expect(displayVal.innerHTML).toEqual('-1')
        fireEvent.click(key8)
        fireEvent.click(keyAdd)

        expect(displayVal.innerHTML).toEqual('-9')
        fireEvent.click(key9)
        fireEvent.click(keyEq)
        expect(displayVal.innerHTML).toEqual('0')
    })

    it("should delete keys properly", () => {
        fireEvent.click(key5)
        fireEvent.click(key8)
        fireEvent.click(key2)
        fireEvent.click(key8)
        fireEvent.click(key9)
        expect(displayVal.innerHTML).toEqual('58289')

        fireEvent.click(keyDelete)
        fireEvent.click(keyDelete)

        expect(displayVal.innerHTML).toEqual('582')

        fireEvent.click(keyDelete)
        fireEvent.click(keyDelete)
        fireEvent.click(keyDelete)

        expect(displayVal.innerHTML).toEqual('0')
    })

    it("should clear calculator on clear press", () => {
        fireEvent.click(key5)
        fireEvent.click(key8)
        fireEvent.click(key2)
        fireEvent.click(key8)
        fireEvent.click(key9)
        expect(displayVal.innerHTML).toEqual('58289')

        fireEvent.click(keyAdd)
        expect(secondaryDisplayVal.innerHTML).toEqual('58289+')

        fireEvent.click(keyClear)
        expect(displayVal.innerHTML).toEqual('0')
        expect(secondaryDisplayVal.innerHTML).toEqual('0')
    })

    it("should handle squaring", () => {

        fireEvent.click(key5)

        fireEvent.click(keySqr)
        expect(displayVal.innerHTML).toEqual('25')
    })

    it("should be able to continuously calculate after squring", () => {
        fireEvent.click(key5)
        fireEvent.click(keySqr)
        expect(displayVal.innerHTML).toEqual('25')

        fireEvent.click(keyAdd)
        expect(secondaryDisplayVal.innerHTML).toEqual('25+')
        fireEvent.click(key2)

        fireEvent.click(keyAdd)
        expect(secondaryDisplayVal.innerHTML).toEqual('27+')
        expect(displayVal.innerHTML).toEqual('27')

        fireEvent.click(keyAdd)
        fireEvent.click(key2)
        fireEvent.click(keySqr)

        expect(secondaryDisplayVal.innerHTML).toEqual('27+2²=')
        expect(displayVal.innerHTML).toEqual('31')
    })

    it("should be able to handle division", () => {
        fireEvent.click(key5)
        fireEvent.click(keyDot)
        fireEvent.click(key2)

        fireEvent.click(keyDivide)

        fireEvent.click(key3)
        fireEvent.click(keyDot)
        fireEvent.click(key8)

        fireEvent.click(keyEq)
        expect(secondaryDisplayVal.innerHTML).toEqual('5.2/3.8=')
        expect(displayVal.innerHTML).toEqual('1.3684211')
    })

    it("should handle square root", () => {

        fireEvent.click(key9)
        fireEvent.click(keySqrt)

        fireEvent.click(keyEq)
        expect(secondaryDisplayVal.innerHTML).toEqual('²√9=')
        expect(displayVal.innerHTML).toEqual('3')
    })

    it("should not have floating point errors when multiplying decimals", () => {

        fireEvent.click(key0)
        fireEvent.click(keyDot)
        fireEvent.click(key2)

        fireEvent.click(keyTimes)

        fireEvent.click(key0)
        fireEvent.click(keyDot)
        fireEvent.click(key0)
        fireEvent.click(key3)

        fireEvent.click(keyEq)
        expect(displayVal.innerHTML).toEqual('0.006')
    })

    it("should not be able to have more than one decimal points", () => {

        fireEvent.click(key0)
        fireEvent.click(keyDot)
        fireEvent.click(key2)
        fireEvent.click(keyDot)
        fireEvent.click(key3)

        expect(displayVal.innerHTML).toEqual('0.23')
    })
})

