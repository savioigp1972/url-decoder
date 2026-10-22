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

function cleanUrl(url) {

    try {

        const u = new URL(url);

        const params = [
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

        params.forEach(param =>
            u.searchParams.delete(param)
        );

        return u.toString();

    } catch {

        return url;
    }
}

chrome.tabs.onUpdated.addListener(
(tabId, changeInfo, tab) => {

    if (changeInfo.status !== "complete")
        return;

    if (!tab.url)
        return;

    try {

        const url = new URL(tab.url);

        const candidates = [
            "url",
            "target",
            "redirect",
            "destination"
        ];

        for (const param of candidates) {

            const value =
                url.searchParams.get(param);

            if (!value)
                continue;

            let decoded = fullyDecode(value);

            decoded = cleanUrl(decoded);

            if (
                decoded.startsWith("https://") ||
                decoded.startsWith("http://")
            ) {

                chrome.tabs.update(tabId, {
                    url: decoded
                });

                return;
            }
        }

    } catch {}
});