import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@moraki/inertia-react";
import { useState } from "react";
import ContactsAdminFilters from "./Partials/ContactsAdminFilters";
import ContactsAdminTable from "./Partials/ContactsAdminTable";

const columns = {
    name: "Nombre",
    phone: "Teléfono",
    address: "Dirección",
    department: "Departamento",
    companyName: "Empresa Asociada",
};

function Admin({ auth, contacts, filters, companies }) {
    const [creatingItem, setCreatingItem] = useState(false);

    const handleCreate = () => {
        setCreatingItem((prev) => !prev);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <ContactsAdminFilters
                    filters={filters}
                    columns={columns}
                    handleCreate={handleCreate}
                />
            }
        >
            <Head title="Contactos" />
            <div className="py-10 pb-0">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <ContactsAdminTable
                            items={contacts.data}
                            columns={columns}
                            companies={companies.data}
                            creatingItem={creatingItem}
                            setCreatingItem={setCreatingItem}
                        />
                    </div>

                    <Pagination meta={contacts.meta} links={contacts.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Admin;
