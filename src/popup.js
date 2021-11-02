function save_options() {
    document.innerText = ''
    chrome.storage.sync.set({
        size: document.getElementById('fontSize').value,
        color: document.getElementById('fontColor').value,
        lang: document.getElementById('language').value
    }, function () {
        restore_options()
    })
}

function reset_options() {
    chrome.storage.sync.set({
        size: "15",
        color: "#339933",
        lang: "日本語"
    }, function () {
        restore_options()
    })
}

function restore_options() {
    chrome.storage.sync.get({
        size: "30",
        color: "#339933",
        lang: "日本語"
    }, function (items) {
        document.innerText = ''
        switch(items.lang) {
            case "日本語":
                document.getElementById("notsubmitted").innerText = "未提出";
                break
            case "English":
                document.getElementById("notsubmitted").innerText = "Not Submitted";
                break
        }
        document.getElementById('fontSize').value = items.size;
        document.getElementById('fontColor').value = items.color;
        document.getElementById("notsubmitted").style = `font-size: ${items.size}px; color: ${items.color}`
    });
}

document.innerText = ''
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('reset').addEventListener('click', reset_options);
document.addEventListener('DOMContentLoaded', restore_options);