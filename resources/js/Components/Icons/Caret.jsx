const Caret = ({ isOpen, ...props }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            stroke="#444"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-all delay-100 ease-in-out ${
                isOpen ? "rotate-180" : ""
            }`}
            {...props}
        >
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    );
};

export default Caret;
