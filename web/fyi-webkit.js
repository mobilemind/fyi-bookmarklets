javascript:let%20a='user@domain.tld',b='';const%20c=encodeURIComponent(document.title),d='%250A',e=window.getSelection();''!==(b=window.prompt('Send%20link%20to%20email%20address(es):',a))&&(location.href=%60mailto:$%7Bb%7D?subject=fyi:%20$%7Bc%7D&body=$%7Bc%7D%250A$%7Blocation.href%7D%250A$%7Be?'---%250A'+encodeURIComponent(e)+'%250A%250A':'%250A'%7D%60);void'2.8.0wk'