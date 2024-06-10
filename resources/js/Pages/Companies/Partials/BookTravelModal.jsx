import CloseButton from "@/Components/CloseButton";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import {
    calculateTaxiFee,
    getArrivalDateByDistance,
    getDistanceInKilometers,
    isDay,
} from "@/Utils/functions";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

function BookTravelModal({ selectedCompany, onClose }) {
    const show = selectedCompany !== null;

    const {
        data,
        setData,
        post,
        transform,
        processing,
        clearErrors,
        setError,
        errors,
        reset,
    } = useForm({
        company_id: null,
        origin: "",
        destination: "",
        departure_date: "",
        price: 0,
        estimated_arrival_date: "",
        has_luggage: false,
    });

    const [isCalculating, setIsCalculating] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [estimatedArrivalDate, setEstimatedArrivalDate] = useState("");

    useEffect(() => {
        if (selectedCompany) {
            setData("company_id", selectedCompany.id);
        }
    }, [selectedCompany]);

    const calculatePriceAndEstimateArrival = async ({
        origin,
        destination,
        departure_date,
        has_luggage,
    }) => {
        const distance = await getDistanceInKilometers(origin, destination);

        const arrivalDate = getArrivalDateByDistance(distance, departure_date);

        const isDayTime = isDay(departure_date);

        const price = calculateTaxiFee(distance, isDayTime, has_luggage);
        const roundedPrice = Math.ceil(price * 100) / 100;

        return { price: roundedPrice, estimatedArrivalDate: arrivalDate };
    };

    const handleCalcularTarifa = async () => {
        if (!data.origin) {
            return setError("origin", "El origen es requerido");
        }
        clearErrors("origin");

        if (!data.destination) {
            return setError("destination", "El destino es requerido");
        }
        clearErrors("destination");

        if (!data.departure_date) {
            return setError(
                "departure_date",
                "La fecha y hora de salida es requerida"
            );
        }
        clearErrors("departure_date");

        setIsCalculating(true);

        const { price, estimatedArrivalDate } =
            await calculatePriceAndEstimateArrival(data);
        setTotalPrice(price);
        setEstimatedArrivalDate(estimatedArrivalDate);

        setIsCalculating(false);
    };

    const handleBookTravel = async (e) => {
        e.preventDefault();

        const { price, estimatedArrivalDate } =
            await calculatePriceAndEstimateArrival(data);

        const transformedData = {
            ...data,
            price,
            estimated_arrival_date: estimatedArrivalDate,
        };

        router.post(route("travel-order.store"), transformedData, {
            preserveState: true,
            onSuccess: () => {
                handleOnClose();
                alert("Viaje reservado correctamente");
            },
            onError: (errors) => {
                console.log(errors);
                alert("Ocurrió un error al reservar el viaje");
            },
        });
    };

    const handleOnClose = () => {
        reset();
        clearErrors();
        onClose();
    };

    return (
        <Modal
            show={show}
            onClose={handleOnClose}
            closeable={false}
            maxWidth="xl"
            background="bg-gray-300/75"
        >
            <div className="p-6">
                {/* TODO: COMPANY INFO */}

                {/* RESERVA VIAJE */}
                <form onSubmit={handleBookTravel}>
                    <header className="flex justify-between items-center">
                        <h2 className="text-lg font-medium text-gray-900">
                            Reservar Viaje
                        </h2>
                        <CloseButton onClick={onClose} />
                    </header>

                    <main>
                        <div className="mt-4">
                            <InputLabel htmlFor="origin" value="Origen" />

                            <TextInput
                                id="origin"
                                name="origin"
                                value={data.origin}
                                className="mt-1 block w-full"
                                autoComplete="origin"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("origin", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.origin}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="destination" value="Destino" />

                            <TextInput
                                name="destination"
                                value={data.destination}
                                className="mt-1 block w-full"
                                autoComplete="destination"
                                onChange={(e) =>
                                    setData("destination", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.destination}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex justify-center gap-4">
                            <div className="mt-4 w-full">
                                <InputLabel
                                    htmlFor="departure_date"
                                    value="Fecha y Hora"
                                />

                                <TextInput
                                    id="departure_date"
                                    type="datetime-local"
                                    name="departure_date"
                                    value={data.departure_date}
                                    className="mt-1 block w-full"
                                    autoComplete="departure_date"
                                    onChange={(e) =>
                                        setData(
                                            "departure_date",
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.departure_date}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4 text-nowrap flex flex-col items-center">
                                <InputLabel
                                    htmlFor="has_luggage"
                                    value="¿Lleva valija?"
                                />
                                <div className="flex justify-center items-center h-full">
                                    <TextInput
                                        id="has_luggage"
                                        type="checkbox"
                                        name="has_luggage"
                                        checked={data.has_luggage}
                                        className="w-6 h-6"
                                        onChange={(e) =>
                                            setData(
                                                "has_luggage",
                                                e.target.checked
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            {isCalculating !== null && (
                                <p>
                                    <span className="font-medium">
                                        Tarifa estimada:{" "}
                                    </span>
                                    {isCalculating
                                        ? "Calculando..."
                                        : `$${totalPrice}`}
                                </p>
                            )}
                        </div>
                    </main>

                    <footer className="flex justify-between items-center mt-5">
                        <SecondaryButton
                            type="button"
                            onClick={handleCalcularTarifa}
                        >
                            Calcular Tarifa
                        </SecondaryButton>

                        <div className="flex justify-end items-center gap-2 ">
                            <DangerButton type="button" onClick={onClose}>
                                Cancelar
                            </DangerButton>
                            <PrimaryButton disabled={processing}>
                                Reservar
                            </PrimaryButton>
                        </div>
                    </footer>
                </form>
            </div>
        </Modal>
    );
}

export default BookTravelModal;
