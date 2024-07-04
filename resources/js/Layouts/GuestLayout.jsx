import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@moraki/inertia-react";

export default function Guest({ title, children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-24 h-24" />
                </Link>
            </div>

            <h1 className="text-3xl font-thin text-gray-600">{title}</h1>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
