export const digits = {
    parse: (value) => {
        return +value.replace(/[^\d]/g, "");
    },
    stringify: (value) => {
        const [integerPart, decimalPart] = value.toString().split(".");
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    },
}