export const objectToArray = (data) => {
    return Object.entries(data).filter(([k, v]) => !!v && { [k]: v });
};

export const removeEmptyValues = (data) => {
    return Object.fromEntries(Object.entries(data).filter(([k, v]) => !!v));
}
