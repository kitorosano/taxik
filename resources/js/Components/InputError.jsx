export default function InputError({
    message,
    className = "",
    withSpace,
    ...props
}) {
    if (withSpace) {
        return message ? (
            <p {...props} className={"text-sm text-red-600 " + className}>
                {message}
            </p>
        ) : (
            <p {...props} className={"text-sm text-red-600 " + className}>
                &nbsp;
            </p>
        );
    }

    return message ? (
        <p {...props} className={"text-sm text-red-600 " + className}>
            {message}
        </p>
    ) : null;
}
