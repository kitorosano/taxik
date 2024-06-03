import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdateContactInformationForm from "./Partials/UpdateContactInformationForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ auth, mustVerifyEmail, status, contact }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex text-gray-900 py-6">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Perfil
                    </h2>
                </div>
            }
        >
            <Head title="Perfil" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>
                    {auth.user.isCompany && (
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <UpdateContactInformationForm
                                className="max-w-xl"
                                contact={contact}
                            />
                        </div>
                    )}

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {auth.user.isCompany && (
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
