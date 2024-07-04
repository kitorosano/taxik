import ConfirmModal from "@/Components/ConfirmModal";
import Pagination from "@/Components/Pagination";
import TabsNavigation from "@/Components/TabsNavigation";
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

const tabLabels = ["Todos los validados", "Pendientes por validar"];

function Admin({
    auth,
    validatedContacts,
    notValidatedContacts,
    filters,
    companies,
}) {
    const [creatingItem, setCreatingItem] = useState(false);
    const [selectedContactToDelete, setSelectedContactToDelete] =
        useState(null);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleCreate = () => {
        setCreatingItem((prev) => !prev);
        setSelectedIndex(0);
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
            <div className="relative py-6 pb-0">
                <TabsNavigation
                    className="max-w-7xl mx-auto sm:px-6 lg:px-8"
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    tabLabels={tabLabels}
                    navClassName="max-w-7xl mx-auto sm:px-6 lg:px-8 pb-2 gap-3"
                >
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <ContactsAdminTable
                                items={validatedContacts.data}
                                columns={columns}
                                companies={companies.data}
                                creatingItem={creatingItem}
                                setCreatingItem={setCreatingItem}
                                setSelectedContact={setSelectedContactToDelete}
                            />
                        </div>

                        <Pagination
                            meta={validatedContacts.meta}
                            links={validatedContacts.links}
                        />
                    </div>

                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <ContactsAdminTable
                                items={notValidatedContacts.data}
                                columns={columns}
                                companies={companies.data}
                                setSelectedContact={setSelectedContactToDelete}
                            />
                        </div>

                        <Pagination
                            meta={notValidatedContacts.meta}
                            links={notValidatedContacts.links}
                        />
                    </div>
                </TabsNavigation>
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
