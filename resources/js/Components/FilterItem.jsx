import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

const FilterItem = ({
    filterKey,
    filterValue,
    filterName,
    type,
    onButtonClick,
    inputHandleChange,
    errorMessage,
}) => {
    return (
        <div className="mx-2 ">
            <InputLabel htmlFor={filterKey} value={filterName} />
            <div className="flex items-center">
                {type === "date" ? (
                    <TextInput
                        id={filterKey}
                        name={filterKey}
                        type="datetime-local"
                        className="max-w-96 text-black"
                        placeholder={filterName + "..."}
                        value={filterValue}
                        onChange={inputHandleChange}
                    />
                ) : (
                    <TextInput
                        id={filterKey}
                        name={filterKey}
                        className="max-w-96 text-black"
                        placeholder={filterName + "..."}
                        value={filterValue}
                        onChange={inputHandleChange}
                    />
                )}

                <button
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 ml-1 p-1 rounded-full"
                    onClick={onButtonClick}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <InputError message={errorMessage} className="mt-2" />
        </div>
    );
};

export default FilterItem;
