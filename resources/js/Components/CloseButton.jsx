function CloseButton({
    size = 6,
    className = "",
    disabled,
    onClick,
    ...props
}) {
    return (
        <button
            type="button"
            className={
                "text-gray-500 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full " +
                className
            }
            {...props}
            onClick={onClick}
            disabled={disabled}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-${size} w-${size}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </button>
    );
}

export default CloseButton;
