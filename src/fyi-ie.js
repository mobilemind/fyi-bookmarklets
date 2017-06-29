// ie version < 11 uses weird MS createRange() instead of standard getSelection()
(function () {
    var defaultEmail = "user@domain.tld",
        emailAddress = "";
    const pageTitle = encodeURIComponent(document.title),
        returnChar = "%250D%250A",
        selectedText = document.selection;
    emailAddress = window.prompt("Send link to email address(es):", defaultEmail);
    if ("" !== emailAddress) {
        location.href = "mailto:" + emailAddress + "?subject=fyi:" + pageTitle + "&body=" + pageTitle + returnChar + encodeURIComponent(location.href) + returnChar + (selectedText && selectedText.createRange().text ? "---" + returnChar + encodeURIComponent(selectedText.createRange().text) + returnChar + returnChar : returnChar);
    }
}());
