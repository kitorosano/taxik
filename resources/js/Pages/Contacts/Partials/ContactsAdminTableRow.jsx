import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
function ContactsAdminTableRow({ item, columns }) {
    const {
        data,
        setData,
        patch,
        delete: destroy,
        clearErrors,
        reset,
        errors,
    } = useForm({
        name: item.name,
        phone: item.phone,
        address: item.address,
        linked_company_id: item.linked_company_id || "",
    });

    const [editingItem, setEditingItem] = useState(null);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSave = (e) => {
        e.preventDefault();

        patch(route("contacts.update", editingItem.id), {
            onSuccess: () => setEditingItem(null),
        });
    };

    const handleCancel = () => {
        setEditingItem(null);
        reset();
        clearErrors();
    };

    const handleDestroy = (e) => {
        e.preventDefault();

        if (confirm("¿Estás seguro de eliminar este contacto?")) {
            destroy(route("contacts.destroy", item.id));
        }
    };

    return (
        <tr key={item.id} className="bg-white border-b items-center">
            <th
                scope="row"
                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
            >
                #{item.id}
            </th>

            {editingItem?.id == item.id ? (
                <>
                    {Object.keys(columns).map((key) => (
                        <td key={item.id + key} className="px-1 py-3">
                            <TextInput
                                form="update_contact_form"
                                name={key}
                                value={data[key]}
                                onChange={handleChange}
                                className="w-full px-2 py-1 text-gray-900 text-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            ></TextInput>
                            <InputError
                                message={errors[key]}
                                className="mt-2"
                            />
                        </td>
                    ))}
                    <td className="px-1 py-2 text-center">
                        <form onSubmit={handleSave} id="update_contact_form">
                            <button
                                form="update_contact_form"
                                onClick={() => setEditingItem(item)}
                                className="font-medium text-gray-600 hover:text-blue-700"
                            >
                                Guardar
                            </button>
                        </form>
                    </td>
                    <td className="px-1 py-2 text-center">
                        <button
                            type="button"
                            className="font-medium text-gray-600 hover:text-red-700"
                            onClick={handleCancel}
                        >
                            Cancelar
                        </button>
                    </td>
                </>
            ) : (
                <>
                    {Object.keys(columns).map((key) => (
                        <td key={item.id + key} className="px-1 py-4 ">
                            {item[key]}
                        </td>
                    ))}
                    <td className="py-2 text-center">
                        <button
                            className="font-medium text-gray-600 hover:text-yellow-700"
                            onClick={() => setEditingItem(item)}
                        >
                            Modificar
                        </button>
                    </td>
                    <td className="py-2 text-center">
                        <form onSubmit={handleDestroy} method="delete">
                            <button className="font-medium text-gray-600 hover:text-red-700">
                                Eliminar
                            </button>
                        </form>
                    </td>
                </>
            )}
        </tr>
    );
}

export default ContactsAdminTableRow;
