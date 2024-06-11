import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@moraki/inertia-react";
import TravelOrdersClientTable from "./partials/TravelOrdersClientTable";

const columns = {
    status: "Estado",
    origin: "Origen",
    address: "Destino",
    departureDate: "Salida",
    estimatedArrivalDate: "Llegada Prevista",
};

function Index({ auth, orders }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center text-gray-900 py-4">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Mostrando tu historial de reservas de viajes
                    </h2>
                </div>
            }
        >
            <Head title="Historial de reservas" />
            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <TravelOrdersClientTable
                            items={orders.data}
                            columns={columns}
                        />
                    </div>

                    <Pagination meta={orders.meta} links={orders.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
