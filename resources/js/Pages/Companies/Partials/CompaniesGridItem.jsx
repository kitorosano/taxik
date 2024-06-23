function CompaniesGridItem({ company, setSelectedCompany }) {
    return (
        <div
            key={company.id}
            className="bg-white overflow-hidden shadow-sm sm:rounded-lg hover:shadow-md hover:opacity-50 hover:cursor-pointer"
            onClick={() => setSelectedCompany(company)}
        >
            <div className="relative px-4 py-2 flex flex-col items-center text-center">
                <p className="font-bold uppercase">{company.name}</p>

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
