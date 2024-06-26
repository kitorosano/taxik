import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { removeEmptyValues } from "@/Utils/functions";
import { router, useForm } from "@moraki/inertia-react";

function CreateContactsAdminTableRow({ columns, setCreatingItem }) {
    const { data, setData, clearErrors, reset, errors } = useForm({
        name: "",
        phone: "",
        address: "",
        department: "",
        linked_company_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const transformedData = removeEmptyValues({
            ...data,
            linked_company_id: Number(data.linked_company_id),
        });

        router.post(route("contacts.store"), transformedData, {
            onSuccess: () => {
                handleCancel();
            },
            preserveScroll: true,
        });
    };

    const handleCancel = () => {
        setCreatingItem(false);
        reset();
        clearErrors();
    };
    return (
        <tr className="bg-white border-b">
            <th
                scope="row"
                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
            >
                Nuevo Contacto
            </th>
            {Object.keys(columns).map((key) => (
                <td key={"new" + key} className="px-1 py-4">
                    <TextInput
                        form="create_contact_form"
                        name={key}
                        value={data[key]}
                        onChange={(e) => setData(key, e.target.value)}
                        className="px-2 py-1 text-gray-900 text-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    ></TextInput>
                    <InputError message={errors[key]} className="mt-2" />
                </td>
            ))}

            <td className="py-2 text-center">
                <form onSubmit={handleSubmit} id="create_contact_form">
                    <button
                        form="create_contact_form"
                        className="font-medium text-gray-600 hover:text-blue-700"
                    >
                        Guardar
                    </button>
                </form>
            </td>
            <td className="py-2 text-center">
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

export default CreateContactsAdminTableRow;
