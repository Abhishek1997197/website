document.addEventListener("DOMContentLoaded", function () {
    const toggleScript = document.getElementById("toggleScript");
    const statusText = document.getElementById("status");

    toggleScript.addEventListener("change", function () {
        if (toggleScript.checked) {
            statusText.textContent = "Turn On";
            enableBlocker();
        } else {
            statusText.textContent = "Turn Off";
            disableBlocker();
        }
    });

    function enableBlocker() {
        document.body.addEventListener("click", handleClicks, true);
        document.body.addEventListener("DOMNodeInserted", handlePopups, true);
        window.addEventListener("beforeunload", preventNewTabs);
    }

    function disableBlocker() {
        document.body.removeEventListener("click", handleClicks, true);
        document.body.removeEventListener("DOMNodeInserted", handlePopups, true);
        window.removeEventListener("beforeunload", preventNewTabs);
    }

    function handleClicks(event) {
        const blockedWords = ["Genre", "Movies", "Play Button", "Pause Button", "HD Movies", "MP4 Movies", "Cast", "Director", "TV Shows", "TV Series", "Genres", "10000 Movies", "news"];
        const targetText = event.target.innerText || "";
        if (blockedWords.some(word => targetText.includes(word))) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    function handlePopups(event) {
        const popups = document.querySelectorAll("[class*='popup'], [id*='popup']");
        popups.forEach(popup => popup.remove());
    }

    function preventNewTabs(event) {
        event.preventDefault();
        event.returnValue = "Blocking unwanted tabs.";
    }

    window.open = function(url, name, specs) {
        console.log("Blocked attempt to open new tab:", url);
        return null;
    };

    document.addEventListener("click", function (event) {
        if (event.target.tagName === "A" && event.target.target === "_blank") {
            event.preventDefault();
            console.log("Blocked a new tab from opening.");
        }
    }, true);
});
