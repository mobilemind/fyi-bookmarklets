// ie version uses weird MS createRange() instead of standard getSelection()
var defaultEmail = 'user@domain.tld',
	returnChar = '%0A',
	pageTitle = encodeURIComponent(document.title),
	selectedText = document.selection,
	emailAddress = window.prompt('Send link to email address(es):', defaultEmail);
	if ('' !== emailAddress) {
		location.href = 'mailto:' + emailAddress + '?subject=fyi: ' + pageTitle + '&body=' + pageTitle + returnChar + location.href + returnChar + (selectedText && selectedText.createRange().text ? '---' + returnChar + encodeURIComponent(selectedText.createRange().text) + returnChar + returnChar : returnChar);
	}
