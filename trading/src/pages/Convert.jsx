import {useState} from "react";
import ConvertForm from "../components/Exchange/ConvertForm";
import Exchange from "../components/Exchange/Exchange";
import ExchangeHistory from "../components/Exchange/ExchangeHistory";
import {useExchangeHistory} from "../components/Exchange/useExchangeHistory";

const Convert = () => {
    const [exchange, setExchange] = useState(undefined);
    const exchangeHistory = useExchangeHistory();
    const handleSubmit = (item) => {
        setExchange(item);
        exchangeHistory.addToList(item);
    };
    return (
        <div className={"px-2 py-8"}>
            <ConvertForm onSubmit={handleSubmit}>
                {exchange && (
                    <Exchange
                        from={exchange.from}
                        to={exchange.to}
                        amount={exchange.amount}
                        convertedAmount={exchange.convertedAmount}
                        conversionRate={exchange.conversionRate}
                    />
                )}
            </ConvertForm>
            <ExchangeHistory
                className={"mt-8"}
                list={exchangeHistory.list}
            />
        </div>
    );
}

export default Convert
