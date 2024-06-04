import { forwardRef, useEffect, useState } from "react";
import TextInput from "./TextInput";

function TextInputWithOptions(
    {
        optionList: _optionList = [],
        wrapperClassName = "",
        inputClassName = "",
        inputValue: _inputValue = "",
        optionsClassName = "",
        inputIsFocused = false,
        inputOnChange = (e) => {},
        optionsOnChange = (e, option) => {},
        optionsIsAlwaysVisible = false,
        ...props
    },
    ref
) {
    const [inputValue, setInputValue] = useState(_inputValue);
    const [optionList, setOptionsList] = useState(_optionList);
    const [isListVisible, setIsListVisible] = useState(false);

    useEffect(() => {
        setOptionsList(_optionList);
    }, [isListVisible]);

    // escribo y cuando selecciono una opcion
    const handleChange = (e) => {
        setIsListVisible(true);
        setInputValue(e.target.value);
        filterOptions(e.target.value);
        inputOnChange(e);
    };

    const filterOptions = (inputvalue) => {
        setOptionsList(
            _optionList.filter(({ value }) =>
                value.toLowerCase().includes(inputvalue.toLowerCase())
            )
        );
    };

    // selecciono una opcion
    const handleOptionClick = ({ value }) => {
        setInputValue(value);
        filterOptions(value);

        const stubEvent = { target: { value } };
        inputOnChange(stubEvent);
        optionsOnChange(stubEvent);

        setIsListVisible(false);
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            setIsListVisible(false);
        }, 200);
    };

    return (
        <div className={"relative w-full " + wrapperClassName}>
            <TextInput
                ref={ref}
                className={inputClassName}
                value={inputValue}
                onChange={handleChange}
                // onFocus={() => setIsListVisible(true)}
                onBlur={handleInputBlur}
                {...props}
            />

            {(isListVisible || optionsIsAlwaysVisible) && (
                <div
                    className={
                        "absolute flex flex-col bg-white shadow-md rounded-lg mt-2 max-h-44 overflow-y-auto w-full "
                    }
                >
                    {optionList.map(({ key, value }) => (
                        <div
                            key={key}
                            className={
                                "relative cursor-pointer " + optionsClassName
                            }
                            onClick={(e) => handleOptionClick({ key, value })}
                        >
                            {value}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default forwardRef(TextInputWithOptions);
