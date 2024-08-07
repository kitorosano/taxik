function TaxisCompanyTableRow({
    item,
    setEditingItem,
    setViewingPicture,
    setSelectedTaxi,
}) {
    const isAvailable = item.is_available ? "Disponible" : "Ocupado";

    const statusColors = {
        Disponible: "bg-green-100 text-green-800",
        Ocupado: "bg-red-100 text-red-800",
    }[isAvailable];

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

            <td className="px-1 py-4">
                <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors}`}
                >
                    {isAvailable}
                </span>
            </td>

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
                    onClick={() => setSelectedTaxi(item)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
}

export default TaxisCompanyTableRow;
