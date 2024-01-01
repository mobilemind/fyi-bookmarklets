# FYI Bookmarklets

![version](https://img.shields.io/github/package-json/v/mobilemind/fyi-bookmarklets.svg)
[![GitHub Super-Linter](https://github.com/mobilemind/fyi-bookmarklets/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/marketplace/actions/super-linter)
[![CodeQL](https://github.com/mobilemind/fyi-bookmarklets/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/mobilemind/fyi-bookmarklets/actions/workflows/codeql-analysis.yml)
[![NodeJS with Grunt](https://github.com/mobilemind/fyi-bookmarklets/actions/workflows/npm-grunt.yml/badge.svg)](https://github.com/mobilemind/fyi-bookmarklets/actions/workflows/npm-grunt.yml)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/f3070b7f7ef84ecda7cbb5c1c8be2fdb)](https://www.codacy.com/gh/mobilemind/fyi-bookmarklets/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=mobilemind/fyi-bookmarklets&amp;utm_campaign=Badge_Grade)

## DEPRECATED JANUARY 1, 2024

_Please use the workalike "FYI" bookmarklet found in the_
_[OpenInlets](https://github.com/mobilemind/OpenInlets) repository._

## HISTORICAL INFORMATION FOLLOWS BELOW

<br/>
The "fyi" bookmarklets make it easy to select text on a web page and fire off
an email that quotes the selection and includes the page title and URL.

All of that is done without you doing copy-and-paste work or back-and-forth
app switching.

Available versions include:

+ `fyi-webkit` -- optimized for iOS (iPhone/iPad/iPod) and Chrome.

## Install

### Desktop browser

Drag the desired bookmark to the bookmark bar or add bookmark/favorite.
Optionally edit or rename the bookmark/favorite.

>NOTE: To use drag & drop install, visit
<https://mobilemind.github.io/fyi-bookmarklets/>.
Drag & drop doesn't work on the README.md preview.

+ `fyi-webkit` --
  [fyi](javascript:%28%28%29%3D%3E%7Blet%20o%3D%27user%40domain.tld%27%2Ce%3D%27%27%3Bconst%20n%3DencodeURIComponent%28document.title%29%2Ct%3D%27%250D%250A%27%2Cd%3Dwindow.getSelection%28%29%3B%27%27%3D%3D%3De%26%26%28e%3Dwindow.prompt%28%27Send%20link%20to%20email%20address%28es%29%3A%27%2Co%29%29%3B%27%27%21%3D%3De%26%26%28location.href%3D%60mailto%3A%24%7Be%7D%3Fsubject%3Dfyi%3A%24%7Bn%7D%26body%3D%24%7Bn%7D%24%7Bt%7D%24%7BencodeURIComponent%28location.href%29%7D%24%7Bt%7D---%24%7Bt%7D%24%7BencodeURIComponent%28d%29%7D%24%7Bt%7D%24%7Bt%7D%60%29%7D%29%28%29%3Bvoid%272.9.2wk%27)

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

## Requirements

Safari browser (or perhaps Chrome) that supports `javascript:…` bookmarks/favorites.

## License

MIT License - <http://opensource.org/licenses/mit-license.php>

## Source Code Notes

Source code is available as text files for each bookmarklet. The JavaScript
was written to be as small as practical when URL-encoded. Sorry if it isn't
easy to read. The version number is embedded in the `void'code'` call at the
end of the code in version 1.9 and later.

## Version Notes

Inspired by [Mike Chambers' Firefox Ubiquity fyi command][mikes-fyi-url].

Version 3.2.0 - December 26, 2023 - Safer URL encoding, modernized lint & build

Version 3.1.0 - April 21, 2023 - Updates for nodejs.org LTS changes

Version 3.0.4 - October 20, 2022 - Updates for nodejs.org LTS changes

Version 3.0.0 - May 19, 2022 - drop Firefox and IE versions.
See release(s) 2.9.9 or earlier if you need those.

Version 2.9.9 - April 27, 2022 - require node 16+, drop Travis-CI & renovate

Version 2.9.0 - June 29, 2017 -
Refactor bookmarklets to leverage ES6 code. Re-write reduces use of `+`
concatenation and _deeply_ streamlines URL encoding. Stricter eslint checks.
Addresses issue reported with Chrome + Outlook.

Version 2.8.0 - April 20, 2017 -
update bookmarklet code to ES6; update build process to use eslint, yamllint,
and to provide support files for `mdl` (ruby gem ) or `markdownlint` (npm).

Version 2.7.0 - October 29, 2015 -
no code changes; just updates to README.md, build and integration testing

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

[mikes-fyi-url]: http://www.mikechambers.com/blog/2009/07/13/fyi-ubiquity-command-updated/
"Mike Chambers: code=joy : Ubiquity fyi command updated"
