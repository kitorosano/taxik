import Dropdown from "@/Components/Dropdown";
import SecondaryButton from "@/Components/SecondaryButton";
import { objectToArray, removeEmptyValues } from "@/Utils/functions";
import { router } from "@moraki/inertia-react";
import debounce from "just-debounce-it";
import { useCallback, useState } from "react";
import TravelOrdersCompanyFilterItem from "./TravelOrdersCompanyFilterItem";

const availableFilters = Object.entries({
    id: "ID",
    departureDateFrom: "Fecha de Salida Desde",
    departureDateTo: "Fecha de Salida Hasta",
    arrivalDateFrom: "Fecha de Llegada Desde",
    arrivalDateTo: "Fecha de Llegada Hasta",
    status: "Estado",
});

function TravelOrdersCompanyFilters({ useForm }) {
    const { data, setData, get, errors } = useForm;

    const [activeFilters, setActiveFilters] = useState([]);

    const handleAddFilter = ([key, value]) => {
        const activeFilter = { key, value };
        setActiveFilters((prev) => [...prev, activeFilter]);
    };

    const handleRemoveFilters = () => {
        setActiveFilters([]);
        get(route("travel-order.index"));
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
                router.get(route("travel-order.index"));
                return;
            }

            const transformedData = removeEmptyValues(realData);
            router.visit(route("travel-order.index"), {
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
                        Mostrando tus solicitudes de reservas de viajes
                    </h2>
                </div>

                <div className="flex items-center justify-end w-full gap-4">
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
                <div className="flex items-center text-gray-900 pb-2">
                    {activeFilters.map(({ key, value }) => (
                        <TravelOrdersCompanyFilterItem
                            key={`filter-${key}`}
                            filterKey={key}
                            filterValue={data[key]}
                            filterName={value}
                            type={
                                key.toLowerCase().includes("date")
                                    ? "date"
                                    : "text"
                            }
                            onButtonClick={() => {
                                setActiveFilters((prev) =>
                                    prev.filter((f) => f.key !== key)
                                );
                                setData(key, "");
                                searchWithFilters(key, "");
                            }}
                            inputHandleChange={handleChange}
                            errorMessage={errors[key]}
                        />
                    ))}
                </div>
            )}
        </>
    );
}

export default TravelOrdersCompanyFilters;
