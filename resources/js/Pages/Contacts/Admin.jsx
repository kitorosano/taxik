import ConfirmModal from "@/Components/ConfirmModal";
import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@moraki/inertia-react";
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
    const [selectedContactToDelete, setSelectedContactToDelete] =
        useState(null);

    const handleCreate = () => {
        setCreatingItem((prev) => !prev);
    };

    const handleDelete = (contact) => {
        router.delete(route("contacts.destroy", contact.id), {
            onFinish: () => setSelectedContactToDelete(false),
        });
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
                            setSelectedContact={setSelectedContactToDelete}
                        />
                    </div>

                    <Pagination meta={contacts.meta} links={contacts.links} />
                </div>
            </div>

            <ConfirmModal
                show={!!selectedContactToDelete}
                onClose={() => setSelectedContactToDelete(false)}
                title={"¿Estás seguro que deseas eliminar este contacto?"}
                cancelText="No, Cancelar"
                cancelOnClick={() => setSelectedContactToDelete(false)}
                confirmText="Sí, Eliminar"
                confirmOnClick={() => handleDelete(selectedContactToDelete)}
            />
        </AuthenticatedLayout>
    );
}

export default Admin;
