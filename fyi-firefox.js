// firefox version supports '%s' bookmark substitution string, other code is shared with webkit
var r = '%0A',
	t = encodeURIComponent(document.title),
	g = window.getSelection();
void(location.href = 'mailto:' + ('%s' == '%s' ? ' ': '%s') + '?subject=fyi: ' + t + '&body=' + t + r + (g != '' ? ('--' + r + encodeURIComponent(g) + r + '--' + r) : '') + location.href + r + r)