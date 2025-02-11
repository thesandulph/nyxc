import {digits} from "../../utils/digits.js";

// eslint-disable-next-line react/prop-types
const Exchange = ({className = "", compact = false, from, to, amount, convertedAmount, conversionRate}) => {
    if (compact) {
        return (
            <div className={`inline-flex border-2 border-gray-800 rounded-lg flex-col px-2 py-1 ${className}`}>
                <div className={`opacity-75 text-[14px] text-black dark:text-white flex-1`}>
                    {digits.stringify(amount)}
                    <span className={"mx-1"}>{from}</span>
                    <span className={"mx-2"}>=</span>
                    {digits.stringify(convertedAmount)}
                    <span className={"mx-1"}>{to}</span>
                </div>
                <div className={`text-[12px] text-black dark:text-white flex-1`}>
                    <span className={"opacity-75"}>Conversion Rate:</span>
                    <span className={"text-base font-bold text-blue-800 ml-2"}>{digits.stringify(conversionRate)}</span>
                </div>
            </div>
        );
    }
    return (
        <div className={`inline-flex sm:h-16 flex-col sm:flex-row items-stretch sm:items-center border-2 border-gray-300 dark:border-gray-800 rounded-lg ${className}`}>
            <div className={`text-black dark:text-white text-center h-full px-8 py-2 bg-gray-300 dark:bg-gray-800`}>
                <div className={"text-base font-bold text-blue-500"}>{digits.stringify(conversionRate)}</div>
                <div className={"text-[12px]"}>Conversion Rate</div>
            </div>
            <div className={`text-[20px] text-black dark:text-white px-8 py-2 flex-1`}>
                {digits.stringify(amount)}
                <span className={"text-base opacity-40 mx-1 leading-[20px]"}>{from}</span>
                <span className={"mx-2"}>=</span>
                {digits.stringify(convertedAmount)}
                <span className={"text-base opacity-40 mx-1 leading-[20px]"}>{to}</span>
            </div>
        </div>
    );
}

export default Exchange;