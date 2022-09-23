export const convertObjectToFormData = (object: Object): FormData => {
    const data = new FormData();
    Object.entries(object).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(item => {
                data.append(`${key}[]`, String(item));
            });
        } else {
            data.set(key, String(value));
        }
    });

    return data;
};
