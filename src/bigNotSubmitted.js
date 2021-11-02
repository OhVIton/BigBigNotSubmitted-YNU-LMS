var LANGUAGE = document.querySelector("#langList > option[selected]").textContent

var notsubmittedText = LANGUAGE == "日本語" ? "未提出" : "Not submitted"
var greenTextElems = document.querySelectorAll("tbody > tr > td.td02 span.green1:not(a)")

var notSubmittedElems = []

greenTextElems.forEach(elem => {
    if (elem.textContent == notsubmittedText) {
        notSubmittedElems.push(elem)
    }
});

chrome.storage.sync.get({
    size: "30",
    color: "#339933",
    lang: "日本語"
}, (items) => {
    notSubmittedElems.forEach(nsub => {
        nsub.style = `font-size: ${items.size}px; color: ${items.color}`
    })
})
