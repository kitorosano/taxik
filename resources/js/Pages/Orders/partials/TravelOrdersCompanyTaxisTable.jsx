import TravelOrdersCompanyTaxisTableRow from "./TravelOrdersCompanyTaxisTableRow";

function TravelOrdersCompanyTaxisTable({ items, columns, setSelectedItem }) {
    if (items.length === 0) {
        return (
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="px-4 py-2 text-center">
                    <p className="text-gray-500">
                        Todavia no has agregado ningún taxi
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        {Object.entries(columns).map(([key, value], index) => (
                            <th
                                key={key}
                                scope="col"
                                className={
                                    index === 0 ? "px-6 py-3" : "px-3 py-3"
                                }
                            >
                                {value}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <TravelOrdersCompanyTaxisTableRow
                            key={item.id}
                            item={item}
                            setSelectedItem={setSelectedItem}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TravelOrdersCompanyTaxisTable;
