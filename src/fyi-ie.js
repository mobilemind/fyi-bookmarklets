// ie version uses weird MS createRange() instead of standard getSelection()
(function () {
    var defaultEmail = "user@domain.tld",
        emailAddress = "";
    const pageTitle = encodeURIComponent(document.title),
        returnChar = "%0A",
        selectedText = document.selection;
    emailAddress = window.prompt("Send link to email address(es):", defaultEmail);
    if ("" !== emailAddress) {
        location.href = "mailto:" + emailAddress + "?subject=fyi:" + pageTitle + "&body=" + pageTitle + returnChar + location.href + returnChar + (selectedText && selectedText.createRange().text ? "---" + returnChar + encodeURIComponent(selectedText.createRange().text) + returnChar + returnChar : returnChar);
    }
})();
