import Checkbox from "@/Components/Checkbox";
import { CloseEyeIcon, OpenEyeIcon } from "@/Components/Icons";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@moraki/inertia-react";
import { useEffect, useState } from "react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout title="Entrar a Taxik">
            <Head title="Entrar" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <InputError
                    message={errors.remember}
                    className="mt-2 mb-4 text-center"
                />

                <div>
                    <InputLabel htmlFor="email" value="Correo" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={
                            "mt-1 block w-full " +
                            (errors.email && "border-red-500")
                        }
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña" />

                    <TextInput
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={data.password}
                        className={
                            "mt-1 block w-full " +
                            (errors.password && "border-red-500")
                        }
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                        icon={
                            showPassword ? (
                                <OpenEyeIcon
                                    size={25}
                                    className="text-gray-600 hover:text-gray-700 cursor-pointer"
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <CloseEyeIcon
                                    size={25}
                                    className="text-gray-600 hover:text-gray-700 cursor-pointer"
                                    onClick={() => setShowPassword(true)}
                                />
                            )
                        }
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Recordarme
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    )}
                </div>

                <div className="mt-4">
                    <PrimaryButton className="w-full" disabled={processing}>
                        <span className="block w-full text-center">Entrar</span>
                    </PrimaryButton>
                </div>

                <div className="flex items-center justify-center mt-4">
                    <span className="text-sm text-gray-600 mr-1">
                        ¿No tienes una cuenta?
                    </span>
                    <Link
                        href={route("register")}
                        className="text-sm text-blue-600 hover:text-blue-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Registrate
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
