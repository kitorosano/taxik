import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        type: 1,
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Registrarme" />

            <form onSubmit={submit}>
                <div className="mt-4 flex justify-center m-auto gap-6">
                    <div className="flex items-center justify-center gap-2">
                        <TextInput
                            id="type_client"
                            type="radio"
                            name="type"
                            value={"1"}
                            checked={data.type === "1"}
                            onChange={(e) => setData("type", e.target.value)}
                            required
                        />
                        <InputLabel htmlFor="type_client" value="Cliente" />
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <TextInput
                            id="type_company"
                            type="radio"
                            name="type"
                            value={"2"}
                            checked={data.type === "2"}
                            onChange={(e) => setData("type", e.target.value)}
                            required
                        />
                        <InputLabel htmlFor="type_company" value="Empresa" />
                    </div>
                    <InputError message={errors.type} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Correo" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirmar Contraseña"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4">
                    <PrimaryButton className="w-full" disabled={processing}>
                        <span className="block w-full text-center">
                            Registrarme
                        </span>
                    </PrimaryButton>
                </div>

                <div className="flex items-center justify-center mt-4">
                    <span className="text-sm text-gray-600 mr-1">
                        ¿Ya tienes una cuenta?
                    </span>
                    <Link
                        href={route("login")}
                        className="text-sm text-blue-600 hover:text-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Inicia sesión
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
