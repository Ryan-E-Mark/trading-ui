export const getNumberRounded = (number: string, decimalPlace: number) => {
    return parseFloat(number).toFixed(decimalPlace)
}