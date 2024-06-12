import CompaniesGridItem from "./CompaniesGridItem";

function CompaniesGrid({ companies, setSelectedCompany }) {
    if (companies.length === 0) {
        return (
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="px-4 py-2 text-center">
                    <p className="text-gray-500">
                        No se encontraron empresas para mostrar
                    </p>
                </div>
            </div>
        );
    }

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

export default CompaniesGrid;
