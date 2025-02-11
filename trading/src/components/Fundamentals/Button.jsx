// eslint-disable-next-line react/prop-types
const Button = ({ type = "button", className = "", loading = false, disabled = false, children, ...props }) => {
    return (
        <button
            type={type}
            default={loading || disabled}
            className={`relative overflow-hidden px-8 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold uppercase ${className}`}
            {...props}
        >
            {children}
            {loading && (
                <div className={"spinner bg-inherit"}></div>
            )}
        </button>
    );
};

export default Button;
