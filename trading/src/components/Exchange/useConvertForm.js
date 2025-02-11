import {useState} from "react";

export const useConvertForm = () => {
    const [errors, setErrors] = useState(undefined);
    const [values, setValues] =  useState({
        amount: 1.00,
        from: "",
        to: "",
    });
    const handleChange = (key, value) => {
        setValues((prev) => ({
            ...prev,
            [key]: value,
        }));
    }
    const validate = () => {
        const errorMessages = {};
        if (!values.amount) {
            errorMessages["amount"] = "Required field!";
        } else {
            if (isNaN(+values.amount)) {
                errorMessages["amount"] = "Must be number!";
            } else if (+values.amount <= 0) {
                errorMessages["amount"] = "Must be greater than 0!";
            }
        }
        if (!values.from) {
            errorMessages["from"] = "Required field!";
        }
        if (!values.to) {
            errorMessages["to"] = "Required field!";
        }
        const hasError = !!Object.keys(errorMessages).length;
        if (hasError) {
            setErrors(errorMessages);
        } else {
            setErrors(undefined);
        }
        return hasError
    }
    return {
        values,
        errors,
        validate,
        setValues,
        handleChange,
    }
}