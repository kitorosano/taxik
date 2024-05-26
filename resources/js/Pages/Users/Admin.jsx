import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import ContactsAdminTable from "./Partials/UsersAdminTable";
import Pagination from "@/Components/Pagination";

const columns = {
    name: "nombre",
    email: "correo",
    type: "tipo",
};

function Admin({ auth, users }) {
    const { data, setData, processing } = useForm({
        name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.name === "") return router.get(route("users.index"));

        const params = {
            n: data.name,
        };
        router.get(route("users.index", params));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <form onSubmit={handleSubmit}>
                    <div className="flex text-gray-900 py-4">
                        <div className="flex justify-between w-full">
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                Gestiona todos los usuarios
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
                                placeholder="Nombre..."
                            />
                            <PrimaryButton disabled={processing}>
                                Buscar
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
                        <ContactsAdminTable items={users.data} columns={columns} />
                    </div>

                    <Pagination meta={users.meta} links={users.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Admin;
