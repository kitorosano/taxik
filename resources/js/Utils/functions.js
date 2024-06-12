import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const objectToArray = (data) => {
    return Object.entries(data).filter(([k, v]) => !!v && { [k]: v });
};

export const removeEmptyValues = (data) => {
    return Object.fromEntries(Object.entries(data).filter(([k, v]) => !!v));
};

export const calculateTaxiFee = (
    distanceInKilometer,
    isDayTime,
    hasLuggage
) => {
    // Calculate the taxi fee based on the distance and the time of the day
    // The fee is calculated as follows:
    // - The base fee is $89.29
    // - The fee per kilometer is $9.82
    // - If the time of the day is nighttime, the fee is increased by 20%
    // - If the passenger has luggage, if the time of the day is nighttime, $29.172 are added to the total fee otherwise $24.31

    const baseFee = 89.29;
    const feePerKilometer = 9.82;
    const nightTimeFee = 0.2;
    const luggageFee = 24.31;
    const nightTimeLuggageFee = 29.172;

    const totalFee = baseFee + distanceInKilometer * feePerKilometer;
    const luggage = hasLuggage
        ? isDayTime
            ? luggageFee
            : nightTimeLuggageFee
        : 0;
    const nighttime = isDayTime ? 0 : totalFee * nightTimeFee;

    return totalFee + luggage + nighttime;
};

export const getDistanceInKilometers = (origin, destination) => {
    // Get the distance in kilometers between two points
    // This function is a placeholder for the real implementation
    // It should return a promise with the distance in kilometers between the origin and the destination
    // For the sake of the example, it returns a random number between 1 and 100

    return new Promise((resolve) => {
        setTimeout(() => {
            const distance = Math.floor(Math.random() * 10) + 1;
            resolve(distance);
        }, 2000);
    });
};

export const getArrivalDateByDistance = (distance, departureDate) => {
    // Get the estimated arrival date based on the distance and the departure date
    // The estimated arrival date is calculated as follows:
    // - The average speed of a taxi is 60 km/h
    // - The estimated arrival date is calculated by adding the distance in kilometers to the departure date

    const averageSpeed = 60;
    const hours = distance / averageSpeed;
    const minutes = (hours - Math.floor(hours)) * 60;

    const arrivalDate = dayjs(departureDate)
        .add(minutes + 1, "minutes") // Add 1 to account for traffic, also the time it takes to park the taxi and let the passenger leave
        .format()
        .slice(0, 16);
        
    return arrivalDate;
};

export const isDay = (date) => {
    const hours = new Date(date).getHours();
    return hours >= 6 && hours <= 18;
};
