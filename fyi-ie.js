// ie version uses weird MS createRange() instead of standard getSelection()
var r = '%0A',
	t = encodeURIComponent(document.title),
	g = document.selection;
void(location.href = 'mailto: ?subject=fyi: ' + t + '&body=' + t + r + (g && g.createRange().text ? ('--' + r + encodeURIComponent(g.createRange().text) + r + '--' + r) : '') + location.href + r + r)