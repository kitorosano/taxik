import { useForm } from "@inertiajs/react";
import UsersAdminTableRow from "./UsersAdminTableRow";

function UsersAdminTable({ items, columns }) {
    const { data, setData, post, clearErrors, reset, errors } = useForm({
        name: "",
        email: "",
        type: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("users.store"), {
            onSuccess: () => {
                handleCancel();
            },
        });
    };

    const handleCancel = () => {
        reset();
        clearErrors();
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                        <th scope="col" className="px-1 py-3"></th>
                        <th scope="col" className="px-1 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <UsersAdminTableRow
                            key={item.id}
                            item={item}
                            columns={columns}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersAdminTable;
