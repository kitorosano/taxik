// import FavoriteButton from "@/Components/FavoriteButton";
import { useForm } from "@inertiajs/react";

function CompaniesGridItem({ company, setSelectedCompany }) {
    const { post } = useForm({
        company_id: company.id,
    });

    // const addToFavorites = (e) => {
    //     e.preventDefault();

    //     post(route("favorite-companies.store"));
    // };

    const handleSelectCompany = () => {
        setSelectedCompany(company);
    };

    return (
        <div
            key={company.id}
            className="bg-white overflow-hidden shadow-sm sm:rounded-lg hover:shadow-md hover:opacity-50 hover:cursor-pointer"
            onClick={handleSelectCompany}
        >
            <div className="relative px-4 py-2 flex flex-col items-center text-center">
                <p className="font-bold uppercase">{company.name}</p>

                {/* <span className="absolute top-2 right-2">
                    <form onSubmit={addToFavorites}>
                        <FavoriteButton />
                    </form>
                </span> */}

                {company.contact && (
                    <>
                        <p className="text-xl">{company.contact.name}</p>
                        <p className="text-xs">{company.contact.department}</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default CompaniesGridItem;
