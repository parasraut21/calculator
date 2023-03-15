
export const operators = ['+', '-', '*', '/', 'C', '#', '**2', '**0.5', '=']

    const customEval = (stringToEval: string): number => {
        // This prevents floating point errors in javascript, e.g.
        // 0.1 * 0.1 in native javascript returns 0.010000000000000002
        var factor = Math.pow(10, 7)
        return Math.round(eval(stringToEval) * factor) / factor
    }

export const calculateVal = (v1: string, v2:string, operator: string) => {
    let valToReturn = customEval(v1 + operator + v2)
    if (valToReturn > 1e12) {
        return Number(valToReturn.toExponential()).toPrecision(9)
    } else {
        return valToReturn.toString()
    }
    
}
