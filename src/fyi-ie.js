// ie version uses weird MS createRange() instead of standard getSelection()
var r = '%0A',
	t = encodeURIComponent(document.title),
	g = document.selection;
	location.href = 'mailto: ?subject=fyi: ' + t + '&body=' + t + r + location.href + r + (g && g.createRange().text ? ('---' + r + encodeURIComponent(g.createRange().text) + r + '--' + r + r) : '');
	void('1.8');
