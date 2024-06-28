import CloseButton from "@/Components/CloseButton";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import {
    travelOrderStatusCode,
    travelOrderStatusList,
} from "@/Utils/constants";
import { useForm } from "@moraki/inertia-react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import TravelOrdersCompanyTaxisTable from "./TravelOrdersCompanyTaxisTable";
dayjs.locale("es");
dayjs.extend(utc);
dayjs.extend(timezone);

const selectTaxiColumns = {
    driver_picture: "",
    driver_name: "Chofer",
    car_information: "Vehiculo",
    is_available: "Estado",
};

function TravelOrderCompanyModal({ selectedOrder, onClose, taxis }) {
    const { data, setData, patch, transform, clearErrors, reset } = useForm({
        assigned_taxi_id: selectedOrder?.taxi?.id,
        status: selectedOrder?.status,
        reason: "",
    });

    const [reassigningTaxi, setReassigningTaxi] = useState(
        !selectedOrder?.taxi?.id
    );

    useEffect(() => {
        if (selectedOrder) {
            setData("assigned_taxi_id", selectedOrder.taxi?.id);
            setReassigningTaxi(!selectedOrder.taxi?.id);
        }
    }, [selectedOrder]);

    const handleSelectTaxi = (taxi) => {
        transform((data) => ({
            ...data,
            assigned_taxi_id: taxi.id,
            status: travelOrderStatusCode.Aprobado,
        }));

        patch(route("travel-order.update", selectedOrder.id), {
            preserveScroll: true,
            only: ["orders"],
            onSuccess: () => {
                setReassigningTaxi(false);
            },
        });
    };

    const handleOnClose = () => {
        reset();
        clearErrors();
        onClose();
    };

    const handleDeny = () => {
        const statusIsPending =
            selectedOrder?.status === travelOrderStatusList[0];

        transform((data) => ({
            ...data,
            status: statusIsPending
                ? travelOrderStatusCode["En Viaje"]
                : travelOrderStatusCode.Cancelado,
        }));

        const alertText = statusIsPending ? "rechazar" : "cancelar";

        if (confirm(`¿Estás seguro de deseas ${alertText} esta reserva?`)) {
            patch(route("travel-order.update", selectedOrder.id), {
                preserveScroll: true,
                only: ["orders"],
            });
        }
    };

    const parsedDepartureDate = dayjs(selectedOrder?.departureDate)
        .utcOffset(0)
        .format("DD [de] MMMM [de] YYYY [a las] HH:mm");

    const statusColors = {
        Pendiente: "bg-orange-100 text-orange-800",
        Aprobado: "bg-blue-100 text-blue-800",
        "En Viaje": "bg-cyan-100 text-cyan-800",
        Completado: "bg-green-100 text-green-800",
        Cancelado: "bg-red-100 text-red-800",
    }[selectedOrder?.status];

    return (
        <Modal
            show={!!selectedOrder}
            onClose={handleOnClose}
            closeable={false}
            maxWidth="3xl"
            background="bg-gray-300/75"
        >
            <div className="p-6">
                <header className="flex justify-end">
                    <CloseButton onClick={handleOnClose} />
                </header>

                <main className="flex flex-col gap-2">
                    <div className="flex items-center  mb-4 gap-4">
                        <h2 className="text-2xl font-black text-gray-900">
                            Orden #{selectedOrder?.id}{" "}
                        </h2>
                        <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors}`}
                        >
                            {selectedOrder?.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Lugar de origen
                            </h2>

                            <p className="text-md text-gray-600">
                                {selectedOrder?.origin}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Lugar de destino
                            </h2>

                            <p className="text-md text-gray-600">
                                {selectedOrder?.destination}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Fecha y hora de salida
                            </h2>

                            <p className="text-md text-gray-600">
                                {parsedDepartureDate}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Precio
                            </h2>

                            <p className="text-md text-gray-600">
                                UYU ${selectedOrder?.price}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Cliente
                            </h2>

                            <p className="text-md text-gray-600">
                                {selectedOrder?.client}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Taxi
                            </h2>

                            <p className="text-md text-gray-600">
                                {selectedOrder?.taxi?.driver_name}
                            </p>
                        </div>
                    </div>

                    <hr className="my-3" />
                    {selectedOrder?.status !== travelOrderStatusList[2] &&
                        selectedOrder?.status !== travelOrderStatusList[4] && (
                            <>
                                <footer className="flex justify-between items-center">
                                    <SecondaryButton
                                        type="button"
                                        onClick={() =>
                                            setReassigningTaxi((prev) => !prev)
                                        }
                                    >
                                        {reassigningTaxi
                                            ? "Cerrar tabla"
                                            : "Reasignar taxi"}
                                    </SecondaryButton>

                                    <div className="flex justify-end items-center gap-2 ">
                                        <DangerButton
                                            type="button"
                                            onClick={handleDeny}
                                        >
                                            {selectedOrder?.status ===
                                            travelOrderStatusList[0]
                                                ? "Rechazar"
                                                : "Cancelar"}
                                        </DangerButton>
                                    </div>
                                </footer>

                                <hr className="my-3" />

                                {reassigningTaxi && (
                                    <div className="flex justify-center items-center mx-10  ">
                                        <TravelOrdersCompanyTaxisTable
                                            items={taxis.data}
                                            columns={selectTaxiColumns}
                                            setSelectedItem={handleSelectTaxi}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                </main>
            </div>
        </Modal>
    );
}

export default TravelOrderCompanyModal;
