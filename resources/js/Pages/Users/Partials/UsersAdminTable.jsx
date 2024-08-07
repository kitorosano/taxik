import { useState } from "react";
import UpdateUsersAdminTableRow from "./UpdateUsersAdminTableRow";
import UsersAdminTableRow from "./UsersAdminTableRow";

function UsersAdminTable({ items, columns, setSelectedUser }) {
    const [editingItem, setEditingItem] = useState(null);

    if (items.length === 0) {
        return (
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="px-4 py-2 text-center">
                    <p className="text-gray-500">
                        No se encontraron usuarios para mostrar
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="pl-6 py-3">
                            Identificador
                        </th>
                        {Object.entries(columns).map(([key, value]) => (
                            <th key={key} scope="col" className="px-3 py-3">
                                {value}
                            </th>
                        ))}
                        <th scope="col" className="px-1 py-3"></th>
                        <th scope="col" className="px-1 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) =>
                        editingItem?.id === item.id ? (
                            <UpdateUsersAdminTableRow
                                key={item.id}
                                item={item}
                                setEditingItem={setEditingItem}
                            />
                        ) : (
                            <UsersAdminTableRow
                                key={item.id}
                                item={item}
                                setEditingItem={setEditingItem}
                                setSelectedUser={setSelectedUser}
                            />
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default UsersAdminTable;
