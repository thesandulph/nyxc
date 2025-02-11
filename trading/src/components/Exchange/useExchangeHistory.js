import {useState} from "react";
import {createStorage} from "../../utils/storage";

const storage = createStorage("exchange-history");

export const useExchangeHistory = () => {
    const [list, setList] = useState(storage.get() || []);
    const addToList = (item) => {
        const newList = [...list, item];
        setList(newList);
        storage.set(newList)
    };
    const clearList = () => {
        setList([]);
        storage.clear();
    };
    return {
        list,
        addToList,
        clearList,
    };
};