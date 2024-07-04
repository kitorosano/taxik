import { forwardRef, useRef, useState } from "react";
import { CaretIcon } from "./Icons";
import TextInput from "./TextInput";

function SelectInput(
    {
        options = [],
        value = "",
        onChange = (e) => {},
        wrapperClassName = "",
        inputClassName = "",
        optionsWrapperClassName = "",
        optionClassName = "",
        disabled = false,
        ...props
    },
    ref
) {
    const selectRef = ref ? ref : useRef();

    const [inputValue, setInputValue] = useState(value);
    const [isListVisible, setIsListVisible] = useState(false);

    // selecciono una opcion
    const handleOptionClick = ({ key, value }) => {
        setInputValue(value);

        const stubEvent = { target: { key, value } };
        onChange(stubEvent);

        setIsListVisible(false);
    };

    const handleInputFocus = () => {
        if (disabled) return;
        setIsListVisible(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            setIsListVisible(false);
        }, 200);
    };

    return (
        <div className={"relative w-full " + wrapperClassName}>
            <TextInput
                ref={selectRef}
                readOnly
                className={inputClassName}
                value={inputValue}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                icon={
                    <CaretIcon
                        isOpen={isListVisible}
                        onClick={() => setIsListVisible((prev) => !prev)}
                    />
                }
                {...props}
            />

            {isListVisible && (
                <div
                    className={
                        "absolute flex flex-col bg-white shadow-md rounded-lg mt-1 z-50 " +
                        optionsWrapperClassName
                    }
                >
                    {options.map(({ key, value }) => (
                        <div
                            key={key}
                            className={"relative cursor-pointer " + optionClassName}
                            onClick={() => handleOptionClick({ key, value })}
                        >
                            {value}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default forwardRef(SelectInput);
