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
                <InputError message={errors.driver_picture} />
            </td>

            <td className="px-2 py-4">
                <TextInput
                    form="create_taxi_form"
                    name={"driver_name"}
                    value={data.driver_name}
                    onChange={(e) => setData("driver_name", e.target.value)}
                    className={
                        "w-full px-2 py-1 text-gray-900 text-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm " +
                        (errors.driver_name && "border-red-500")
                    }
                />
                <InputError message={errors.driver_name} withSpace />
            </td>

            <td className="px-2 py-4">
                <TextInput
                    form="create_taxi_form"
                    name={"car_model"}
                    value={data.car_model}
                    onChange={(e) => setData("car_model", e.target.value)}
                    className={
                        "w-full px-2 py-1 text-gray-900 text-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm " +
                        (errors.car_model && "border-red-500")
                    }
                />
                <InputError message={errors.car_model} withSpace />
            </td>

            <td className="px-2 py-4">
                <TextInput
                    form="create_taxi_form"
                    name={"car_registration"}
                    value={data.car_registration}
                    onChange={(e) =>
                        setData("car_registration", e.target.value)
                    }
                    className={
                        "w-full px-2 py-1 text-gray-900 text-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm " +
                        (errors.car_registration && "border-red-500")
                    }
                />
                <InputError message={errors.car_registration} withSpace />
            </td>

            <td className="px-1 py-4">
                <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}
                >
                    Disponible
                </span>
                <InputError withSpace />
            </td>

            <td className="py-2 text-center">
                <form onSubmit={handleSubmit} id="create_taxi_form">
                    <button
                        form="create_taxi_form"
                        className="font-medium text-gray-600 hover:text-blue-700"
                    >
                        Guardar
                    </button>
                </form>
                <InputError withSpace />
            </td>
            <td className="py-2 text-center">
                <button
                    type="button"
                    className="font-medium text-gray-600 hover:text-red-700"
                    onClick={handleCancel}
                >
                    Cancelar
                </button>
                <InputError withSpace />
            </td>
        </tr>
    );
}

export default CreateTaxisCompanyTableRow;
