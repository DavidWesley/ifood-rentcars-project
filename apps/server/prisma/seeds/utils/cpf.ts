/**
 * Generates valid CPF numbers for testing purposes
 * @param {number} quantity - Number of CPFs to generate
 * @return {string[]} - Array of generated CPFs
 */
const generateCPFs = (quantity: number): string[] => Array.from({ length: quantity }, () => generateCPF())

/**
 * Generates a valid CPF number
 * @return {string} - Generated CPF
 */
const generateCPF = (): string => {
    const numbers: number[] = []

    while (numbers.length < 9) {
        numbers[numbers.length] = Math.floor(Math.random() * 10)
    }

    while (numbers.length < 11) {
        let last = 11 - calculateCheckDigit(numbers)
        if (last > 9) {
            last = 0
        }

        numbers[numbers.length] = last
    }

    return numbers.join("")
}

/**
 * Calculates the check digit for the CPF
 * @param {number[]} numbers - CPF numbers (without check digit)
 * @return {number} - Calculated check digit
 */
const calculateCheckDigit = (numbers: number[]): number => {
    const sum = numbers
        .slice()
        .reverse()
        .reduce((acc, num, idx) => acc + num * (idx + 2), 0)

    return sum % 11
}

export { generateCPF, generateCPFs }
