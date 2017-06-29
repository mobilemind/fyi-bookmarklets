// firefox version supports '%s' bookmark substitution string, other code is shared with webkit
(() => {
    let defaultEmail = "user@domain.tld",
        emailAddress = "%25s";
    // '%s' is the argument string Firefox can provide to bookmark(lets)
    const pageTitle = encodeURIComponent(document.title),
        returnChar = "%250D%250A",
        selectedText = window.getSelection();
    if (emailAddress.length < 3) {
        emailAddress = window.prompt("Send link to email address(es):", defaultEmail);
    }
    if ("" !== emailAddress) {
        location.href = `mailto:${emailAddress}?subject=fyi:${pageTitle}&body=${pageTitle}${returnChar}${location.href}${returnChar}---${returnChar}${encodeURIComponent(selectedText)}${returnChar}${returnChar}`;
    }
})();
