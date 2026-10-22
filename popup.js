let currentUrl = "";

// Decode multiple layers
function fullyDecode(url) {

    let previous = "";

    while (url !== previous) {

        previous = url;

        try {
            url = decodeURIComponent(url);
        } catch {
            break;
        }
    }

    return url;
}

// Remove tracking parameters
function cleanUrl(url) {

    try {

        const u = new URL(url);

        const paramsToRemove = [
            "utm_source",
            "utm_medium",
            "utm_campaign",
            "utm_term",
            "utm_content",
            "fbclid",
            "gclid",
            "msclkid",
            "yclid",
            "redirect",
            "nooptext"
        ];

        paramsToRemove.forEach(param =>
            u.searchParams.delete(param)
        );

        return u.toString();

    } catch {
        return url;
    }
}

// Save URL to history
async function saveHistory(url) {

    const result =
        await chrome.storage.local.get("history");

    const history =
        result.history || [];

    history.unshift(url);

    const uniqueHistory =
        [...new Set(history)].slice(0, 50);

    await chrome.storage.local.set({
        history: uniqueHistory
    });
}

// Load history list
async function loadHistory() {

    const result =
        await chrome.storage.local.get("history");

    const history =
        result.history || [];

    const historyList =
        document.getElementById("historyList");

    if (!historyList) return;

    historyList.innerHTML = "";

    if (history.length === 0) {

        historyList.innerHTML =
            "<li>No history yet</li>";

        return;
    }

    history.forEach(url => {

        const li =
            document.createElement("li");

        li.textContent = url;

        historyList.appendChild(li);
    });
}

// Detect URL automatically
async function loadUrl() {

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    const status =
        document.getElementById("status");

    const output =
        document.getElementById("decodedUrl");

    const url = tab.url;

    if (!url) {

        status.textContent =
            "❌ Cannot read URL";

        return;
    }

    const match =
        url.match(/[?&]url=([^&]+)/);

    if (match) {

        currentUrl =
            fullyDecode(match[1]);

        status.textContent =
            "✅ URL Detected";

    } else {

        currentUrl = url;

        status.textContent =
            "✅ Ready";
    }

    output.value = currentUrl;
}

// Open URL
document.getElementById("openBtn")
.addEventListener("click", () => {

    if (!currentUrl) return;

    chrome.tabs.create({
        url: currentUrl
    });

});

// Copy URL
document.getElementById("copyBtn")
.addEventListener("click", async () => {

    if (!currentUrl) return;

    await navigator.clipboard.writeText(
        currentUrl
    );

    document.getElementById("status")
        .textContent =
        "📋 Copied";

});

// Clean URL
document.getElementById("cleanBtn")
.addEventListener("click", async () => {

    currentUrl =
        cleanUrl(currentUrl);

    document.getElementById("decodedUrl")
        .value = currentUrl;

    document.getElementById("status")
        .textContent =
        "🧹 Cleaned";

    await saveHistory(currentUrl);

});

// Toggle History Panel
const historyBtn =
    document.getElementById("historyBtn");

const historyPanel =
    document.getElementById("historyPanel");

const closeHistory =
    document.getElementById("closeHistory");

if (historyBtn && historyPanel) {

    historyBtn.addEventListener("click",
    async () => {

        historyPanel.classList.toggle(
            "hidden"
        );

        await loadHistory();

    });

}

if (closeHistory && historyPanel) {

    closeHistory.addEventListener("click",
    () => {

        historyPanel.classList.add(
            "hidden"
        );

    });

}

// Start
loadUrl();