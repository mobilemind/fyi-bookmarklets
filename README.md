# FYI Bookmarklets

![version](https://img.shields.io/github/package-json/v/mobilemind/fyi-bookmarklets.svg)
[![CodeQL](https://github.com/mobilemind/fyi-bookmarklets/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/mobilemind/fyi-bookmarklets/actions/workflows/codeql-analysis.yml)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/f3070b7f7ef84ecda7cbb5c1c8be2fdb)](https://www.codacy.com/gh/mobilemind/fyi-bookmarklets/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=mobilemind/fyi-bookmarklets&amp;utm_campaign=Badge_Grade)

The "fyi" bookmarklets make it easy to select text on a web page and fire off
an email that quotes the selection and includes the page title and URL.

All of that is done without you doing copy-and-paste work or back-and-forth
app switching.

Available versions include:

+ `fyi-webkit` -- optimized for iOS (iPhone/iPad/iPod) and Chrome.

+ `fyi-firefox` -- optimized for Firefox to support address bar with custom
  keyword %s argument. **DEPRECATED**- Most recent Firefox versions severely
  restrict use of `javascript:` bookmarks.

+ `fyi-ie` -- works with Internet Explorer and its (odd-to-me) DOM selected
  text methods. **NOTE**: You may be able to use _fyi-webkit_ with IE 11 or
  the Edge browser version 14 or higher. Try it.

## Install

### Desktop browser

Drag the desired bookmark to the bookmark bar or add bookmark/favorite.
Optionally edit or rename the bookmark/favorite. Firefox users may want to set
bookmark properties so the **Name** is "fyi email" and the custom **Keyword**
is "fyi" for reasons detailed in [Usage](#Usage).

+ `fyi-webkit` --
  <a href="javascript:%28%28%29%3D%3E%7Blet%20o%3D%27user%40domain.tld%27%2Ce%3D%27%27%3Bconst%20n%3DencodeURIComponent%28document.title%29%2Ct%3D%27%250D%250A%27%2Cd%3Dwindow.getSelection%28%29%3B%27%27%3D%3D%3De%26%26%28e%3Dwindow.prompt%28%27Send%20link%20to%20email%20address%28es%29%3A%27%2Co%29%29%3B%27%27%21%3D%3De%26%26%28location.href%3D%60mailto%3A%24%7Be%7D%3Fsubject%3Dfyi%3A%24%7Bn%7D%26body%3D%24%7Bn%7D%24%7Bt%7D%24%7BencodeURIComponent%28location.href%29%7D%24%7Bt%7D---%24%7Bt%7D%24%7BencodeURIComponent%28d%29%7D%24%7Bt%7D%24%7Bt%7D%60%29%7D%29%28%29%3Bvoid%272.9.2wk%27"
  title="fyi-webkit">fyi</a>

+ `fyi-firefox` --
  <a href="javascript:%28%28%29%3D%3E%7Blet%20e%3D%27user%40domain.tld%27%2Cn%3D%27%2525s%27%3Bconst%20o%3DencodeURIComponent%28document.title%29%2Ct%3D%27%250D%250A%27%2Cd%3Dwindow.getSelection%28%29%3B3%3En.length%26%26%28n%3Dwindow.prompt%28%27Send%20link%20to%20email%20address%28es%29%3A%27%2Ce%29%29%3B%27%27%21%3D%3Dn%26%26%28location.href%3D%60mailto%3A%24%7Bn%7D%3Fsubject%3Dfyi%3A%24%7Bo%7D%26body%3D%24%7Bo%7D%24%7Bt%7D%24%7BencodeURIComponent%28location.href%29%7D%24%7Bt%7D---%24%7Bt%7D%24%7BencodeURIComponent%28d%29%7D%24%7Bt%7D%24%7Bt%7D%60%29%7D%29%28%29%3Bvoid%272.9.2ff%27"
  title="fyi-firefox">fyi</a>

+ `fyi-ie` --
  <a href="javascript:%21function%28%29%7Bvar%20e%3D%27user%40domain.tld%27%2Co%3D%27%27%3Bconst%20n%3DencodeURIComponent%28document.title%29%2Ct%3D%27%250D%250A%27%2Cc%3Ddocument.selection%3B%27%27%21%3D%3D%28o%3Dwindow.prompt%28%27Send%20link%20to%20email%20address%28es%29%3A%27%2Ce%29%29%26%26%28location.href%3D%27mailto%3A%27%2Bo%2B%27%3Fsubject%3Dfyi%3A%27%2Bn%2B%27%26body%3D%27%2Bn%2Bt%2BencodeURIComponent%28location.href%29%2Bt%2B%28c%26%26c.createRange%28%29.text%3F%27---%27%2Bt%2BencodeURIComponent%28c.createRange%28%29.text%29%2Bt%2Bt%3At%29%29%7D%28%29%3Bvoid%272.9.2ie%27"
  title="fyi-ie">fyi</a>

## Usage

### General Use

Visit a web page. Activate the fyi bookmarklet (click it on bookmark bar or
use the Bookmarks/Favorites menu).

The fyi bookmarklet will open a new email with the page title in the subject
line, the page title repeated again in the body, along with the selected text
(if any text was selected), and the URL of the original page.

### Quick Use

#### PREFERRED TECHNIQUE

The preferred technique is now to use a bookmark (favorites) button for `fyi`.
The bookmark will display a default email address that you can replace. Edit
the default address found at the beginning of the bookmarklet _or_ edit the
source and rebuild it.

#### Firefox Custom Keywords

With **[Firefox Custom Keywords][firefox-keywords-url]** you _were_ able to do
something like:

_Cmd-L/Ctr-L_ `fyi user@domain.com` _Enter_

**NOTE**: Custom Keywords is a bit flakey as of 2014 due to Firefox security
precautions for redirects-- it seems to consider opening a `mailto:` from the
address bar to be a redirect.

**FURTHER NOTE**- Most recent Firefox versions severely restrict use of
`javascript:` bookmarks. I'm no longer putting significant effort into this
variation of `fyi`.

Historical use of `fyi` with _Custom Keywords_ is included below.

> Each bookmark in Firefox can have attributes including a Name, Tags, and
> a Keyword. Custom keywords can be used with a dynamic "replacement string"
> for the bookmark location (URL or javascript:…).
>
> The fyi Firefox bookmarklet can take advantage of a Custom Keyword, _and_
> a replacement string (to pre-address the email). The recommended bookmark
> **Name** is "_fyi email_" since this gives a syntax hint when using it. The
> recommended **Keyword** is "_fyi_".
>
> Given a designated keyword (ie, "fyi"), the bookmarklet can be activated by
> typing the keyword in the address bar and pressing enter. The intended
> syntax is:
>
> <code><b>fyi</b> [<i>emailAddress(es)</i>]</code>
>
> The optional argument is one or more email addresses, separated by
> semicolons. The email address(es) will be put in the TO field of the new
> email. Outlook users can include multiple recpients using syntax like:
>
> <code><b>fyi</b> <i>Lastname1,Firstname1<b>;</b>Lastname2,Firstname2<b>;
</b>&hellip;</i></code>
>
> There is a **Known Issue** with using Custom Keywords--- the current page
> URL appears properly in the email, but is over-written in the browser's
> address bar. The work-around is as follows: when you return to the browser,
> click in the address bar and press `Esc`.

## Requirements

Web browser that supports `javascript:…` bookmarks/favorites.
Tested with Firefox 3.x - 41.x, Safari 5.0 - 10.x, Mobile Safari 4.x - 10.x.
I am delightfully clueless if Internet Explorer version still works; I stopped
using Windows.

## License

MIT License - <http://opensource.org/licenses/mit-license.php>

## Source Code Notes

Source code is available as text files for each bookmarklet. The JavaScript
was written to be as small as practical when URL-encoded. Sorry if it isn't
easy to read. The version number is embedded in the `void'code'` call at the
end of the code in version 1.9 and later.

## Version Notes

Inspired by [Mike Chambers' Firefox Ubiquity fyi command][mikes-fyi-url].

Version 2.9.9 - April 27, 2022 - require node 16+, drop Travis-CI & renovate

Version 2.9.6 - September 3, 2021 - require node 14+

Version 2.9.3 - June 13, 2018 - Update to build process to use contemporary
packages

Version 2.9.2 - June 30, 2017 - Minor update to build process.

Version 2.9.0 - June 29, 2017 -
Refactor bookmarklets to leverage ES6 code. Re-write reduces use of `+`
concatenation and _deeply_ streamlines URL encoding. Stricter eslint checks.
Addresses issue reported with Chrome + Outlook.

Version 2.8.2 - June 23, 2017 -
Bump up versions of dependencies & node; stricter eslint rules

Version 2.8.1 - May 9, 2017 -
sigh. revert bookmarklet code from ES6 until UglifyJS 3 is ES6-friendly

Version 2.8.0 - April 20, 2017 -
update bookmarklet code to ES6; update build process to use eslint, yamllint,
and to provide support files for `mdl` (ruby gem ) or `markdownlint` (npm).

Version 2.7.2 - March 17, 2016 -
update to current LTS release of node 5.9

Version 2.7.1 - March 11, 2016 -
updates to README.md, and build/integration testing using contemporary
versions of node only (4.4 & 5.8)

Version 2.7.0 - October 29, 2015 -
no code changes; just updates to README.md, build and integration testing

Version 2.7.0 - August 5, 2015 -
streamline to node 0.12.x; rewrite for all platforms to prompt for email
address(es)

Version 2.6.5 - April 26, 2015 -
work with `node` engine 0.10.x - 0.12.x and `grunt-cli` > 0.1.0,; use
`grunt-contrib-uglify` 0.8.x

Version 2.6.4 - March 28, 2015 -
update to `grunt-contrib-uglify` 0.8.x; better specify node & grunt versions;
rebuild, update README.md

Version 2.6.2 - January 16, 2015 -
update to `grunt-contrib-uglify` 0.7.x; rebuild, update README.md

Version 2.6.1 - June 10, 2014 -
switched build system to grunt; use "semver-like" versioning, update README.md

Version 2.0 - June 10, 2012 -
add code in embedded version number to identify associated browser,
_e.g.,_ `javascript:… void('2.0ff')` for Firefox fyi-bookmarklet 2.0

Version 1.9 ~ January 3, 2012 -
Streamlined message body of resulting email
Embed version number of bookmarklet in bookmarklet itself,
_e.g.,_ `javascript:… void('>1.9')` for version 1.9

Versions 1.2-1.8 ~ April 2011 - December 2011 -
Numerous encoding tweaks.
Attempts to make each bookmarklet even 1 character shorter.
Makefile automation for use of HTML Tidy validation, jsl (JavaScript Lint)
check, and yuicompressor.

Version 1.1 ~ April 15, 2011 -
Optimized for shorter emails if no text was selected. Adds version for IE to
accommodate IE DOM method weirdness.

Version 1.0 ~ April 5, 2011 - First release

<!-- Reference URLs -->
[build-image]: https://travis-ci.com/mobilemind/fyi-bookmarklets.png?branch=main
[build-url]: https://travis-ci.com/mobilemind/fyi-bookmarklets
[tag-image]: https://img.shields.io/github/tag/mobilemind/fyi-bookmarklets.svg
[tag-url]: https://github.com/mobilemind/fyi-bookmarklets/tags
[dep-image]: https://david-dm.org/mobilemind/fyi-bookmarklets.svg
[dep-url]: https://david-dm.org/mobilemind/fyi-bookmarklets
[devDep-image]: https://img.shields.io/david/dev/mobilemind/fyi-bookmarklets.svg
[devDep-url]: https://david-dm.org/mobilemind/fyi-bookmarklets#info=devDependencies

[firefox-keywords-url]: http://www-archive.mozilla.org/docs/end-user/keywords.html
"Mozilla Firefox Custom Keywords"
[mikes-fyi-url]: http://www.mikechambers.com/blog/2009/07/13/fyi-ubiquity-command-updated/
"Mike Chambers: code=joy : Ubiquity fyi command updated"
