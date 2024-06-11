import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@moraki/inertia-react";
import UsersAdminFilters from "./Partials/UsersAdminFilters";
import ContactsAdminTable from "./Partials/UsersAdminTable";

const columns = {
    name: "Nombre",
    email: "Correo",
    type: "Tipo",
};

function Admin({ auth, users, filters }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<UsersAdminFilters filters={filters} columns={columns} />}
        >
            <Head title="Contactos" />
            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <ContactsAdminTable
                            items={users.data}
                            columns={columns}
                        />
                    </div>

                    <Pagination meta={users.meta} links={users.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Admin;
