export class UtilsAdmin {
    static convertToFormData<T>(value: T) {
        const form = new FormData();

        for (const key of Object.keys(value)) {
            form.append(key, value[key])
        }

        return form;
    }
}
