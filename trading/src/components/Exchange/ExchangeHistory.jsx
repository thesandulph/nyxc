import Exchange from "./Exchange";

// eslint-disable-next-line react/prop-types
const ExchangeHistory = ({className = "", list = []}) => {
    if (list.length) {
        return (
            <div className={className}>
                <h1 className={"text-[20px] font-bold"}>Exchange history</h1>
                <ul>
                    {list.sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    }).map((item, index) => {
                        return (
                            <li key={`exchange-history-${item._id}`}>
                                <Exchange
                                    compact
                                    className={`w-full sm:w-[50%] ${index ? "rounded-t-none" : ""} ${index === list.length - 1 ? "" : "rounded-b-none border-b-0"}`}
                                    from={item.from}
                                    to={item.to}
                                    amount={item.amount}
                                    convertedAmount={item.convertedAmount}
                                    conversionRate={item.conversionRate || 0}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
    return null;
}

export default ExchangeHistory;