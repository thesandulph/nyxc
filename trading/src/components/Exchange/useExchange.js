import {useEffect, useState, useRef} from "react";
import exchangeRepository from "./ExchangeRepository";

export const useExchange = () => {
    const [item, setItem] = useState();
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const getConversionRate = async ({from, to, amount}) => {
        try {
            if (!loading) {
                setLoading(true);
                const response = await exchangeRepository.convert({from, to, amount});
                setItem(response);
                setError(false);
                setLoaded(true);
                setLoading(false);
                return response;
            }
        } catch (error) {
            setError(true);
            setLoaded(false);
            setLoading(false);
            throw error;
        }
    };
    return {
        item,
        error,
        loaded,
        loading,
        getConversionRate,
    };
};

export const useCurrencies = () => {
    const [list, setList] = useState([]);
    const loadingRef = useRef(false);
    const refetch = async () => {
        try {
            if (!loadingRef.current) {
                loadingRef.current = true;
                const response = await exchangeRepository.getCurrencies();
                setList(response);
                loadingRef.current = false;
            }
        } catch (error) {
            loadingRef.current = false;
        }
    };
    useEffect(() => {
        refetch();
    }, []);
    return {
        list,
        refetch,
    };
};
