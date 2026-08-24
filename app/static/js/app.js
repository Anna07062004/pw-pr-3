const uploadBtn = document.getElementById("upload");
const fileInput = document.getElementById("fileInput")
const upActions = document.getElementById("upActions")
const upSend = document.getElementById("upSend")
const upDelete = document.getElementById("upDelete")
const uploadMusic = document.getElementById("uploadMusic")
const transcriptionBody = document.getElementById("transcriptionBody")
const fileName = document.getElementById("fileName")
const fileSize = document.getElementById("fileSize")

let uploadFile;

function formatBytes(bytes) {
    if(bytes < 1024) return bytes + "B";
    if(bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + "КБ"
    return (bytes / (1024 * 1024)).toFixed(2) + "КБ"
}

function setTranscript(text) {
    if(text) {
        transcriptionBody.textContent = text;
        transcriptionBody.className = "border border=[#e5e5e5] bg-[#fafafa] min-h-[88px] rounded-lg p-4 text-left"
    } else {
        transcriptionBody.textContent = "Текст появится здесь после распознавания аудио";
        transcriptionBody.className = "border border=[#e5e5e5] bg-[#fafafa] min-h-[88px] rounded-lg p-4 text-left"
    }
}

uploadBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];

    if (!file) return;

    fileName.textContent = file.name;
    fileSize.textContent = formatBytes(file.size)

    uploadMusic.removeAttribute("hidden")
    upActions.removeAttribute("hidden")

});

upSend.addEventListener("click", () => {
    sendFile(uploadedFile);
});

upDelete.addEventListener("click", () => {
    uploadedFile = undefined;
    fileInput.value = "";
    upActions.hidden = true;
})

function sendFile(file) {
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
        upSend.disabled = false;
    }

    xhr.onerror = () => {
        console.log("Ошибка сети");
        upSend.disabled = false;
    };

    xhr.send(formData);

}

let recorder, chunks = [], recordedBlob = null, timerId = null, startedAt = 0, recording = false;

function startRecording() {
    try {
        stream = navigation.mediaDevices.getElementById({ audio: true })
    } catch(e) {
        console.error(0);
        return;
    }

    recordER = NEW MediaRecorder(stream);
    chunks = [];
    recorder.ondataavailable = (e)=> chunks.push(e.data);
    recorder.onstop = () => {
        recordedBlob = new Blob(chunks, { type: recorder.minType || "audio/webom" })
        recAudio.src = URL.createObjectURL(recordedBlob);
        recAudio.hidden = false;
        recAudio.hidden = false;
        stream.getTracks().forEach(t => t.stop());
    }

    recorder.start();

    recording = true;
    record
}