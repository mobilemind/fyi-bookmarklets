//  webkit version skips substitution string and void(), but other code is shared with firefox
var r = '%0A',
	t = encodeURIComponent(document.title),
	g = window.getSelection();
location.href = 'mailto: ?subject=fyi: ' + t + '&body=' + t + r + (g != '' ? ('--' + r + encodeURIComponent(g) + r + '--' + r) : '') + location.href + r + r