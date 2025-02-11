const {BadRequestError} = require("../utils/errors");

const baseUrl = "https://v6.exchangerate-api.com/v6/60c51230ca3e85da4b33ed8f"; // use process.env.EXCHANGE_RATE_API_URL instead of the hardcode string value

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
        const response = await httpCall(`/codes`, {
            method: "GET",
        });
        if (response.result === "success") {
            return response.supported_codes.map((item) => {
                return {
                    id: item[0],
                    title: item[1],
                };
            });
        }
        throw new BadRequestError(response["error-type"]);
    };
    const getConversionRate = async (from, to) => {
        const response = await httpCall(`/pair/${from}/${to}`, {
            method: "GET",
        });
        if (response.result === "success") {
            return response.conversion_rate;
        }
        throw new BadRequestError(response["error-type"]);
    };
    return {
        getCurrencies,
        getConversionRate,
    };
}

const exchangeRepository = new ExchangeRepository();

module.exports = exchangeRepository;