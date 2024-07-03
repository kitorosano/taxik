import { useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";

const ToastMessage = ({ newMessage }) => {
    const [message, setContent] = useState({
        content: "",
        type: "default",
    });

    useEffect(() => {
        if (newMessage) {
            setContent(newMessage);
        }
    }, [newMessage]);

    const toastsEmitters = {
        success: (content, options = {}) => toast.success(content, options),
        error: (content, options = {}) => toast.error(content, options),
        warn: (content, options = {}) => toast.warn(content, options),
        info: (content, options = {}) => toast.info(content, options),
    };

    useEffect(() => {
        if (message.content) {
            toastsEmitters[message.type](message.content, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                onClose: () => setContent({ content: "", type: "default" }),
            });
        }
    }, [message]);

    return <ToastContainer />;
};

export default ToastMessage;
