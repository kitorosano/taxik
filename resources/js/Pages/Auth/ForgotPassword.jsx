import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@moraki/inertia-react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout title="Restablecer contraseña">
            <Head title="Forgot Password" />

            <p className="mb-4 text-sm text-gray-600 w-full">
                ¿Olvidaste tu contraseña? No hay problema.
            </p>
            <p className="mb-4 text-sm text-gray-600 w-full">
                Solo dinos tu dirección de correo electrónico y te enviaremos un
                enlace de restablecimiento de contraseña por correo electrónico
                que te permitirá elegir uno nuevo.
            </p>

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className={"mt-1 block w-full " + (errors.email && "border-red-500")}
                    isFocused={true}
                    onChange={(e) => setData("email", e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Enviar enlace para restablecer contraseña
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
