import{r as d}from"./app-CL8bQxlr.js";let I={data:""},O=t=>typeof window=="object"?((t?t.querySelector("#_goober"):window._goober)||Object.assign((t||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:t||I,C=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,D=/\/\*[^]*?\*\/|  +/g,A=/\n+/g,g=(t,e)=>{let a="",o="",i="";for(let r in t){let s=t[r];r[0]=="@"?r[1]=="i"?a=r+" "+s+";":o+=r[1]=="f"?g(s,r):r+"{"+g(s,r[1]=="k"?"":e)+"}":typeof s=="object"?o+=g(s,e?e.replace(/([^,])+/g,n=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,n):n?n+" "+l:l)):r):s!=null&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=g.p?g.p(r,s):r+":"+s+";")}return a+(e&&i?e+"{"+i+"}":i)+o},m={},z=t=>{if(typeof t=="object"){let e="";for(let a in t)e+=a+z(t[a]);return e}return t},S=(t,e,a,o,i)=>{let r=z(t),s=m[r]||(m[r]=(l=>{let c=0,p=11;for(;c<l.length;)p=101*p+l.charCodeAt(c++)>>>0;return"go"+p})(r));if(!m[s]){let l=r!==t?t:(c=>{let p,b,h=[{}];for(;p=C.exec(c.replace(D,""));)p[4]?h.shift():p[3]?(b=p[3].replace(A," ").trim(),h.unshift(h[0][b]=h[0][b]||{})):h[0][p[1]]=p[2].replace(A," ").trim();return h[0]})(t);m[s]=g(i?{["@keyframes "+s]:l}:l,a?"":"."+s)}let n=a&&m.g?m.g:null;return a&&(m.g=m[s]),((l,c,p,b)=>{b?c.data=c.data.replace(b,l):c.data.indexOf(l)===-1&&(c.data=p?l+c.data:c.data+l)})(m[s],e,o,n),s},_=(t,e,a)=>t.reduce((o,i,r)=>{let s=e[r];if(s&&s.call){let n=s(a),l=n&&n.props&&n.props.className||/^go/.test(n)&&n;s=l?"."+l:n&&typeof n=="object"?n.props?"":g(n,""):n===!1?"":n}return o+i+(s??"")},"");function v(t){let e=this||{},a=t.call?t(e.p):t;return S(a.unshift?a.raw?_(a,[].slice.call(arguments,1),e.p):a.reduce((o,i)=>Object.assign(o,i&&i.call?i(e.p):i),{}):a,O(e.target),e.g,e.o,e.k)}let F,$,E;v.bind({g:1});let f=v.bind({k:1});function M(t,e,a,o){g.p=e,F=t,$=a,E=o}function y(t,e){let a=this||{};return function(){let o=arguments;function i(r,s){let n=Object.assign({},r),l=n.className||i.className;a.p=Object.assign({theme:$&&$()},n),a.o=/ *go\d+/.test(l),n.className=v.apply(a,o)+(l?" "+l:"");let c=t;return t[0]&&(c=n.as||t,delete n.as),E&&c[0]&&E(n),F(c,n)}return i}}var P=t=>typeof t=="function",k=(t,e)=>P(t)?t(e):t,T=(()=>{let t=0;return()=>(++t).toString()})(),L=(()=>{let t;return()=>{if(t===void 0&&typeof window<"u"){let e=matchMedia("(prefers-reduced-motion: reduce)");t=!e||e.matches}return t}})(),q=20,N=(t,e)=>{switch(e.type){case 0:return{...t,toasts:[e.toast,...t.toasts].slice(0,q)};case 1:return{...t,toasts:t.toasts.map(r=>r.id===e.toast.id?{...r,...e.toast}:r)};case 2:let{toast:a}=e;return N(t,{type:t.toasts.find(r=>r.id===a.id)?1:0,toast:a});case 3:let{toastId:o}=e;return{...t,toasts:t.toasts.map(r=>r.id===o||o===void 0?{...r,dismissed:!0,visible:!1}:r)};case 4:return e.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(r=>r.id!==e.toastId)};case 5:return{...t,pausedAt:e.time};case 6:let i=e.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+i}))}}},H=[],w={toasts:[],pausedAt:void 0},j=t=>{w=N(w,t),H.forEach(e=>{e(w)})},J=(t,e="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:e,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...a,id:(a==null?void 0:a.id)||T()}),x=t=>(e,a)=>{let o=J(e,t,a);return j({type:2,toast:o}),o.id},u=(t,e)=>x("blank")(t,e);u.error=x("error");u.success=x("success");u.loading=x("loading");u.custom=x("custom");u.dismiss=t=>{j({type:3,toastId:t})};u.remove=t=>j({type:4,toastId:t});u.promise=(t,e,a)=>{let o=u.loading(e.loading,{...a,...a==null?void 0:a.loading});return typeof t=="function"&&(t=t()),t.then(i=>{let r=e.success?k(e.success,i):void 0;return r?u.success(r,{id:o,...a,...a==null?void 0:a.success}):u.dismiss(o),i}).catch(i=>{let r=e.error?k(e.error,i):void 0;r?u.error(r,{id:o,...a,...a==null?void 0:a.error}):u.dismiss(o)}),t};var U=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,V=f`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,W=f`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Y=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${U} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${V} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${t=>t.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${W} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Z=f`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,B=y("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${Z} 1s linear infinite;
`,G=f`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,K=f`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Q=y("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${G} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${K} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${t=>t.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,R=y("div")`
  position: absolute;
`,X=y("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,tt=f`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,et=y("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${tt} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,at=({toast:t})=>{let{icon:e,type:a,iconTheme:o}=t;return e!==void 0?typeof e=="string"?d.createElement(et,null,e):e:a==="blank"?null:d.createElement(X,null,d.createElement(B,{...o}),a!=="loading"&&d.createElement(R,null,a==="error"?d.createElement(Y,{...o}):d.createElement(Q,{...o})))},rt=t=>`
0% {transform: translate3d(0,${t*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,ot=t=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${t*-150}%,-1px) scale(.6); opacity:0;}
`,it="0%{opacity:0;} 100%{opacity:1;}",st="0%{opacity:1;} 100%{opacity:0;}",nt=y("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,lt=y("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ct=(t,e)=>{let a=t.includes("top")?1:-1,[o,i]=L()?[it,st]:[rt(a),ot(a)];return{animation:e?`${f(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${f(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}};d.memo(({toast:t,position:e,style:a,children:o})=>{let i=t.height?ct(t.position||e||"top-center",t.visible):{opacity:0},r=d.createElement(at,{toast:t}),s=d.createElement(lt,{...t.ariaProps},k(t.message,t));return d.createElement(nt,{className:t.className,style:{...i,...a,...t.style}},typeof o=="function"?o({icon:r,message:s}):d.createElement(d.Fragment,null,r,s))});M(d.createElement);v`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;export{u as c};
