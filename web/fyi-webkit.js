javascript:{let e='user@domain.tld',o='';const n=encodeURIComponent(document.title),t='%250D%250A',d=window.getSelection();''!==(o=''===o?window.prompt('Send link to email address(es):',e):o)&&(location.href=`mailto:${o}?subject=fyi:${n}&body=${n}${t}${encodeURIComponent(location.href)}${t}---`%2Bt%2BencodeURIComponent(d)%2Bt%2Bt)}void'2.9.9wk'