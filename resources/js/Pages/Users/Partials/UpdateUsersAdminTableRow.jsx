import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { useForm } from "@moraki/inertia-react";

function UpdateUsersAdminTableRow({ item, setEditingItem }) {
    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        name: item.name,
        email: item.email,
        type: item.type,
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSave = (e) => {
        e.preventDefault();

        patch(route("users.update", editingItem.id), {
            onSuccess: () => handleCancel(),
            preserveScroll: true,
        });
    };

    const handleCancel = () => {
        setEditingItem(null);
        reset();
        clearErrors();
    };

    return (
        <tr key={item.id} className="bg-white border-b items-center">
            <th
                scope="row"
                className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap"
            >
                #{item.id}
            </th>

            <td className="px-1 py-3">
                <TextInput
                    form="update_user_form"
                    name={"name"}
                    value={data.name}
                    onChange={handleChange}
                    className="w-full px-2 py-1 text-gray-900 text-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                ></TextInput>
                <InputError message={errors.name} className="mt-2" />
            </td>

            <td className="px-1 py-3">
                <TextInput
                    form="update_user_form"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    className="w-full px-2 py-1 text-gray-900 text-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                ></TextInput>
                <InputError message={errors.email} className="mt-2" />
            </td>

            <td className="px-1 py-4">{item.type}</td>

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
        </tr>
    );
}

export default UpdateUsersAdminTableRow;
