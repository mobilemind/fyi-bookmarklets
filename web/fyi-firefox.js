javascript:(()=>{let e='user@domain.tld',o='%25s';const n=encodeURIComponent(document.title),t='%250D%250A',d=window.getSelection();o.length<3&&(o=window.prompt('Send link to email address(es):',e)),''!==o&&(location.href=`mailto:${o}?subject=fyi:${n}&body=${n}${t}${encodeURIComponent(location.href)}${t}---${t}${encodeURIComponent(d)}${t}${t}`)})();void'2.9.6ff'