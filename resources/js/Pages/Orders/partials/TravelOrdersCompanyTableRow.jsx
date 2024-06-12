import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { travelOrderStatusList } from "@/Utils/constants";
import { useForm } from "@moraki/inertia-react";

function TravelOrdersCompanyTableRow({ item }) {
    const { data, patch, transform, errors, processing } = useForm({
        status: item.status,
    });

    const selectableStatuses = travelOrderStatusList.map((status, index) => ({
        key: index,
        value: status,
    }));

    const handleChange = (e) => {
        const { key, value } = e.target;

        transform((data) => ({
            status: key,
        }));

        patch(route("travel-order.update", item.id), {
            preserveScroll: true,
            only: ["item"],
        });
    };

    return (
        <tr className="bg-white border-b items-center">
            <th
                scope="row"
                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
            >
                #{item.id}
            </th>

            <td className="px-1 py-4">{item.client}</td>

            <td className="px-1 py-4">{item.origin}</td>

            <td className="px-1 py-4">{item.destination}</td>

            <td className="px-1 py-4">${item.price}</td>

            <td className="px-1 py-4">{item.departureDate}</td>

            <td className="px-1 py-4">{item.estimatedArrivalDate}</td>

            <td className="px-2 py-4 w-40 pr-6">
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
            </td>
        </tr>
    );
}

export default TravelOrdersCompanyTableRow;
