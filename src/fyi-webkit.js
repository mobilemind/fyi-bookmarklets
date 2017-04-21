//  webkit version skips substitution string, but other code is shared with firefox
let defaultEmail = "user@domain.tld",
    emailAddress = "";
const pageTitle = encodeURIComponent(document.title),
  returnChar = "%0A",
  selectedText = window.getSelection();
emailAddress = window.prompt("Send link to email address(es):", defaultEmail);
if ("" !== emailAddress) {
    location.href = `mailto:${emailAddress}?subject=fyi: ${pageTitle}&body=${pageTitle}${returnChar}${location.href}${returnChar}${(selectedText ? "---" + returnChar + encodeURIComponent(selectedText) + returnChar + returnChar : returnChar)}`;
}
