import ConfirmModal from "@/Components/ConfirmModal";
import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@moraki/inertia-react";
import { useState } from "react";
import UsersAdminFilters from "./Partials/UsersAdminFilters";
import UsersAdminTable from "./Partials/UsersAdminTable";

const columns = {
    name: "Nombre",
    email: "Correo",
    type: "Tipo",
};

function Admin({ auth, users, filters }) {
    const { data, setData, errors } = useForm({
        name: filters.name ?? "",
        email: filters.email ?? "",
    });

    const [selectedUserToDelete, setSelectedUserToDelete] = useState(null);

    const handleDelete = (user) => {
        router.delete(route("users.destroy", user.id), {
            onFinish: () => setSelectedUserToDelete(false),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <UsersAdminFilters
                    data={data}
                    setData={setData}
                    errors={errors}
                />
            }
        >
            <Head title="Contactos" />
            <div className="py-10 pb-0">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <UsersAdminTable
                            items={users.data}
                            columns={columns}
                            setSelectedUser={setSelectedUserToDelete}
                        />
                    </div>

                    <Pagination meta={users.meta} links={users.links} />
                </div>
            </div>

            <ConfirmModal
                show={!!selectedUserToDelete}
                onClose={() => setSelectedUserToDelete(false)}
                title={"¿Estás seguro que deseas eliminar este usuario?"}
                cancelText="No, Cancelar"
                cancelOnClick={() => setSelectedUserToDelete(false)}
                confirmText="Sí, Eliminar"
                confirmOnClick={() => handleDelete(selectedUserToDelete)}
            />
        </AuthenticatedLayout>
    );
}

export default Admin;
