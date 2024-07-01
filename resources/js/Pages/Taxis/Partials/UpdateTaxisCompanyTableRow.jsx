import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { useForm } from "@moraki/inertia-react";

function UpdateTaxisCompanyTableRow({ item, setEditingItem }) {
    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        driver_name: item.driver_name,
        driver_picture: item.driver_picture,
        car_registration: item.car_registration,
        car_model: item.car_model,
    });

    const isAvailable = item.is_available ? "Disponible" : "Ocupado";

    const statusColors = {
        Disponible: "bg-green-100 text-green-800",
        Ocupado: "bg-red-100 text-red-800",
    }[isAvailable];

    const handlePictureChange = (e) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            setData("driver_picture", e.target.result);
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSave = (e) => {
        e.preventDefault();

        patch(route("taxis.update", item.id), {
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
            <td className="px-6 py-2">
                <TextInput
                    form="update_taxi_form"
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

            <td className="px-1 py-3">
                <TextInput
                    form="update_taxi_form"
                    name={"driver_name"}
                    value={data.driver_name}
                    onChange={handleChange}
                    className="w-full px-2 py-1 text-gray-900 text-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                ></TextInput>
                <InputError message={errors.driver_name} withSpace />
            </td>

            <td className="px-1 py-3">
                <TextInput
                    form="update_taxi_form"
                    name="car_model"
                    value={data.car_model}
                    onChange={handleChange}
                    className="w-full px-2 py-1 text-gray-900 text-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                ></TextInput>
                <InputError message={errors.car_model} withSpace />
            </td>

            <td className="px-1 py-3">
                <TextInput
                    form="update_taxi_form"
                    name="car_registration"
                    value={data.car_registration}
                    onChange={handleChange}
                    className="w-full px-2 py-1 text-gray-900 text-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                ></TextInput>
                <InputError message={errors.car_registration} withSpace />
            </td>

            <td className="px-1 py-4">
                <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors}`}
                >
                    {isAvailable}
                </span>
                <InputError withSpace />
            </td>

            <td className="px-1 py-2 text-center">
                <form onSubmit={handleSave} id="update_taxi_form">
                    <button
                        form="update_taxi_form"
                        className="font-medium text-gray-600 hover:text-blue-700"
                    >
                        Guardar
                    </button>
                </form>
                <InputError withSpace />
            </td>
            <td className="px-1 pr-5 py-2 text-center">
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

export default UpdateTaxisCompanyTableRow;
