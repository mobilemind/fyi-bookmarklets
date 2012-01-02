// firefox version supports '%s' bookmark substitution string, other code is shared with webkit
var r = '%0A',
	t = encodeURIComponent(document.title),
	g = window.getSelection();
	// '%s' is the argument string Firefox can provide to bookmark(lets)
	location.href = 'mailto:' + (String('%s') === '%s' ? ' ': '%s') + '?subject=fyi: ' + t + '&body=' + t + r + location.href + (g != '' ? ('---' + r + encodeURIComponent(g) + r + r) : '');
	void('1.8');
