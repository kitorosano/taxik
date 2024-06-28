import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { removeEmptyValues } from "@/Utils/functions";
import { Head, router, useForm } from "@moraki/inertia-react";
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
    const useFormState = useForm({
        id: filters.id || "",
        selected_id: filters.selected_id || "",
        departureDateFrom: filters.departure_date_from || "",
        departureDateTo: filters.departure_date_to || "",
        arrivalDateFrom: filters.arrival_date_from || "",
        arrivalDateTo: filters.arrival_date_to || "",
    });
    const selectedOrder = orders.data.find(
        (o) => o.id === Number(filters.selected_id)
    );

    const handleSelectOrderAndGetAvailableTaxis = (order) => {
        const filterParams = { ...useFormState.data, selectedId: order.id };
        const transformedData = removeEmptyValues(filterParams);
        router.visit(route("travel-order.index"), {
            data: transformedData,
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    const handleOnCloseAndClearSelectedId = () => {
        const filterParams = { ...useFormState.data, selected_id: null };
        const transformedData = removeEmptyValues(filterParams);
        router.visit(route("travel-order.index"), {
            data: transformedData,
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<TravelOrdersCompanyFilters useForm={useFormState} />}
        >
            <Head title="Solicitudes de viajes" />
            <div className="py-10 pb-0">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <TravelOrdersCompanyTable
                            items={orders.data}
                            columns={columns}
                            setSelectedOrder={
                                handleSelectOrderAndGetAvailableTaxis
                            }
                        />
                    </div>

                    <Pagination meta={orders.meta} links={orders.links} />
                </div>
            </div>

            <TravelOrderCompanyModal
                selectedOrder={selectedOrder}
                onClose={handleOnCloseAndClearSelectedId}
                taxis={taxis}
            />
        </AuthenticatedLayout>
    );
}

export default Company;
