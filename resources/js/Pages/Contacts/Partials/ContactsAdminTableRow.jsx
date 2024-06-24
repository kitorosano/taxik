import { useForm } from "@moraki/inertia-react";

function ContactsAdminTableRow({ item, setEditingItem }) {
    const { delete: destroy } = useForm(item);

    const handleDeleteSubmit = (e) => {
        e.preventDefault();

        if (confirm("¿Estás seguro de eliminar este contacto?")) {
            destroy(route("contacts.destroy", item.id));
        }
    };

    return (
        <tr className="bg-white border-b items-center">
            <th
                scope="row"
                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
            >
                #{item.id}
            </th>

            <td className="px-1 py-4">{item.name}</td>

            <td className="px-1 py-4">{item.phone}</td>

            <td className="px-1 py-4">{item.address}</td>

            <td className="px-1 py-4">{item.department}</td>

            <td className="px-1 py-4">{item.companyName}</td>

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

export default ContactsAdminTableRow;
