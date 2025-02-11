import {forwardRef} from "react";

// eslint-disable-next-line react/prop-types
const InputContainer = ({label, children, overlay: Overlay, error = false, className = "", ...props}, ref) => {
    return (
        <div className={`${className}`}>
            <div
                ref={ref}
                className={`relative bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 cursor-pointer rounded-lg overflow-hidden py-2`}
                {...props}
            >
                <p className={"opacity-50 text-left text-black dark:text-white px-4 capitalize text-[12px] font-bold"}>{label}</p>
                {children}
            </div>
            <p className={"mt-1 text-[11px] h-4 text-red-500"}>{error || ""}</p>
            {Overlay && (
                <Overlay/>
            )}
        </div>
    )
};

export default forwardRef(InputContainer);
