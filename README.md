# FYI Bookmarklets
[![Build Status](https://secure.travis-ci.org/mobilemind/fyi-bookmarklets.png?branch=master)](http://travis-ci.org/mobilemind/fyi-bookmarklets)

The "fyi" bookmarklets make it easy to select text on a web page and fire off an email
that quotes the selection and includes the page title and URL.

All of that is done without you doing copy-and-paste work or back-and-forth app switching.

Available versions include:

+ **fyi-webkit** -- optimized for iOS (iPhone/iPad/iPod) and Chrome
+ **fyi-firefox** -- optimized for Firefox to support address bar with custom keyword %s argument
+ **fyi-ie** -- works with Internet Explorer and its (odd-to-me) DOM selected text methods

## Install
### Desktop browser
Drag the desired bookmark to the bookmark bar or add bookmark/favorite. Optionally edit
or rename the bookmark/favorite. Firefox users may want to set bookmark properties so the
**Name** is "fyi email" and the custom **Keyword** is "fyi" for reasons detailed in
[Usage](#usage).

+ **fyi-webkit** -- <a href="javascript:var%20r='%250A',t=encodeURIComponent(document.title),g=window.getSelection();location.href='mailto:?subject=fyi:%20'+t+'&amp;body='+t+r+location.href+r+(g?'---'+r+encodeURIComponent(g)+r+r:r);void'2.6.1wk'" title="fyi-webkit">fyi</a>
+ **fyi-firefox** -- <a href="javascript:var%20r='%250A',t=encodeURIComponent(document.title),g=window.getSelection();location.href='mailto:'+(String('%s')==='%25s'?'%20':'%s')+'?subject=fyi:%20'+t+'&amp;body='+t+r+location.href+r+(g?'---'+r+encodeURIComponent(g)+r+r:r);void'2.6.1ff'" title="fyi-firefox">fyi</a>
+ **fyi-ie** -- <a href="javascript:var%20r='%250A',t=encodeURIComponent(document.title),g=document.selection;location.href='mailto:?subject=fyi:%20'+t+'&amp;body='+t+r+location.href+r+(g&amp;&amp;g.createRange().text?'---'+r+encodeURIComponent(g.createRange().text)+r+r:r);void'2.6.1ie'" title="fyi-ie">fyi</a>

### Mobile browser
Tap the link below, bookmark the new page and follow the instructions on the page to turn
the followed bookmark into a JavaScript bookmarklet.

+ **Mobile browser** -- <a href="http://mmind.me/_?javascript:var%20r='%250A',t=encodeURIComponent(document.title),g=window.getSelection();location.href='mailto:%20?subject=fyi:%20'+t+'&amp;body='+t+r+location.href+r+(g?'---'+r+encodeURIComponent(g)+r+r:r);void'2.6.1wk'" title="Setup fyi-webkit">Setup fyi</a>

## Usage<a id="usage"></a>
### General Use
Visit a web page. Activate the fyi bookmarklet (click it on bookmark bar or use
the Bookmarks/Favorites menu).

The fyi bookmarklet will open a new email with the page title in the subject line,
the page title repeated again in the body, along with the selected text (if any text
was selected), and the URL of the original page.

### Quick Use
With **Firefox Custom Keywords** you'll be able to do something like:

_Cmd-L/Ctr-L_ `fyi user@domain.com` _Enter_

#### Firefox Custom Keywords
Each bookmark in Firefox can have attributes including a Name, Tags, and
a Keyword. Custom keywords can be used with a dynamic "replacement string"
for the bookmark location (URL or javascript:…).
For general information on Custom Keywords, see [Firefox Custom Keywords](https://www.mozilla.org/docs/end-user/keywords.html "Mozilla Firefox Custom Keywords").

The fyi Firefox bookmarklet can take advantage of a Custom Keyword, _and_
a replacement string (to pre-address the email). The recommended bookmark
**Name** is "_fyi email_" since this gives a syntax hint when using it. The
recommended **Keyword** is "_fyi_".

Given a designated keyword (ie, "fyi"), the bookmarklet can be activated by
typing the keyword in the address bar and pressing enter. The intended syntax
is:

<code><b>fyi</b> [<i>emailAddress(es)</i>]</code>

The optional argument is one or more email addresses, separated by semicolons.
The email address(es) will be put in the TO field of the new email. Outlook users
can include multiple recpients using syntax like:

<code><b>fyi</b> <i>Lastname1,Firstname1<b>;</b>Lastname2,Firstname2<b>;</b>&hellip;</i></code>

There is a **Known Issue** with using Custom Keywords--- the current page URL appears
properly in the email, but is over-written in the browser's address bar. The work-around
is as follows: when you return to the browser, click in the address bar and press `Esc`.

## Requirements
Web browser that supports `javascript:…` bookmarks/favorites.
Tested with Firefox 3.x-38.x, Safari 5.0-8.0.x, Mobile Safari 4.x-8.0.x, and IE 8.

## License
MIT License - <http://www.opensource.org/licenses/mit-license.php>

## Source Code Notes
Source code is available as text files for each bookmarklet. The JavaScript was written to
be as small as practical when URL-encoded. Sorry if it isn't easy to read. The version
number is embedded in the `void'code'` call at the end of the code in version 1.9 and later.

## Version Notes
Inspired by
[Mike Chambers' Firefox Ubiquity fyi command](http://www.mikechambers.com/blog/2009/07/13/fyi-ubiquity-command-updated/ "Mike Chambers: code=joy : Ubiquity fyi command updated").

Version 1.0 ~ April 5, 2011
First release

Version 1.1 ~ April 15, 2011
Optimized for shorter emails if no text was selected.
Adds version for IE to accommodate IE DOM method weirdness.

Versions 1.2-1.8 ~ April 2011 - December 2011
Numerous encoding tweaks.
Attempts to make each bookmarklet even 1 character shorter.
Makefile automation for use of HTML Tidy validation, jsl (JavaScript Lint) check, and
yuicompressor.

Version 1.9 ~ January 3, 2012
Streamlined message body of resulting email
Embed version number of bookmarklet in bookmarklet itself,
_e.g.,_&nbsp;<code>javascript:… void('<b>1.9</b>')</code> for version 1.9

Version 2.0 - June 10, 2012
add code in embedded version number to identify associated browser,
_e.g.,_&nbsp;<code>javascript:… void'<b>2.0ff</b>'</code> for Firefox fyi-bookmarklet 2.0

Version 2.6.1 - June 10, 2014
switched build system to grunt; use "semver-like" versioning, update README.md

Version 2.6.2 - January 16, 2015
update to grunt-contrib-uglify 0.7.x; rebuild, update README.md

Version 2.6.4 - March 28, 2015
update to grunt-contrib-uglify 0.8.x; better specify node & grunt versions; rebuild, update README.md

Version 2.6.5 - April 26, 2015
work with `node` engine 0.10.x - 0.12.x and `grunt-cli` > 0.1.0,; use `grunt-contrib-uglify` 0.8.x
