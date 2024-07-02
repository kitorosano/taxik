import { router } from "@moraki/inertia-react";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { BellOutlineIcon } from "./Icons";
import NotificationItem from "./NotificationItem";

const Notifications = ({ user }) => {
    const [notifications, setNotifications] = useState([]);
    const unreadNotifications = notifications.filter((n) => !n.watched).length;

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        const channel = user.isClient
            ? `client.${user.id}`
            : `company.${user.id}`;

        window.Echo.channel(channel).listen(
            "TravelOrderStatusUpdated",
            (notification) => {
                // TODO: Show a toast notification
                fetchNotifications();
                reloadOrders();
            }
        );

        return () => {
            window.Echo.leave(channel);
        };
    }, [user]);

    const handleNotificationClick = async () => {
        try {
            const response = await axios.post(route("notifications.watch"));
            setNotifications(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(route("notifications.index"));
            setNotifications(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const reloadOrders = () => {
        router.reload({ only: ["orders"] });
    };

    return (
        <div className="relative">
            <Dropdown>
                <Dropdown.Trigger>
                    <div className="relative" onClick={handleNotificationClick}>
                        <BellOutlineIcon
                            size={24}
                            className="opacity-75 hover:opacity-50 hover:cursor-pointer"
                        />
                        {unreadNotifications > 0 && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                                {unreadNotifications}
                            </div>
                        )}
                    </div>
                </Dropdown.Trigger>
                <Dropdown.Content width="96" contentClasses="py-1 bg-white overflow-y-auto h-80">
                    <p className="px-4 py-1 text-sm font-bold">
                        Notificaciones
                    </p>

                    {notifications.length === 0 && (
                        <>
                            <Dropdown.Divider />
                            <p className="text-gray-500">
                                No hay notificaciones
                            </p>
                        </>
                    )}
                    {notifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            whenLink={user.isCompany}
                            linkHref={
                                "/travel-order/selected_id=" +
                                notification.reference_id
                            }
                        />
                    ))}
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
};

export default Notifications;
