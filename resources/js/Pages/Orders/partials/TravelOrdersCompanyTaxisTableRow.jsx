function TravelOrdersCompanyTaxisTableRow({ item, setSelectedItem }) {
    const isAvailable = item.is_available ? "Disponible" : "Ocupado";

    const statusColors = {
        Disponible: "bg-green-100 text-green-800",
        Ocupado: "bg-red-100 text-red-800",
    }[isAvailable];

    return (
        <tr
            className="bg-white border-b items-center hover:bg-gray-100 hover:cursor-pointer"
            onClick={() => setSelectedItem(item)}
        >
            <th className="px-6 py-2">
                <img
                    src={item.driver_picture}
                    alt="Foto Chofer"
                    width={10}
                    className="w-10 h-10 rounded-full hover:opacity-75 hover:cursor-pointer"
                />
            </th>

            <td className="px-2 py-4">{item.driver_name}</td>

            <td className="px-2 py-4">
                {item.car_model} - {item.car_registration}
            </td>

            <td className="px-2 py-4">
                <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors}`}
                >
                    {isAvailable}
                </span>
            </td>
        </tr>
    );
}

export default TravelOrdersCompanyTaxisTableRow;
