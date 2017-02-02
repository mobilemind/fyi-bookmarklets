//  webkit version skips substitution string, but other code is shared with firefox
var defaultEmail = 'user@domain.tld',
	returnChar = '%0A',
	pageTitle = encodeURIComponent(document.title),
	selectedText = window.getSelection(),
	emailAddress = window.prompt('Send link to email address(es):', defaultEmail);
	if ('' !== emailAddress) {
		location.href = 'mailto:' + emailAddress + '?subject=fyi: ' + pageTitle + '&body=' + pageTitle + returnChar + location.href + returnChar + (selectedText ? '---' + returnChar + encodeURIComponent(selectedText) + returnChar + returnChar : returnChar);
	}
