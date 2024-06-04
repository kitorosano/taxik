import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInputWithOptions from "@/Components/TextInputWithOptions";
import { departmentList } from "@/Utils/constants";
import { Head, Link, router, useForm } from "@inertiajs/react";
import TaxikLogo from "/resources/assets/img/taxik-logo-red.png";

export default function Welcome({ auth }) {
    const selectableDepartments = departmentList.map((department) => ({
        key: department,
        value: department,
    }));

    const { data, setData, processing, errors } = useForm({
        department: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (data.department === "") return router.get(route("contacts.index"));

        router.get(route("contacts.index", data));
    };

    return (
        <>
            <Head title="Bienvenida" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                />
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:justify-center lg:col-start-2">
                                {/* LOGO TAXIK */}
                                <img
                                    className="absolute w-28 h-28"
                                    src={TaxikLogo}
                                />
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Entrar
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Registrarme
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <p className="text-6xl pt-44 text-white">
                                Bienvenido a <span className="bold">Taxik</span>
                            </p>
                            <p className="text-2xl pb-44">
                                Tu taxi en todas partes
                            </p>

                            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <div className="flex justify-between w-full">
                                            <TextInputWithOptions
                                                id="location"
                                                optionList={
                                                    selectableDepartments
                                                }
                                                inputValue={data.department}
                                                inputOnChange={(e) =>
                                                    setData(
                                                        "department",
                                                        e.target.value
                                                    )
                                                }
                                                wrapperClassName="mr-2"
                                                inputClassName="w-full h-full text-black"
                                                optionsClassName="px-2 py-2 text-gray-900 text-sm hover:bg-indigo-100"
                                                autoFocus
                                                placeholder="Ingresa tu departamento"
                                            />
                                            <PrimaryButton
                                                disabled={processing}
                                            >
                                                Buscar Taxis
                                            </PrimaryButton>
                                        </div>
                                        <InputError
                                            message={errors.location}
                                            className="mt-2"
                                        />
                                    </div>
                                </form>
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Desarrollado por estudiantes del TIP - UTEC © 2024
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
