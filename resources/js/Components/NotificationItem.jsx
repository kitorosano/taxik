import dayjs from "dayjs";
import Dropdown from "./Dropdown";

const NotificationItem = ({ whenLink, linkHref, notification }) => {
    const Wrapper = ({ isLink, children }) => {
        if (isLink) {
            return (
                <Dropdown.Link
                    href={linkHref}
                    className="transition-none overflow-y-auto"
                >
                    {children}
                </Dropdown.Link>
            );
        } else {
            return (
                <div className="flex flex-col px-4 gap-2 py-2 hover:bg-gray-100 cursor-pointer">
                    {children}
                </div>
            );
        }
    };

    return (
        <div>
            <Dropdown.Divider />
            <Wrapper isLink={whenLink}>
                <p className="text-sm text-gray-800">
                    {notification.title}
                    <span className="float-right text-xs text-gray-500">
                        {dayjs(notification.created_at).format("DD/MM")}
                    </span>
                </p>
                <p className="text-xs text-gray-500">
                    {notification.description}
                </p>
            </Wrapper>
        </div>
    );
};

export default NotificationItem;
