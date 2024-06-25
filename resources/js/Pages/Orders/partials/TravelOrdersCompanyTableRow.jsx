import {
    travelOrderStatusCode,
    travelOrderStatusList,
} from "@/Utils/constants";
import { useForm } from "@moraki/inertia-react";

function TravelOrdersCompanyTableRow({ item, setSelectedOrder }) {
    const { data, patch, transform, errors, processing } = useForm({
        status: item.status,
        reazon: "",
    });

    const statusColors = {
        Pendiente: "bg-orange-100 text-orange-800",
        Aprobado: "bg-blue-100 text-blue-800",
        Rechazado: "bg-red-100 text-red-800",
        Completado: "bg-green-100 text-green-800",
        Cancelado: "bg-red-100 text-red-800",
    }[item.status];

    const selectableStatuses = travelOrderStatusList.map((status, index) => ({
        key: index,
        value: status,
    }));

    const handleChange = (e) => {
        const { key, value } = e.target;

        transform((data) => ({
            ...data,
            status: key,
        }));

        patch(route("travel-order.update", item.id), {
            preserveScroll: true,
            only: ["item"],
        });
    };

    const handleDeclineSubmit = (e) => {
        e.preventDefault();

        transform((data) => ({
            ...data,
            status: travelOrderStatusCode.Rechazado,
        }));

        if (confirm("¿Estás seguro de deseas rechazar esta reserva?")) {
            patch(route("travel-order.update", item.id), {
                preserveScroll: true,
                only: ["item"],
            });
        }
    };

    const handleCancelSubmit = (e) => {
        e.preventDefault();

        transform((data) => ({
            ...data,
            status: travelOrderStatusCode.Cancelado,
        }));

        if (confirm("¿Estás seguro de deseas cancelar esta reserva?")) {
            patch(route("travel-order.update", item.id), {
                preserveScroll: true,
                only: ["item"],
            });
        }
    };

    return (
        <tr className="bg-white border-b items-center">
            <th
                scope="row"
                className="pl-6 py-2 font-medium text-gray-900 whitespace-nowrap"
            >
                #{item.id}
            </th>

            <td className="px-1 py-4">{item.client}</td>

            <td className="px-1 py-4">{item.origin}</td>

            <td className="px-1 py-4">{item.destination}</td>

            <td className="px-1 py-4">{item.departureDate}</td>

            <td className="px-1 py-4">
                <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors}`}
                >
                    {item.status}
                </span>
            </td>

            <td className="py-2 text-center">
                <button
                    className="font-medium text-gray-600 hover:text-blue-700"
                    onClick={() => setSelectedOrder(item)}
                >
                    Ver detalles
                </button>
            </td>

            {/* <td className="px-2 py-4 w-40 pr-6">
                    <form>
                        <SelectInput
                            disabled={processing}
                            options={selectableStatuses}
                            value={data.status}
                            onChange={handleChange}
                            inputClassName="w-full px-2 py-1 text-gray-600 text-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            optionsWrapperClassName="w-32"
                            optionClassName="w-full px-2 py-1 text-gray-600 text-sm hover:bg-indigo-100"
                        />
                        <InputError message={errors.status} className="mt-2" />
                    </form>
            </td> */}
        </tr>
    );
}

export default TravelOrdersCompanyTableRow;
