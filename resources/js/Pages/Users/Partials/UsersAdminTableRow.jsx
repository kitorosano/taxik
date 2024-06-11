import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@moraki/inertia-react";
import { useState } from "react";

function UsersAdminTableRow({ item, columns }) {
    const {
        data,
        setData,
        delete: destroy,
        clearErrors,
        reset,
        errors,
    } = useForm({
        name: item.name,
        email: item.email,
        type: item.type,
    });

    const [editingItem, setEditingItem] = useState(null);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSave = (e) => {
        e.preventDefault();

        router.patch(route("users.update", editingItem.id), {
            onSuccess: () => setEditingItem(null),
            preserveScroll: true,
        });
    };

    const handleCancel = () => {
        setEditingItem(null);
        reset();
        clearErrors();
    };

    const handleDestroy = (e) => {
        e.preventDefault();

        if (confirm("¿Estás seguro de eliminar este usuario?")) {
            destroy(route("users.destroy", item.id));
        }
    };

    return (
        <tr key={item.id} className="bg-white border-b items-center">
            <th
                scope="row"
                className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap"
            >
                #{item.id}
            </th>

            {editingItem?.id == item.id ? (
                <>
                    {Object.keys(columns).map((key) =>
                        key === "type" ? (
                            <td key={item.id + key} className="px-1 py-4">
                                {item.typeString}
                            </td>
                        ) : (
                            <td key={item.id + key} className="px-1 py-3">
                                <TextInput
                                    form="update_user_form"
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
                        )
                    )}
                    <td className="px-1 py-2 text-center">
                        <form onSubmit={handleSave} id="update_user_form">
                            <button
                                form="update_user_form"
                                onClick={() => setEditingItem(item)}
                                className="font-medium text-gray-600 hover:text-blue-700"
                            >
                                Guardar
                            </button>
                        </form>
                    </td>
                    <td className="px-1 pr-5 py-2 text-center">
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
                    {Object.keys(columns).map((key) =>
                        key === "type" ? (
                            <td key={item.id + key} className="px-1 py-4">
                                {item.typeString}
                            </td>
                        ) : (
                            <td key={item.id + key} className="px-1 py-4">
                                {item[key]}
                            </td>
                        )
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

export default UsersAdminTableRow;
