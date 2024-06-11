import { Link } from "@moraki/inertia-react";

function Pagination({ meta, links }) {
    const customLinks = meta.links.slice(1, -1);

    const customPagination = [
        {
            label: "&laquo;",
            url: links.first,
            active: false,
        },
        {
            label: "Anterior",
            url: links.prev,
            active: false,
        },
        ...customLinks,
        {
            label: "Siguiente",
            url: links.next,
            active: false,
        },
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
                    className={`inline-block px-3 py-2 text-xs rounded-lg hover:bg-gray-300 hover:text-gray-800 ${
                        link.active ? "bg-gray-300 text-gray-950" : ""
                    } ${link.url ? "" : "pointer-events-none text-gray-400"}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </nav>
    );
}

export default Pagination;
