import TravelOrdersCompanyTableRow from "./TravelOrdersCompanyTableRow";

function TravelOrdersCompanyTable({ items, columns }) {
    if (items.length === 0) {
        return (
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="px-4 py-2 text-center">
                    <p className="text-gray-500">
                        No se encontraron reservas para mostrar
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Identificador
                        </th>
                        {Object.entries(columns).map(([key, value]) => (
                            <th key={key} scope="col" className="px-3 py-3">
                                {value}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <TravelOrdersCompanyTableRow
                            key={item.id}
                            item={item}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TravelOrdersCompanyTable;
