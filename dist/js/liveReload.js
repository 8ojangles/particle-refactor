(()=>{new EventSource("/esbuild").addEventListener("change",a=>{let{added:r,removed:d,updated:n}=JSON.parse(a.data);if(!r.length&&!d.length&&n.length===1)for(let e of document.getElementsByTagName("link")){let o=new URL(e.href);if(o.host===location.host&&o.pathname===n[0]){let t=e.cloneNode();t.href=n[0]+"?"+Math.random().toString(36).slice(2),t.onload=()=>e.remove(),e.parentNode.insertBefore(t,e.nextSibling);return}}location.reload()});})();
//# sourceMappingURL=liveReload.js.map
