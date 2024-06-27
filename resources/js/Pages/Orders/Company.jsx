import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@moraki/inertia-react";
import { useEffect, useState } from "react";
import TravelOrderCompanyModal from "./Partials/TravelOrderCompanyModal";
import TravelOrdersCompanyFilters from "./Partials/TravelOrdersCompanyFilters";
import TravelOrdersCompanyTable from "./Partials/TravelOrdersCompanyTable";

const columns = {
    client: "Cliente",
    origin: "Origen",
    address: "Destino",
    departureDate: "Salida",
    status: "Estado",
};

function Company({ auth, orders, taxis, filters }) {
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        if (selectedOrder) {
            const updatedSelectedOrder = orders.data.find(
                (o) => o.id === selectedOrder.id
            );
            setSelectedOrder(updatedSelectedOrder);
        }
    }, [orders]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<TravelOrdersCompanyFilters filters={filters} />}
        >
            <Head title="Solicitudes de viajes" />
            <div className="py-10 pb-0">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <TravelOrdersCompanyTable
                            items={orders.data}
                            columns={columns}
                            setSelectedOrder={setSelectedOrder}
                        />
                    </div>

                    <Pagination meta={orders.meta} links={orders.links} />
                </div>
            </div>

            <TravelOrderCompanyModal
                selectedOrder={selectedOrder}
                onClose={() => setSelectedOrder(null)}
                taxis={taxis}
            />
        </AuthenticatedLayout>
    );
}

export default Company;
