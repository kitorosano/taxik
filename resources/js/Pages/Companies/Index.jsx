import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";

function Index({ auth, companies }) {
    const { data, setData, processing } = useForm({
        name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.name === "") return router.get(route("companies.index"));

        const params = {
            n: data.name,
        };
        router.get(route("companies.index", params));
    };

    console.log(companies[0]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center text-gray-900 py-4">
                        <div className="flex justify-between w-full">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                Reserva tu viaje en taxi con estas empresas
                            </h2>
                        </div>
                        <div className="flex justify-between w-full">
                            <TextInput
                                id="name"
                                className="max-w-96 ml-auto mr-2 text-black"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                autoFocus
                                placeholder="Buscar por nombre..."
                            />
                            <PrimaryButton disabled={processing}>
                                Buscar
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            }
        >
            <Head title="Reservar Viaje" />
            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {companies.map((company) => (
                                    <div
                                        key={company.id}
                                        className="bg-white overflow-hidden shadow-sm sm:rounded-lg hover:shadow-md"
                                    >
                                        {company.contact ? (
                                            <div className="px-4 py-2 flex flex-col items-center text-center">
                                                <p className="font-bold uppercase">
                                                    {company.name}
                                                </p>
                                                <p className="text-xl">
                                                    {company.contact.name}
                                                </p>
                                                <p className="text-xs">
                                                    {company.contact.department}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="px-4 py-2 flex flex-col items-center text-center">
                                                <p className="font-bold uppercase">
                                                    {company.name}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
