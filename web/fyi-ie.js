javascript:!function(){var e='user@domain.tld',o='';const n=encodeURIComponent(document.title),t='%250D%250A',c=document.selection;''!==(o=window.prompt('Send link to email address(es):',e))&&(location.href='mailto:'%2Bo%2B'?subject=fyi:'%2Bn%2B'&body='%2Bn%2Bt%2BencodeURIComponent(location.href)%2Bt%2B(c&&c.createRange().text?'---'%2Bt%2BencodeURIComponent(c.createRange().text)%2Bt%2Bt:t))}();void'2.9.5ie'