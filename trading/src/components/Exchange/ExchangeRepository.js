const baseUrl = "http://localhost:5000/api"; // use process.env.BACKEND_API_URL instead of the hardcode string value

const ExchangeRepository = function () {
    const httpCall = async (path, {body, ...options} = {}) => {
        const response = await fetch(`${baseUrl}${path}`, {
            ...options,
            ...(body ? {body: JSON.stringify(body)} : undefined),
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            }
        });
        if (response.ok) {
            return response.json();
        }
        throw response;
    };
    const getCurrencies = async () => {
        return httpCall(`/exchange/currency`, {
            method: "GET",
        });
    };
    const getConversionHistory = async () => {
        return httpCall(`/exchange/convert`, {
            method: "GET",
        });
    };
    const convert = async (body) => {
        return httpCall(`/exchange/convert`, {
            method: "POST",
            body,
        });
    };
    return {
        convert,
        getCurrencies,
        getConversionHistory,
    };
}

const exchangeRepository = new ExchangeRepository();

export default exchangeRepository;
