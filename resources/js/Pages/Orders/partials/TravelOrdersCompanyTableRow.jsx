import dayjs from "dayjs";
import "dayjs/locale/es";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.locale("es");
dayjs.extend(utc);
dayjs.extend(timezone);

function TravelOrdersCompanyTableRow({ item, setSelectedOrder }) {
    const statusColors = {
        Pendiente: "bg-orange-100 text-orange-800",
        Aprobado: "bg-blue-100 text-blue-800",
        Rechazado: "bg-red-100 text-red-800",
        Completado: "bg-green-100 text-green-800",
        Cancelado: "bg-red-100 text-red-800",
    }[item.status];

    const parsedDepartureDate = dayjs(item.departureDate)
        .utcOffset(+3)
        .utc(true)
        .fromNow();

    return (
        <tr className="bg-white border-b items-center">
            <th
                scope="row"
                className="pl-6 py-2 font-medium text-gray-900 whitespace-nowrap"
            >
                #{item.id}
            </th>

            <td className="px-1 py-4">{item.client}</td>

            <td className="px-1 py-4">{item.origin}</td>

            <td className="px-1 py-4">{item.destination}</td>

            <td className="px-1 py-4">{parsedDepartureDate}</td>

            <td className="px-1 py-4">
                <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors}`}
                >
                    {item.status}
                </span>
            </td>

            <td className="py-2 text-center">
                <button
                    className="font-medium text-gray-600 hover:text-blue-700"
                    onClick={() => setSelectedOrder(item)}
                >
                    Ver detalles
                </button>
            </td>
        </tr>
    );
}

export default TravelOrdersCompanyTableRow;
