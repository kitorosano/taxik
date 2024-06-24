import Dropdown from "@/Components/Dropdown";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { objectToArray, removeEmptyValues } from "@/Utils/functions";
import { router, useForm } from "@moraki/inertia-react";
import debounce from "just-debounce-it";
import { useCallback, useState } from "react";

function TaxisCompanyFilters({ filters, columns, handleCreate }) {
    const { data, setData } = useForm({
        driver_name: filters.driver_name || "",
        car_registration: filters.car_registration || "",
        car_model: filters.car_model || "",
    });

    const availableFilters = Object.entries(columns).filter(
        ([key]) => key !== "driver_picture"
    );
    const [activeFilters, setActiveFilters] = useState([]);

    const handleAddFilter = ([key, value]) => {
        const activeFilter = { key, value };
        setActiveFilters((prev) => [...prev, activeFilter]);
    };

    const handleRemoveFilters = () => {
        setActiveFilters([]);
        router.get(route("taxis.index"));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
        searchWithFilters(name, value);
    };

    const searchWithFilters = useCallback(
        debounce((name, value) => {
            const realData = { ...data, [name]: value };
            const arrayParams = objectToArray(realData);

            if (arrayParams.every((v) => v === "")) {
                router.get(route("taxis.index"));
                return;
            }

            const transformedData = removeEmptyValues(realData);
            router.visit(route("taxis.index"), {
                data: transformedData,
                preserveState: true,
                replace: true,
            });
        }, 300),
        [data]
    );
    return (
        <>
            <div className="flex justify-between items-center text-gray-900 py-4">
                <div className="flex w-full">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Gestiona todos los taxis de tu empresa
                    </h2>
                </div>

                <div className="flex items-center justify-end w-full gap-4">
                    <SecondaryButton onClick={handleCreate}>
                        Asociar nuevo taxi 
                    </SecondaryButton>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <SecondaryButton className="h-full">
                                Agregar Filtro
                            </SecondaryButton>
                        </Dropdown.Trigger>

                        <Dropdown.Content align="left">
                            {availableFilters.map((entry) => {
                                const [key, value] = entry;
                                if (activeFilters.find((f) => f.key === key))
                                    return null;

                                return (
                                    <Dropdown.Button
                                        key={`add-filter-${key}`}
                                        onClick={() => handleAddFilter(entry)}
                                    >
                                        {value}
                                    </Dropdown.Button>
                                );
                            })}
                            <Dropdown.Divider />
                            <Dropdown.Button onClick={handleRemoveFilters}>
                                Quitar Filtros
                            </Dropdown.Button>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
            {activeFilters.length > 0 && (
                <div className="flex items-center text-gray-900 pt-2 pb-4">
                    {activeFilters.map(({ key, value }) => (
                        <div
                            key={`filter-${key}`}
                            className="flex items-center mx-2 "
                        >
                            <TextInput
                                name={key}
                                className="max-w-96 text-black"
                                placeholder={value + "..."}
                                value={data[key]}
                                onChange={handleChange}
                            />
                            <button
                                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 ml-1 p-1 rounded-full"
                                onClick={() => {
                                    setActiveFilters((prev) =>
                                        prev.filter((f) => f.key !== key)
                                    );
                                    setData(key, "");
                                    searchWithFilters(key, "");
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-400"
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
                    ))}
                </div>
            )}
        </>
    );
}

export default TaxisCompanyFilters;
