import {useEffect, useMemo, useRef, useState} from "react";
import InputContainer from "./InputContainer";

// eslint-disable-next-line react/prop-types
const SearchInput = ({label, value, onChange, list = [], onClick, className = "", ...props}) => {
    const rootRef = useRef();
    const dropdownRef = useRef();
    const [search, setSearch] = useState("");
    const [openList, setOpenList] = useState(false);
    const handleClickContainer = (event) => {
        setOpenList(true);
        onClick?.(event);
    };
    const handleClickItem = (item) => {
        onChange?.(item);
        setSearch("");
        setOpenList(false);
    };
    const selectedValue = useMemo(() => {
        if (value) {
            return list.find((item) => {
                return item.id === value;
            });
        }
        return undefined
    }, [value, list]);
    useEffect(() => {
        const handler = (event) => {
            if (rootRef.current?.contains(event.target) || rootRef.current === event.target) {
                return;
            }
            if (dropdownRef.current?.contains(event.target) || dropdownRef.current === event.target) {
                return;
            }
            setSearch("");
            setOpenList(false);
        };
        document.addEventListener('mousedown', handler);
        return () => {
            document.removeEventListener('mousedown', handler);
        };
    }, []);
    return (
        <>
            <InputContainer
                ref={rootRef}
                onClick={handleClickContainer}
                label={label}
                className={`relative ${className}`}
                overlay={() => {
                    if (openList) {
                        return (
                            <div ref={dropdownRef}
                                 className={"absolute top-[calc(100%-24px)] w-full left-0 max-w-50 pt-2 z-[1000]"}>
                                <div className={"max-h-40 overflow-y-auto rounded-lg"}>
                                    <ul className={"bg-gray-100 dark:bg-gray-700"}>
                                        {list.filter((item) => {
                                            if (search) {
                                                return item.id.toLowerCase().includes(search.toLowerCase()) || item.title.toLowerCase().includes(search.toLowerCase());
                                            }
                                            return true;
                                        }).map((item) => (
                                            <div
                                                className={"h-8 cursor-pointer text-black dark:text-white px-4 py-2 hover:dark:bg-gray-800 hover:bg-gray-300 truncate"}
                                                key={`search-input-${item.id}`}
                                                onClick={() => {
                                                    handleClickItem(item.id);
                                                }}>
                                                {item.title}
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )
                    }
                    return null;
                }}
                {...props}
            >
                <div
                    className={"h-8 px-4 leading-8 text-black dark:text-white relative"}>
                    {openList ? (
                        <input
                            autoFocus
                            type="text"
                            value={search}
                            placeholder={"Search currencies"}
                            onChange={(event) => {
                                setSearch(event.target.value);
                            }}
                            className={"w-full h-8 bg-inherit border-0 outline-0 color-text font-bold text-[20px] leading-8 text-black dark:text-white"}
                        />
                    ) : (
                        selectedValue ? (
                            <span
                                className={"absolute top-0 left-4 text-white w-[calc(100%-32px)] text-neutral-400 h-full block truncate"}>
                            <span
                                className={"mr-2 font-bold text-[20px] dark:text-white text-black"}>{selectedValue.id}</span> ({selectedValue.title})
                        </span>
                        ) : (
                            <span className={"opacity-50 text-[20px] font-bold"}>Select Value</span>
                        )
                    )}
                </div>
            </InputContainer>
        </>
    )
};

export default SearchInput;
