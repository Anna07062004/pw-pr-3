const uploadBtn = document.getElementById("upload");
const fileInput = document.getElementById("fileInput")

uploadBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("audio", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/voice/upload", true);

    xhr.upload.onprogress = (event) => {
        if(event.lengthComputable) {
            const percent = Math.round(
                (event.loaded / event.total) * 100
            );

            console.log(`Загруженно: ${percent}`)
        }
    };

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log(`Успех:`, JSON.parse(xhr.responseText));
        } else {
            console.log("Ошибка сервера: ", xhr.status);
        }
    }

    xhr.onerror = () => {
        console.log("Ошибка сети")
    };

    xhr.send(formData);

})