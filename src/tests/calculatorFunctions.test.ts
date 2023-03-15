import {describe, test, expect, it} from 'vitest';
import { calculateVal } from '../components/calculator/calculatorFunctions';

describe("Calculator", () => {
    test("Should add two numbers", () => {
        let a = '1'
        let b = '2'
        let operator = '+'

        expect(calculateVal(a, b, operator)).toEqual('3')
    })

    test("Should show title", () => {
        let a = '3'
        let b = '2**2'
        let operator = '+'

        expect(calculateVal(a, b, operator)).toEqual('7')
    })
})