function UsersAdminTableRow({ item, setEditingItem, setSelectedUser }) {
    return (
        <tr key={item.id} className="bg-white border-b items-center">
            <th
                scope="row"
                className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap"
            >
                #{item.id}
            </th>
            <td className="px-1 py-4">{item.name}</td>

            <td className="px-1 py-4">{item.email}</td>

            <td className="px-1 py-4">{item.type}</td>

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
                    onClick={() => setSelectedUser(item)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
}

export default UsersAdminTableRow;
