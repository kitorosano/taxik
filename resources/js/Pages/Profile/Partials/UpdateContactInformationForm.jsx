import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";

export default function UpdateContactInformationForm({
    className = "",
    contact,
}) {
    const user = usePage().props.auth.user;

    const {
        data,
        setData,
        post,
        patch,
        transform,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({
        name: contact?.name || "",
        phone: contact?.phone || "",
        address: contact?.address || "",
        department: contact?.department || "",
    });

    const handleUpdate = (e) => {
        e.preventDefault();

        transform((data) => ({
            ...data,
            department: contact.department, // Prevent changing the department
        }));

        patch(route("contacts.update", contact.id), {
            preserveScroll: true,
        });
    };

    const handleSave = (e) => {
        e.preventDefault();

        transform((data) => ({
            ...data,
            linked_company_id: user.id,
        }));

        post(route("contacts.store"), {
            preserveScroll: true,
            only: ["contact"],
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Información de Contacto
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Actualiza tus datos de contacto para los clientes
                </p>
            </header>

            <form
                onSubmit={contact ? handleUpdate : handleSave}
                id="contact_form"
                className="mt-6 space-y-6"
            ></form>

            <section onSubmit={handleUpdate} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />

                    <TextInput
                        form="contact_form"
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Teléfono" />

                    <TextInput
                        form="contact_form"
                        id="phone"
                        className="mt-1 block w-full"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        required
                        autoComplete="phone"
                    />

                    <InputError className="mt-2" message={errors.phone} />
                </div>

                <div>
                    <InputLabel htmlFor="address" value="Dirección" />

                    <TextInput
                        form="contact_form"
                        id="address"
                        className="mt-1 block w-full"
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                        required
                        autoComplete="address"
                    />

                    <InputError className="mt-2" message={errors.address} />
                </div>

                {contact ? (
                    <div>
                        <InputLabel htmlFor="department" value="Departamento" />

                        <TextInput
                            id="department"
                            className="mt-1 block w-full bg-gray-100 cursor-default text-gray-500"
                            value={data.department}
                            required
                            autoComplete="department"
                            readOnly
                        />

                        <InputError
                            className="mt-2"
                            message={errors.department}
                        />
                    </div>
                ) : (
                    <div>
                        <InputLabel htmlFor="department" value="Departamento" />

                        <TextInput
                            form="contact_form"
                            id="department"
                            className="mt-1 block w-full"
                            value={data.department}
                            onChange={(e) =>
                                setData("department", e.target.value)
                            }
                            required
                            autoComplete="department"
                        />

                        <InputError
                            className="mt-2"
                            message={errors.department}
                        />
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton form="contact_form" disabled={processing}>
                        Guardar
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Guardado!</p>
                    </Transition>
                </div>
            </section>
        </section>
    );
}
