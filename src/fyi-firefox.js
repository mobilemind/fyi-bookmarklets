// firefox version supports '%s' bookmark substitution string, other code is shared with webkit
var defaultEmail = 'user@domain.tld',
	returnChar = '%0A',
	pageTitle = encodeURIComponent(document.title),
	selectedText = window.getSelection(),
	emailAddress = '%s'; // '%s' is the argument string Firefox can provide to bookmark(lets)
	if (emailAddress.length < 3) emailAddress = window.prompt('Send link to email address(es):', defaultEmail);
	if ('' !== emailAddress) location.href = 'mailto:' + emailAddress + '?subject=fyi: ' + pageTitle + '&body=' + pageTitle + returnChar + location.href + returnChar + (selectedText ? '---' + returnChar + encodeURIComponent(selectedText) + returnChar + returnChar : returnChar);
