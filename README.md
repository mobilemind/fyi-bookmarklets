FYI Bookmarklets
==========

The "fyi" bookmarklets make it easy to select text on a web page and fire off an email
that quotes the selection and includes the page title and URL.

All of that is done without you doing copy-and-paste work or back-and-forth app switching.

Available versions include:

+ **fyi-webkit** - optimized for iOS (iPhone/iPad/iPod) and Chrome
+ **fyi-firefox** - optimized for Firefox to support address bar with custom keyword %s argument
+ **fyi-ie** - works with Internet Explorer and its (odd-to-me) DOM selected text methods

Install
----------

**Desktop browser**  
Drag the desired bookmark to the bookmark bar or add bookmark/favorite.
Optionally edit or rename the bookmark/favorite. Firefox users may want to set bookmark properties
so the Name is "fyi email" the custom Keyword is "fyi" for reasons detailed in **Usage** below.

+ **fyi-webkit** - <a href="javascript:var%20r='%250A',t=encodeURIComponent(document.title);location.href='mailto:%20%3Fsubject=fyi:%20'+t+'%26body='+t+r+'--'+r+encodeURIComponent(window.getSelection())+r+'--'+r+location.href+r;" title="fyi-webkit">fyi</a>
+ **fyi-firefox** - <a href="javascript:var%20r='%250A',t=encodeURIComponent(document.title);location.href='mailto:'+('%25s'=='%s'?'%20':'%s')+'%3Fsubject=fyi:%20'+t+'%26body='+t+r+'--'+r+encodeURIComponent(window.getSelection())+r+'--'+r+location.href+r;" title="fyi-firefox">fyi</a>
+ **fyi-ie** - <a href="javascript:var%20r='%250A',t=encodeURIComponent(document.title),g=document.selection;void(location.href='mailto:%20%3Fsubject=fyi:%20'+t+'%26body='+t+r+(g%26%26g.createRange().text?('--'+r+encodeURIComponent(g.createRange().text)+r+'--'+r):'')+location.href+r+r)" title="fyi-ie">fyi</a>

**Mobile browser**  
Tap the link below, bookmark the new page and follow the instructions
on the page to turn a saved bookmark into a JavaScript bookmarklet.

+ **Setup fyi-webkit** - <a href="http://mobilemind.net/_?javascript:var%20r=%27%250A%27,t=encodeURIComponent(document.title);location.href=%27mailto:%20%3Fsubject=fyi:%20%27+t+%27%26body=%27+t+r+%27--%27+r+encodeURIComponent(window.getSelection())+r+%27--%27+r+location.href+r;" title="Setup fyi-webkit">Setup fyi</a>


Usage
----------

**General Use**  
Visit a web page.
Activate the fyi bookmarklet (click it on bookmark bar or use Bookmarks/Favorite menu).

The fyi bookmarklet will open a new email with the page title in the subject line,
the page title repeated again in the body, along with the selected text (if any text
was selected), and the URL of the original page.

**Quick Use**  
With Firefox you'll be able to do something like:
<blockquote><i>Cmd-L/Ctr-L</i> <code>fyi user@domain.com</code> <i>Enter</i></blockquote>
For details see  **Firefox Custom Keywords** below.

**Firefox Custom Keywords**  
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

<code><b>&nbsp;&nbsp;fyi</b> [<i>emailAddress(es)</i>]</code>

The optional argument is one or more email addresses, separated by semicolons.
The email address(es) will be put in the TO field of the new email. Outlook users
can include multiple recpients using syntax like:  
<code><b>&nbsp;&nbsp;fyi</b> </code>_Lastname1_,_Firstname1_;_Lastname2_,_Firstname2_;…

There is a **Known Issue** with using Custom Keywords&mdash; 
the current page URL appears properly in the email, but is over-written in the browser's
address bar. The work-around is as follows: when you return to the browser, click in the address bar
and then press `Esc`.

Requirements
----------

Web browser. Tested with Firefox 3.6 & 4.0, Safari 5.0.x, Mobile Safari 4.x, and IE 8.

License
----------

MIT License - [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)

Developer
----------

Tom King

Source Code Notes
----------

Source code is available as text files for each bookmarklet.
The JavaScript was written to be as small as practical and URL-encoded by hand.
Sorry if it isn't easy to read.

Version Notes
----------

Inspired by [Mike Chambers' Firefox Ubiquity fyi command](http://www.mikechambers.com/blog/2009/07/13/fyi-ubiquity-command-updated/ "Mike Chambers: code=joy : Ubiquity fyi command updated").

Version 1.0 ~ April 5, 2011  
First release

Version 1.1 ~ April 15, 2011  
Optimized for shorter emails if no text was selected.  
Adds version for IE to accommodate IE DOM method weirdness.

