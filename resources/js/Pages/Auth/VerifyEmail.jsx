import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@moraki/inertia-react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <GuestLayout title="Verificar Correo">
            <Head title="Verificacion de correo" />

            <div className="mb-4 text-sm text-gray-600 w-full">
                Gracias por registrarte! Antes de comenzar, ¿podrías verificar
                tu dirección de correo electrónico haciendo clic en el enlace
                que acabamos de enviarte por correo electrónico?
            </div>
            <div className="mb-4 text-sm text-gray-600 w-full">
                Si no recibiste el correo electrónico, con gusto te enviaremos
                otro.
            </div>

            {status === "verification-link-sent" && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    Un nuevo enlace de verificación ha sido enviado a la
                    dirección de correo electrónico que proporcionaste
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <PrimaryButton disabled={processing}>
                        Reenviar Correo de Verificación
                    </PrimaryButton>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cerrar Sesión
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
