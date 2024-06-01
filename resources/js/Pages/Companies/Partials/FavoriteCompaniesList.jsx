import FavoriteCompaniesListItem from "./FavoriteCompaniesListItem";

function FavoriteCompaniesList({ companies }) {
    return (
        <div className="p-6 text-gray-900">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {companies.map((company) => (
                    <FavoriteCompaniesListItem
                        key={company.id}
                        company={company}
                    />
                ))}
            </div>
        </div>
    );
}

export default FavoriteCompaniesList;
