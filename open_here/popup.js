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
        lang: "日本語",
        is_rainbow: false
    }, function () {
        restore_options()
    })
}

function restore_options() {
    chrome.storage.sync.get({
        size: "30",
        color: "#339933",
        lang: "日本語",
        is_rainbow: false
    }, function (items) {
        document.innerText = ''
        switch (items.lang) {
            case "日本語":
                document.getElementById("notsubmitted").innerText = "未提出" 
                break
            case "English":
                document.getElementById("notsubmitted").innerText = "Not submitted"
                break
        }
        document.getElementById('fontSize').value = items.size;
        document.getElementById('fontColor').value = items.color;
        document.getElementById("notsubmitted").style = `font-size: ${items.size}px; color: ${items.color}`
        if (items.is_rainbow)
            enable_rainbow()
    });
}

function enable_rainbow() {
    chrome.storage.sync.set({
        is_rainbow: true
    }, function (items) {
        const CNUM = 18;   // the number of colors to be set
        const COLORS = new Array(CNUM); // color of font
        const MSEC = 50;   // update interval(millimeters second)
        const GLOW = 3;    // can be set from '0' for no GLOW, to 10
        const OBJs = document.getElementsByName('notsubmitted');
        const C_LEN = COLORS.length;
        var cnt = 0;

        OBJs.forEach((OBJ, index) => {
            const STR = OBJ.firstChild.nodeValue;
            const LEN = STR.length;
            // Setting color.
            for (var n = 0; n < CNUM; n++) {
                COLORS[n] = makeColors(CNUM, 0, 255, n);
            }

            // To delete a node.
            while (OBJ.childNodes.length) OBJ.removeChild(OBJ.childNodes[0]);

            // To create the elements.
            for (var i = 0; i < LEN; i++) {
                const CHARA = document.createElement('span');
                CHARA.setAttribute('id', index + 'Str' + i);
                CHARA.appendChild(document.createTextNode(STR.charAt(i)));
                OBJ.appendChild(CHARA);
            }

            // Set the color to each character.
            for (var i = 0; i < LEN; i++) {
                var c = COLORS[i % C_LEN];
                document.getElementById(index + 'Str' + i).style.color = c;
            }

            // Main routine, change a color.
            setInterval(function () {
                var fc = 0;             // order of color
                const SOBJ = new Array(); // stores the information of the object
                for (var i = 0; i < LEN; i++) {
                    fc = COLORS[(i + cnt) % C_LEN];
                    SOBJ[i] = document.getElementById(index + 'Str' + i).style;
                    SOBJ[i].color = fc;
                    if (GLOW) {
                        SOBJ[i].textShadow = '0 0 ' + GLOW + 'px ' + fc;
                    }
                }
                cnt = (cnt + 1) % C_LEN;
            }, MSEC);
        });

    });
}

function makeColors(num, hue, brt, no) {
    num = (num == null ? 12 : Math.abs(num));
    hue = (hue == null ? 0 : Math.abs(hue) % 360);
    brt = (brt == null ? 255 : Math.abs(brt) % 256);
    no = (no == null ? 0 : Math.abs(no));

    var H = hue;
    var B = brt;
    var C = 0;
    var stp = 360 / num;
    var red, grn, blu;

    H = (H + (stp * no)) % 360;
    if (H < 60) {
        C = Math.floor(((H) / 60) * B);
        red = B; grn = C; blu = 0;
    }
    else if (H < 120) {
        C = Math.floor(((H - 60) / 60) * B);
        red = B - C; grn = B; blu = 0;
    }
    else if (H < 180) {
        C = Math.floor(((H - 120) / 60) * B);
        red = 0; grn = B; blu = C;
    }
    else if (H < 240) {
        C = Math.floor(((H - 180) / 60) * B);
        red = 0; grn = B - C; blu = B;
    }
    else if (H < 300) {
        C = Math.floor(((H - 240) / 60) * B);
        red = C; grn = 0; blu = B;
    }
    else {
        C = Math.floor(((H - 300) / 60) * B);
        red = B; grn = 0; blu = B - C;
    }
    return ('rgb(' + red + ', ' + grn + ', ' + blu + ')');
}


document.innerText = ''
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('reset').addEventListener('click', reset_options);
document.getElementById('rainbow').addEventListener('click', enable_rainbow);
document.addEventListener('DOMContentLoaded', restore_options);