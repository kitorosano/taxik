function Table({ items, columns, primary, action }) {
    const entries = Object.entries(columns);

    return (
        <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr>
                        {primary && (
                            <th scope="col" className="px-6 py-3">
                                {primary}
                            </th>
                        )}
                        {entries.map(([key, value]) => (
                            <th key={key} scope="col" className="px-6 py-3">
                                {value}
                            </th>
                        ))}
                        {action && <th scope="col" className="px-6 py-3"></th>}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} className="bg-white border-b">
                            {primary && (
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    #{item.id}
                                </th>
                            )}
                            {entries.map(([key, value]) => (
                                <td key={key} className="px-6 py-4">
                                    {item[key]}
                                </td>
                            ))}
                            {action && (
                                <td className="px-6 py-4">
                                    <a
                                        href={route(action, item.id)}
                                        className="font-medium text-blue-600"
                                    >
                                        Ver detalles
                                    </a>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
