export const fileToBase64 = (file, callback) => {
  const fr = new FileReader();
  fr.addEventListener("load", (e) => {
    callback({ file, b64: e.target.result });
  });
  fr.readAsDataURL(file);
};
