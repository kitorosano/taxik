import { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";

const ToastMessage = ({ newMessage }) => {
    const [message, setMessage] = useState({
        content: "",
        type: "info",
    });

    useEffect(() => {
        if (newMessage) {
            setMessage(newMessage);
        }
    }, [newMessage.content]);

    const toastsEmitters = {
        success: (content, options = {}) => toast.success(content, options),
        error: (content, options = {}) => toast.error(content, options),
        warn: (content, options = {}) => toast.warn(content, options),
        info: (content, options = {}) => toast.info(content, options),
        default: (content, options = {}) => toast(content, options),
    };

    useEffect(() => {
        if (message.content) {
            toastsEmitters[message.type](message.content, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                onClose: () => setMessage({ content: "", type: "default" }),
            });
        }
    }, [message.content]);

    return <ToastContainer stacked />;
};

export default ToastMessage;
