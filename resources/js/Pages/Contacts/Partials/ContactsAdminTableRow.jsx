import { router } from "@moraki/inertia-react";

function ContactsAdminTableRow({ item, setEditingItem, setSelectedContact }) {
    const handleValidate = (contact) => {
        router.visit(route("contacts.validate", { id: contact.id }));
    };

    return (
        <tr className="bg-white border-b items-center">
            <th
                scope="row"
                className="pl-6 py-2 font-medium text-gray-900 whitespace-nowrap"
            >
                #{item.id}
            </th>

            <td className="px-1 py-4">{item.name}</td>

            <td className="px-1 py-4">{item.phone}</td>

            <td className="px-1 py-4">{item.address}</td>

            <td className="px-1 py-4">{item.department}</td>

            <td className="px-1 py-4">{item.companyName}</td>

            {!item.isValidated && (
                <td className="py-2 text-center">
                    <button
                        className="font-medium text-gray-600 hover:text-blue-700"
                        onClick={() => handleValidate(item)}
                    >
                        Validar
                    </button>
                </td>
            )}

            <td className="py-2 text-center">
                <button
                    className="font-medium text-gray-600 hover:text-yellow-700"
                    onClick={() => setEditingItem(item)}
                >
                    Modificar
                </button>
            </td>

            <td className="pr-4 py-2 text-center">
                <button
                    className="font-medium text-gray-600 hover:text-red-700"
                    onClick={() => setSelectedContact(item)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
}

export default ContactsAdminTableRow;
