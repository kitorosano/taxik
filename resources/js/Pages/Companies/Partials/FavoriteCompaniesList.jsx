import CompaniesGridItem from "./CompaniesGridItem";

function FavoriteCompaniesList({ companies, setSelectedCompany }) {
    return (
        <div className="p-6 text-gray-900">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {companies.map((company) => (
                    <CompaniesGridItem
                        key={company.id}
                        company={company}
                        setSelectedCompany={setSelectedCompany}
                    />
                ))}
            </div>
        </div>
    );
}

export default FavoriteCompaniesList;
