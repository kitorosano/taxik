import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import LanguageSwitcher from "@/Components/LanguageSwitcher";
import NavLink from "@/Components/NavLink";
import Notifications from "@/Components/Notifications";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import ToastMessage from "@/Components/ToastMessage";
import { Link, usePage } from "@moraki/inertia-react";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { useState } from "react";
import DefaultAvatar from "/resources/assets/img/default-avatar.png";

export default function Authenticated({ user, header, children }) {
    const { t } = useLaravelReactI18n();
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const username = user ? user.name : "Invitado";
    const useremail = user ? user.email : "";
    const useravatar = user ? user.avatar : DefaultAvatar;

    const departmentQuery = new URLSearchParams(window.location.search).get(
        "department"
    );

    const { flash, locale } = usePage().props;
    const flashToastMessage = {
        content: flash?.message || "",
        type: flash?.messageType || "default",
    };

    return (
        <div className="relative min-h-screen bg-gray-100">
            <ToastMessage newMessage={flashToastMessage} />

            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="w-[56px] h-[56px] hover:opacity-75 hover:cursor-pointer" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route("contacts.index")}
                                    active={route().current("contacts.index")}
                                >
                                    {t("pages.navbar.contacts")}
                                </NavLink>
                            </div>

                            {user && user.isAdmin && (
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink
                                        href={route("users.index")}
                                        active={route().current("users.index")}
                                    >
                                        {t("pages.navbar.users")}
                                    </NavLink>
                                </div>
                            )}

                            {user && user.isCompany && (
                                <>
                                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                        <NavLink
                                            href={route("taxis.index")}
                                            active={route().current(
                                                "taxis.index"
                                            )}
                                        >
                                            {t("pages.navbar.taxis")}
                                        </NavLink>
                                    </div>
                                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                        <NavLink
                                            href={route("travel-order.index")}
                                            active={route().current(
                                                "travel-order.index"
                                            )}
                                        >
                                            {t(
                                                "pages.navbar.travel-order.company"
                                            )}
                                        </NavLink>
                                    </div>
                                </>
                            )}

                            {(!user || user.isClient) && (
                                <>
                                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                        <NavLink
                                            href={route("companies.index", {
                                                _query: {
                                                    department: departmentQuery,
                                                },
                                            })}
                                            active={route().current(
                                                "companies.index"
                                            )}
                                        >
                                            {t("pages.navbar.companies")}
                                        </NavLink>
                                    </div>
                                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                        <NavLink
                                            href={route("travel-order.index")}
                                            active={route().current(
                                                "travel-order.index"
                                            )}
                                        >
                                            {t(
                                                "pages.navbar.travel-order.client"
                                            )}
                                        </NavLink>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="p-2">
                                <LanguageSwitcher initialLocale={locale} />
                            </div>
                            {user && (
                                <div className="p-2">
                                    <Notifications user={user} />
                                </div>
                            )}
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {useravatar && (
                                                    <img
                                                        src={useravatar}
                                                        className="w-8 h-8 rounded-full mx-2"
                                                        alt="Avatar"
                                                    />
                                                )}

                                                {username}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    {user ? (
                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                                as="button"
                                            >
                                                {t("pages.navbar.profile")}
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                {t("pages.navbar.logout")}
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    ) : (
                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("login")}
                                                as="button"
                                            >
                                                {t("pages.navbar.login")}
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("register")}
                                                as="button"
                                            >
                                                {t("pages.navbar.register")}
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    )}
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            {user && (
                                <div className="p-2">
                                    <Notifications user={user} />
                                </div>
                            )}
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState
                                        )
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("contacts.index")}
                            active={route().current("contacts.index")}
                        >
                            {t("pages.navbar.contacts")}
                        </ResponsiveNavLink>
                    </div>

                    {user && user.isAdmin && (
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("users.index")}
                                active={route().current("users.index")}
                            >
                                {t("pages.navbar.users")}
                            </ResponsiveNavLink>
                        </div>
                    )}

                    {user && user.isCompany && (
                        <>
                            <div className="pt-2 pb-3 space-y-1">
                                <ResponsiveNavLink
                                    href={route("taxis.index")}
                                    active={route().current("taxis.index")}
                                >
                                    {t("pages.navbar.taxis")}
                                </ResponsiveNavLink>
                            </div>
                            <div className="pt-2 pb-3 space-y-1">
                                <ResponsiveNavLink
                                    href={route("travel-order.index")}
                                    active={route().current(
                                        "travel-order.index"
                                    )}
                                >
                                    {t("pages.navbar.travel-order.company")}
                                </ResponsiveNavLink>
                            </div>
                        </>
                    )}

                    {(!user || user.isClient) && (
                        <>
                            <div className="pt-2 pb-3 space-y-1">
                                <ResponsiveNavLink
                                    href={route("companies.index")}
                                    active={route().current("companies.index")}
                                >
                                    {t("pages.navbar.companies")}
                                </ResponsiveNavLink>
                            </div>
                            <div className="pt-2 pb-3 space-y-1">
                                <ResponsiveNavLink
                                    href={route("travel-order.index")}
                                    active={route().current(
                                        "travel-order.index"
                                    )}
                                >
                                    {t("pages.navbar.travel-order.client")}
                                </ResponsiveNavLink>
                            </div>
                        </>
                    )}

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        {useravatar ? (
                            <div className="px-4 flex items-center">
                                <div className="flex-col">
                                    <img
                                        src={useravatar}
                                        className="w-8 h-8 rounded-full mx-2"
                                        alt="Avatar"
                                    />
                                </div>
                                <div className="flex-col">
                                    <div className="font-medium text-base text-gray-800">
                                        {username}
                                    </div>
                                    <div className="font-medium text-sm text-gray-500">
                                        {useremail}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">
                                    {username}
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    {useremail}
                                </div>
                            </div>
                        )}

                        {user ? (
                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    {t("pages.navbar.profile")}
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    {t("pages.navbar.logout")}
                                </ResponsiveNavLink>
                            </div>
                        ) : (
                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("login")}>
                                    {t("pages.navbar.login")}
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route("register")}>
                                    {t("pages.navbar.register")}
                                </ResponsiveNavLink>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
