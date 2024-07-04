import { Link } from "@moraki/inertia-react";

function Pagination({ meta, links }) {
    const customPagination = [
        {
            label: "&laquo;",
            url: links.first,
            active: false,
        },
        ...meta.links,
        {
            label: "&raquo;",
            url: links.last,
            active: false,
        },
    ];

    if (meta.total < meta.per_page) return null;

    return (
        <nav className="text-center mt-4">
            {customPagination.map((link) => (
                <Link
                    href={link.url || "#"}
                    key={link.label}
                    className={`inline-block px-3 py-2 text-xs rounded-lg hover:bg-gray-300 hover:text-gray-800 transition duration-150 ease-in-out ${
                        link.active ? "bg-gray-300 text-gray-950" : ""
                    } ${link.url ? "" : "pointer-events-none text-gray-400"}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </nav>
    );
}

export default Pagination;
