function TravelOrdersClientTableRow({ item }) {
    const statusColors = {
        Pendiente: "bg-orange-100 text-orange-800",
        Aprobado: "bg-blue-100 text-blue-800",
        Rechazado: "bg-red-100 text-red-800",
        Completado: "bg-green-100 text-green-800",
        Cancelado: "bg-red-100 text-red-800",
    }[item.status];

    return (
        <tr className="bg-white border-b items-center">
            <td className="px-6 py-4">
                <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors}`}
                >
                    {item.status}
                </span>
            </td>

            <td className="px-1 py-4">{item.company}</td>

            <td className="px-1 py-4">{item.origin}</td>

            <td className="px-1 py-4">{item.destination}</td>

            <td className="px-1 py-4">${item.price}</td>

            <td className="px-1 py-4">{item.departureDate}</td>

            <td className="px-1 py-4">{item.estimatedArrivalDate}</td>
        </tr>
    );
}

export default TravelOrdersClientTableRow;
