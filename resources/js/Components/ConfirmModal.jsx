import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";

const ConfirmModal = ({
    show,
    onClose,
    title,
    cancelText,
    cancelOnClick,
    confirmText,
    confirmOnClick,
}) => {
    return (
        <Modal
            show={show}
            maxWidth="md"
            onClose={onClose}
            background="bg-gray-300/75"
        >
            <div className="p-6">
                <main className="flex flex-col gap-2">
                    <p className="text-2xl text-center text-gray-800">
                        {title}
                    </p>
                    <footer className="flex justify-between items-center mt-4">
                        <SecondaryButton type="button" onClick={cancelOnClick}>
                            {cancelText}
                        </SecondaryButton>

                        <div className="flex justify-center items-center">
                            <DangerButton
                                type="button"
                                onClick={confirmOnClick}
                                className="text-white p-4 rounded-md font-semibold "
                            >
                                {confirmText}
                            </DangerButton>
                        </div>
                    </footer>
                </main>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
