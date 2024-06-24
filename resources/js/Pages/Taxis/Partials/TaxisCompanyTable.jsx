import { useState } from "react";
import CreateTaxisCompanyTableRow from "./CreateTaxisCompanyTableRow";
import TaxisCompanyTableRow from "./TaxisCompanyTableRow";
import UpdateTaxisCompanyTableRow from "./UpdateTaxisCompanyTableRow";

function TaxisCompanyTable({
    userId,
    items,
    columns,
    creatingItem,
    setCreatingItem,
    setViewingPicture
}) {
    const [editingItem, setEditingItem] = useState(null);

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
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                        <th scope="col" className="px-1 py-3"></th>
                        <th scope="col" className="px-1 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {creatingItem && (
                        <CreateTaxisCompanyTableRow
                            userId={userId}
                            columns={columns}
                            setCreatingItem={setCreatingItem}
                        />
                    )}
                    {items.map((item) =>
                        editingItem?.id === item.id ? (
                            <UpdateTaxisCompanyTableRow
                                key={item.id}
                                item={item}
                                setEditingItem={setEditingItem}
                            />
                        ) : (
                            <TaxisCompanyTableRow
                                key={item.id}
                                item={item}
                                setEditingItem={setEditingItem}
                                setViewingPicture={setViewingPicture}
                            />
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TaxisCompanyTable;
