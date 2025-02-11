import {useRef} from "react";
import InputContainer from "./InputContainer";
import {digits} from "../../utils/digits";

// eslint-disable-next-line react/prop-types
const DecimalInput = ({ label, value, onChange, onClick, ...props }) => {
    const ref = useRef();
    const handleClickContainer = (event) => {
        ref.current?.focus();
        onClick?.(event);
    };
    const handleChange = (event) => {
        const value = digits.parse(event.target.value);
        onChange?.(value);
    };
    return (
        <InputContainer onClick={handleClickContainer} label={label} {...props}>
            <input
                ref={ref}
                type="tell"
                inputMode={"decimal"}
                value={digits.stringify(value)}
                onChange={handleChange}
                className={"w-full h-8 bg-inherit border-0 outline-0 px-4 color-text font-bold text-[20px] leading-8 text-black dark:text-white"}
            />
        </InputContainer>
    )
};

export default DecimalInput;
