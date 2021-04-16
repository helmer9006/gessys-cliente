export const fileToBase64Create = (file, callback) => {
    const fr = new FileReader();
    fr.addEventListener("load", (e) => {
        callback((prev) => ({ ...prev, uploading: false, inventario: { ...prev.inventario, anexo: e.target.result } }));
    });
    fr.readAsDataURL(file);
};

export const fileToBase64Record = (file, callback) => {
    const fr = new FileReader();
    fr.addEventListener("load", (e) => {
        callback((prev) => ({ ...prev, uploading: false, form: { ...prev.form, anexo: { ...prev.form.anexo, url: e.target.result } } }));
    });
    fr.readAsDataURL(file);
};