function FavoriteButton({ onClick, isFavorite = false }) {
    return (
        <button
            type="submit"
            className={
                isFavorite
                    ? "text-yellow-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-yellow-500"
            }
            onClick={onClick}
        >
            {isFavorite ? (
                <svg height="20px" viewBox="0 0 24 24">
                    <path
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                        fill="currentColor"
                    />
                    <path d="M0 0h24v24H0z" fill="none" />
                </svg>
            ) : (
                <svg height="20px" viewBox="0 0 24 24">
                    <path
                        d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
                        fill="currentColor"
                    />
                    <path d="M0 0h24v24H0z" fill="none" />
                </svg>
            )}
        </button>
    );
}

export default FavoriteButton;
