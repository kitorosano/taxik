import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { useForm } from "@moraki/inertia-react";
import DefaultAvatar from "/resources/assets/img/default-avatar.png";

function CreateTaxisCompanyTableRow({ userId, columns, setCreatingItem }) {
    const { data, setData, post, clearErrors, reset, errors } = useForm({
        company_id: userId,
        driver_name: "",
        driver_picture: DefaultAvatar,
        car_registration: "",
        car_model: "",
    });

    const handlePictureChange = (e) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            setData("driver_picture", e.target.result);
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("taxis.store"), {
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

    const { driver_picture, ...columnsToCreate } = columns;

    return (
        <tr className="bg-white border-b">
            <td className="px-6 py-2">
                <TextInput
                    form="create_taxi_form"
                    type="file"
                    id="driver_picture"
                    name="driver_picture"
                    className="hidden"
                    onChange={(e) => handlePictureChange(e)}
                />
                <label htmlFor="driver_picture">
                    <img
                        src={data.driver_picture}
                        alt="Foto chofer"
                        className="w-14 h-14 rounded-full hover:opacity-75 hover:cursor-pointer"
                        width={14}
                    />
                </label>
                <InputError message={errors.driver_picture} className="mt-2" />
            </td>

            {Object.keys(columnsToCreate).map((key) => (
                <td key={"new" + key} className="px-2 py-4">
                    <TextInput
                        form="create_taxi_form"
                        name={key}
                        value={data[key]}
                        onChange={(e) => setData(key, e.target.value)}
                        className="w-full px-2 py-1 text-gray-900 text-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    />
                    <InputError message={errors[key]} className="mt-2" />
                </td>
            ))}

            <td className="py-2 text-center">
                <form onSubmit={handleSubmit} id="create_taxi_form">
                    <button
                        form="create_taxi_form"
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

export default CreateTaxisCompanyTableRow;
