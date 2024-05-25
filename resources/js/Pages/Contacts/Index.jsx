import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";

function Index({ auth, contacts }) {
    const { data, setData, processing } = useForm({
        department: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.department === "") return router.get(route("contacts.index"));

        const params = {
            d: data.department,
        };
        router.get(route("contacts.index", params));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center text-gray-900 py-6">
                        <div className="flex justify-between w-full">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                Mostrando taxis de tu departamento
                            </h2>
                        </div>
                        <div className="flex justify-between w-full">
                            <TextInput
                                id="location"
                                className="max-w-96 ml-auto mr-2 text-black"
                                value={data.department}
                                onChange={(e) =>
                                    setData("department", e.target.value)
                                }
                                autoFocus
                                placeholder="Ingresa tu departamento"
                            />
                            <PrimaryButton disabled={processing}>
                                Buscar Taxis
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            }
        >
            <Head title="Contactos" />
            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {contacts.map((contact) => (
                                    <div
                                        key={contact.id}
                                        className="bg-white overflow-hidden shadow-sm sm:rounded-lg hover:shadow-md"
                                    >
                                        <div className="px-4 py-2 flex flex-col items-center text-center">
                                            <p className="font-bold uppercase">
                                                {contact.name}
                                            </p>
                                            <p className="text-xl">
                                                {contact.phone}
                                            </p>
                                            <p className="text-xs">
                                                {contact.address} - {contact.department}
                                            </p>
                                        </div>
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
