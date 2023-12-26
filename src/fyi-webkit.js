//  webkit version skips substitution string, but other code is shared with firefox
(() => {
    let emailAddress = "";
    const defaultEmail = "user@domain.tld",
        pageTitle = encodeURIComponent(document.title),
        returnChar = "%250D%250A",
        selectedText = window.getSelection();
    if ("" === emailAddress) {
        emailAddress = window.prompt("Send link to email address(es):", defaultEmail);
    }
    if ("" !== emailAddress) {
        location.href = `mailto:${emailAddress}?subject=fyi:${pageTitle}&body=${pageTitle}${returnChar}${encodeURIComponent(location.href)}${returnChar}---${returnChar}${encodeURIComponent(selectedText)}${returnChar}${returnChar}`;
    }
})();
