import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import ContactsAdminTable from "./Partials/ContactsAdminTable";

const columns = {
    name: "nombre",
    phone: "telefono",
    address: "dirección",
    linked_company_id: "compañia asociada",
};

function Admin({ auth, contacts }) {
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
                                Gestiona los contactos de todos los taxis
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
                                placeholder="Buscar por departamento"
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
                        <ContactsAdminTable
                            items={contacts}
                            columns={columns}
                            primary="Identificador"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Admin;
