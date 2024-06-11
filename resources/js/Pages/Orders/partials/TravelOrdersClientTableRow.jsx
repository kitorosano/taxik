import { travelOrderStatusSpanClasses } from "@/Utils/constants";

function TravelOrdersClientTableRow({ item }) {
    const statusColors = travelOrderStatusSpanClasses[item.status];

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
