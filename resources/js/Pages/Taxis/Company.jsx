import Modal from "@/Components/Modal";
import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@moraki/inertia-react";
import { useState } from "react";
import TaxisCompanyFilters from "./Partials/TaxisCompanyFilters";
import TaxisCompanyTable from "./Partials/TaxisCompanyTable";

const columns = {
    driver_picture: "Foto Chofer",
    driver_name: "Nombre Chofer",
    car_model: "Modelo Coche",
    car_registration: "Matricula Coche",
};

function Company({ auth, taxis, filters }) {
    const [creatingItem, setCreatingItem] = useState(false);
    const [viewingPicture, setViewingPicture] = useState(null);

    const handleCreate = () => {
        setCreatingItem((prev) => !prev);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <TaxisCompanyFilters
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
                        <TaxisCompanyTable
                            userId={auth.user.id}
                            items={taxis.data}
                            columns={columns}
                            creatingItem={creatingItem}
                            setCreatingItem={setCreatingItem}
                            setViewingPicture={setViewingPicture}
                        />
                    </div>

                    <Pagination meta={taxis.meta} links={taxis.links} />
                </div>
            </div>

            <Modal
                show={!!viewingPicture}
                maxWidth="xs"
                onClose={() => setViewingPicture(null)}
            >
                <div className="p-4">
                    <img
                        src={viewingPicture}
                        alt="Foto Chofer"
                        className="w-full h-full"
                    />
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}

export default Company;
