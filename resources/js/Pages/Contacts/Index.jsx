import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { objectToArray, removeEmptyValues } from "@/Utils/functions";
import { Head, router, useForm } from "@moraki/inertia-react";
import debounce from "just-debounce-it";
import { useCallback } from "react";

function Index({ auth, contacts, filters }) {
    const { data, setData } = useForm({
        department: filters.department || "",
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
                router.get(route("contacts.index"));
                return;
            }

            const transformedData = removeEmptyValues(realData);
            router.visit(route("contacts.index"), {
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
                            Mostrando taxis de tu departamento
                        </h2>
                    </div>
                    <div className="flex justify-end w-full">
                        <TextInput
                            name="department"
                            className="max-w-96 ml-auto mr-2 text-black"
                            value={data.department}
                            onChange={handleChange}
                            autoFocus
                            placeholder="Departamento..."
                        />
                    </div>
                </div>
            }
        >
            <Head title="Contactos" />
            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {contacts.data.map((contact) => (
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
                                                {contact.address} -{" "}
                                                {contact.department}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Pagination meta={contacts.meta} links={contacts.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export default Index;
