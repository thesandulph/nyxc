export const createStorage = (name) => {
    const get = () => {
        try {
             const storedValue = localStorage.getItem(name);
             if (storedValue) {
                 return JSON.parse(storedValue) || undefined;
             }
             return undefined
        } catch (error) {
            return undefined;
        }
    };
    const set = (value) => {
        localStorage.setItem(name, JSON.stringify(value));
    };
    const clear = () => {
        localStorage.removeItem(name);
    };
    return {
        get,
        set,
        clear,
    };
}