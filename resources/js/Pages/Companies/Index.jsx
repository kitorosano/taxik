import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { objectToArray, removeEmptyValues } from "@/Utils/functions";
import { Head, router, useForm } from "@inertiajs/react";
import debounce from "just-debounce-it";
import { useCallback } from "react";
import CompaniesGrid from "./Partials/CompaniesGrid";
import FavoriteCompaniesList from "./Partials/FavoriteCompaniesList";

function Index({ auth, companies, favoriteCompanies, filters }) {
    const { data, setData } = useForm({
        name: filters.name || "",
        favorites: filters.favorites || false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
        searchWithFilters(name, value);
    };

    const searchWithFilters = useCallback(
        debounce((name, value) => {
            const realData = { ...data, [name]: value };
            const arrayParams = objectToArray(realData);

            if (arrayParams.every((v) => v === "")) {
                router.get(route("companies.index"));
                return;
            }

            const transformedData = removeEmptyValues(realData);
            router.visit(route("companies.index"), {
                data: transformedData,
                preserveState: true,
                replace: true,
            });
        }, 300),
        [data]
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center text-gray-900 py-4">
                    <div className="flex justify-between w-full">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Reserva tu viaje en taxi con estas empresas
                        </h2>
                    </div>
                    <div className="flex justify-end w-full">
                        <TextInput
                            name="name"
                            className="max-w-96 ml-auto mr-2 text-black"
                            value={data.name}
                            onChange={handleChange}
                            autoFocus
                            placeholder="Nombre..."
                        />
                    </div>
                </div>
            }
        >
            <Head title="Reservar Viaje" />
            <div className="py-10">
                {favoriteCompanies.data.length > 0 && (
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight p-4 ml-2">
                                Favoritos
                            </h2>
                            <FavoriteCompaniesList companies={favoriteCompanies.data} />
                        </div>
                    </div>
                )}

                <div className="mt-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight p-4 ml-2">
                            Empresas
                        </h2>
                        <CompaniesGrid companies={companies.data} />
                    </div>

                    <Pagination meta={companies.meta} links={companies.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
