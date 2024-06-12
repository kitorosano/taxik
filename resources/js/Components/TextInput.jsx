import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    {
        type = "text",
        className = "",
        isFocused = false,
        icon,
        onClick,
        ...props
    },
    ref
) {
    const inputRef = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className="flex justify-center items-center relative">
            <input
                {...props}
                type={type}
                className={
                    "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " +
                    className
                }
                ref={inputRef}
            />
            {icon && (
                <span className="absolute right-2 flex">
                    {icon}
                </span>
            )}
        </div>
    );
});
