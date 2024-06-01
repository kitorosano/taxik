import FavoriteButton from "@/Components/FavoriteButton";
import { useForm } from "@inertiajs/react";

function FavoriteCompaniesListItem({ company }) {
    const { delete: destroy } = useForm();

    const removeFromFavorites = (e) => {
        e.preventDefault();
        destroy(route("favorite-companies.destroy", company.id));
    };

    return (
        <div
            key={company.id}
            className="bg-white overflow-hidden shadow-sm sm:rounded-lg hover:shadow-md"
        >
            <div className="relative px-4 py-2 flex flex-col items-center text-center">
                <p className="font-bold uppercase">{company.name}</p>

                <span className="absolute top-2 right-2">
                    <form onSubmit={removeFromFavorites}>
                        <FavoriteButton isFavorite />
                    </form>
                </span>

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

export default FavoriteCompaniesListItem;
