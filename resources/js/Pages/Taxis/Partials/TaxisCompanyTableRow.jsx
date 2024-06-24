import { useForm } from "@moraki/inertia-react";

function TaxisCompanyTableRow({ item, setEditingItem, setViewingPicture }) {
    const { delete: destroy } = useForm(item);

    const handleDeleteSubmit = (e) => {
        e.preventDefault();

        if (confirm("¿Estás seguro de eliminar este taxi?")) {
            destroy(route("taxis.destroy", item.id));
        }
    };

    return (
        <tr key={item.id} className="bg-white border-b items-center">
            <th className="px-6 py-2">
                <img
                    src={item.driver_picture}
                    alt="Foto Chofer"
                    width={14}
                    className="w-14 h-14 rounded-full hover:opacity-75 hover:cursor-pointer"
                    onClick={() => setViewingPicture(item.driver_picture)}
                />
            </th>

            <td className="px-2 py-4">{item.driver_name}</td>

            <td className="px-2 py-4">{item.car_model}</td>

            <td className="px-2 py-4">{item.car_registration}</td>

            <td className="py-2 text-center">
                <button
                    className="font-medium text-gray-600 hover:text-yellow-700"
                    onClick={() => setEditingItem(item)}
                >
                    Modificar
                </button>
            </td>

            <td className="pr-4 py-2 text-center">
                <form onSubmit={handleDeleteSubmit}>
                    <button className="font-medium text-gray-600 hover:text-red-700">
                        Eliminar
                    </button>
                </form>
            </td>
        </tr>
    );
}

export default TaxisCompanyTableRow;
