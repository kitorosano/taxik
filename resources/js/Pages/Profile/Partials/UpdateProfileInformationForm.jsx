import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@moraki/inertia-react";
import { useRef } from "react";
import DefaultAvatar from "/resources/assets/img/default-avatar.png";

export default function UpdateProfileInformationForm({
    mustVerifyEmail,
    status,
}) {
    const user = usePage().props.auth.user;
    const avatarRef = useRef(null);

    const {
        data,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful,
        progress,
    } = useForm({
        name: user.name,
        email: user.email,
        avatar: user.avatar || "",
        _method: "patch",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("profile.update"), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            setData("avatar", null);
            return;
        }
        // setData("avatar", file);

        const reader = new FileReader();
        reader.onload = (e) => {
            avatarRef.current.src = e.target.result;
            setData("avatar", e.target.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="flex justify-between">
            <section className="max-w-xl w-full">
                <header>
                    <h2 className="text-lg font-medium text-gray-900">
                        Información de Perfil
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Actualiza los datos de tu perfil y dirección de correo
                        electrónico.
                    </p>
                </header>

                <form
                    id="profile-info-form"
                    onSubmit={submit}
                    className="mt-6 space-y-6"
                >
                    <div>
                        <InputLabel htmlFor="name" value="Nombre" />

                        <TextInput
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
                        <InputLabel htmlFor="email" value="Correo" />

                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="username"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="text-sm mt-2 text-gray-800">
                                Tu dirección de correo electrónico no ha sido
                                verificada.
                                <Link
                                    href={route("verification.send")}
                                    method="post"
                                    as="button"
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Has click aqui para reenviar el correo de
                                    verificación.
                                </Link>
                            </p>

                            {status === "verification-link-sent" && (
                                <div className="mt-2 font-medium text-sm text-green-600">
                                    Un nuevo enlace de verificación ha sido
                                    enviado a tu dirección de correo
                                    electrónico.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>
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
                </form>
            </section>

            <section className="max-w-xl w-full ml-2">
                <header>
                    <h2 className="text-lg font-medium text-gray-900">
                        Avatar
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Actualiza tu imagen de perfil y así ayudaras a las
                        personas a reconocerte
                    </p>
                </header>

                <div className="flex flex-col justify-center items-center w-full mt-6">
                    <img
                        src={data.avatar || DefaultAvatar}
                        className="w-52 h-52 rounded-full"
                        alt="Avatar"
                        ref={avatarRef}
                    />

                    <TextInput
                        form="profile-info-form"
                        id="avatar"
                        type="file"
                        className="hidden"
                        onChange={handleAvatarChange}
                    />

                    <InputLabel
                        htmlFor="avatar"
                        className="w-56 h-56 rounded-full absolute hover:bg-black/30 hover:opacity-70 cursor-pointer transition-all duration-150"
                    />
                </div>

                <InputError
                    className="mt-2 text-center"
                    message={errors.avatar}
                />

                <div className="flex justify-around items-center w-full">
                    <SecondaryButton
                        onClick={() => {
                            document.getElementById("avatar").click();
                        }}
                    >
                        Cambiar
                    </SecondaryButton>
                    <SecondaryButton
                        onClick={() => {
                            setData("avatar", null);
                            avatarRef.current.src = DefaultAvatar;
                        }}
                    >
                        Quitar
                    </SecondaryButton>
                </div>
            </section>
        </div>
    );
}
