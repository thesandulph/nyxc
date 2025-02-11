import { AiOutlineSwap } from "react-icons/ai";
import Button from "../Fundamentals/Button";
import DecimalInput from "../Fundamentals/DecimalInput";
import SearchInput from "../Fundamentals/SearchInput";
import {useCurrencies, useExchange} from "./useExchange";
import {useConvertForm} from "./useConvertForm";

// eslint-disable-next-line react/prop-types
const ConvertForm = ({onSubmit, children}) => {
    const exchange = useExchange();
    const currencies = useCurrencies();
    const {values, errors, setValues, handleChange, validate} = useConvertForm();
    const handleSwap = () => {
        setValues((prevState) => {
            return {
                ...prevState,
                from: prevState.to,
                to: prevState.from,
            };
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const hasError = validate();
        if (!hasError) {
            const response = await exchange.getConversionRate(values);
            onSubmit?.(response);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1 className={"text-[20px] font-bold"}>Exchange</h1>
            <div className={"flex flex-col md:flex-row gap-4"}>
                <DecimalInput
                    label={"amount"}
                    className={"flex-1"}
                    error={errors?.amount}
                    value={values.amount}
                    onChange={(value) => {
                        handleChange("amount", value);
                    }}
                />
                <div className={"flex flex-col sm:flex-row gap-1 flex-[2] relative"}>
                    <SearchInput
                        label={"from"}
                        className={"flex-1"}
                        list={currencies.list}
                        error={errors?.from}
                        value={values.from}
                        onChange={(value) => {
                            handleChange("from", value);
                        }}
                    />
                    <SearchInput
                        label={"to"}
                        className={"flex-1"}
                        list={currencies.list}
                        error={errors?.to}
                        value={values.to}
                        onChange={(value) => {
                            handleChange("to", value);
                        }}
                    />
                    <button disabled={exchange.loading} onClick={handleSwap} className={"absolute bg-blue-500 w-8 h-8 rounded-[16px] flex items-center justify-center left-[50%] top-[50%] -translate-x-[16px] -translate-y-[26px]"}>
                        <AiOutlineSwap className={"text-white text-[20px] max-sm:rotate-90"} />
                    </button>
                </div>
            </div>
            <div className={"flex flex-col-reverse md:flex-row gap-4 mt-8 items-start"}>
                <div className={`flex-1 ${exchange.loading ? "opacity-20" : ""}`}>
                    {children}
                </div>
                <Button type="submit" loading={exchange.loading}>
                    Convert
                </Button>
            </div>
        </form>
    );
}

export default ConvertForm;