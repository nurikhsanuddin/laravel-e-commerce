import{r as o,j as n}from"./app-CL8bQxlr.js";import{P as j,r as Ne}from"./index-C0ENdGIb.js";import{u as nt,a as Pe,b as rt,f as Ie,g as st,d as _,h as $,i as at}from"./index-JnR7gfV7.js";import{c as Te,u as L,S as lt,a as ee}from"./createLucideIcon-B3Iz-h8N.js";import{c as Re,d as ct,e as it,f as dt,V as ut,h as pt,u as ft,g as mt,F as ht,i as vt,j as gt,k as xt}from"./app-sidebar-layout-DDY3wOZs.js";import{u as St}from"./index-Cl3G-rYn.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wt=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],yt=Te("Check",wt);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ct=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],Ee=Te("ChevronDown",Ct);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const It=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],Tt=Te("ChevronUp",It);function _e(t,[r,e]){return Math.min(e,Math.max(r,t))}var bt=[" ","Enter","ArrowUp","ArrowDown"],Pt=[" ","Enter"],se="Select",[ie,de,_t]=st(se),[te,fo]=rt(se,[_t,Re]),ue=Re(),[Nt,G]=te(se),[Rt,Et]=te(se),je=t=>{const{__scopeSelect:r,children:e,open:i,defaultOpen:c,onOpenChange:p,value:a,defaultValue:l,onValueChange:s,dir:f,name:g,autoComplete:w,disabled:b,required:P,form:T}=t,d=ue(r),[v,y]=o.useState(null),[u,h]=o.useState(null),[M,A]=o.useState(!1),oe=nt(f),[N=!1,D]=Pe({prop:i,defaultProp:c,onChange:p}),[W,Y]=Pe({prop:a,defaultProp:l,onChange:s}),V=o.useRef(null),B=v?T||!!v.closest("form"):!0,[z,H]=o.useState(new Set),F=Array.from(z).map(R=>R.props.value).join(";");return n.jsx(ct,{...d,children:n.jsxs(Nt,{required:P,scope:r,trigger:v,onTriggerChange:y,valueNode:u,onValueNodeChange:h,valueNodeHasChildren:M,onValueNodeHasChildrenChange:A,contentId:Ie(),value:W,onValueChange:Y,open:N,onOpenChange:D,dir:oe,triggerPointerDownPosRef:V,disabled:b,children:[n.jsx(ie.Provider,{scope:r,children:n.jsx(Rt,{scope:t.__scopeSelect,onNativeOptionAdd:o.useCallback(R=>{H(k=>new Set(k).add(R))},[]),onNativeOptionRemove:o.useCallback(R=>{H(k=>{const U=new Set(k);return U.delete(R),U})},[]),children:e})}),B?n.jsxs(et,{"aria-hidden":!0,required:P,tabIndex:-1,name:g,autoComplete:w,value:W,onChange:R=>Y(R.target.value),disabled:b,form:T,children:[W===void 0?n.jsx("option",{value:""}):null,Array.from(z)]},F):null]})})};je.displayName=se;var Me="SelectTrigger",Ae=o.forwardRef((t,r)=>{const{__scopeSelect:e,disabled:i=!1,...c}=t,p=ue(e),a=G(Me,e),l=a.disabled||i,s=L(r,a.onTriggerChange),f=de(e),g=o.useRef("touch"),[w,b,P]=tt(d=>{const v=f().filter(h=>!h.disabled),y=v.find(h=>h.value===a.value),u=ot(v,d,y);u!==void 0&&a.onValueChange(u.value)}),T=d=>{l||(a.onOpenChange(!0),P()),d&&(a.triggerPointerDownPosRef.current={x:Math.round(d.pageX),y:Math.round(d.pageY)})};return n.jsx(it,{asChild:!0,...p,children:n.jsx(j.button,{type:"button",role:"combobox","aria-controls":a.contentId,"aria-expanded":a.open,"aria-required":a.required,"aria-autocomplete":"none",dir:a.dir,"data-state":a.open?"open":"closed",disabled:l,"data-disabled":l?"":void 0,"data-placeholder":Qe(a.value)?"":void 0,...c,ref:s,onClick:_(c.onClick,d=>{d.currentTarget.focus(),g.current!=="mouse"&&T(d)}),onPointerDown:_(c.onPointerDown,d=>{g.current=d.pointerType;const v=d.target;v.hasPointerCapture(d.pointerId)&&v.releasePointerCapture(d.pointerId),d.button===0&&d.ctrlKey===!1&&d.pointerType==="mouse"&&(T(d),d.preventDefault())}),onKeyDown:_(c.onKeyDown,d=>{const v=w.current!=="";!(d.ctrlKey||d.altKey||d.metaKey)&&d.key.length===1&&b(d.key),!(v&&d.key===" ")&&bt.includes(d.key)&&(T(),d.preventDefault())})})})});Ae.displayName=Me;var Oe="SelectValue",De=o.forwardRef((t,r)=>{const{__scopeSelect:e,className:i,style:c,children:p,placeholder:a="",...l}=t,s=G(Oe,e),{onValueNodeHasChildrenChange:f}=s,g=p!==void 0,w=L(r,s.onValueNodeChange);return $(()=>{f(g)},[f,g]),n.jsx(j.span,{...l,ref:w,style:{pointerEvents:"none"},children:Qe(s.value)?n.jsx(n.Fragment,{children:a}):p})});De.displayName=Oe;var jt="SelectIcon",ke=o.forwardRef((t,r)=>{const{__scopeSelect:e,children:i,...c}=t;return n.jsx(j.span,{"aria-hidden":!0,...c,ref:r,children:i||"▼"})});ke.displayName=jt;var Mt="SelectPortal",Le=t=>n.jsx(dt,{asChild:!0,...t});Le.displayName=Mt;var J="SelectContent",Ve=o.forwardRef((t,r)=>{const e=G(J,t.__scopeSelect),[i,c]=o.useState();if($(()=>{c(new DocumentFragment)},[]),!e.open){const p=i;return p?Ne.createPortal(n.jsx(Be,{scope:t.__scopeSelect,children:n.jsx(ie.Slot,{scope:t.__scopeSelect,children:n.jsx("div",{children:t.children})})}),p):null}return n.jsx(He,{...t,ref:r})});Ve.displayName=J;var O=10,[Be,q]=te(J),At="SelectContentImpl",He=o.forwardRef((t,r)=>{const{__scopeSelect:e,position:i="item-aligned",onCloseAutoFocus:c,onEscapeKeyDown:p,onPointerDownOutside:a,side:l,sideOffset:s,align:f,alignOffset:g,arrowPadding:w,collisionBoundary:b,collisionPadding:P,sticky:T,hideWhenDetached:d,avoidCollisions:v,...y}=t,u=G(J,e),[h,M]=o.useState(null),[A,oe]=o.useState(null),N=L(r,m=>M(m)),[D,W]=o.useState(null),[Y,V]=o.useState(null),B=de(e),[z,H]=o.useState(!1),F=o.useRef(!1);o.useEffect(()=>{if(h)return pt(h)},[h]),ft();const R=o.useCallback(m=>{const[I,...E]=B().map(S=>S.ref.current),[C]=E.slice(-1),x=document.activeElement;for(const S of m)if(S===x||(S==null||S.scrollIntoView({block:"nearest"}),S===I&&A&&(A.scrollTop=0),S===C&&A&&(A.scrollTop=A.scrollHeight),S==null||S.focus(),document.activeElement!==x))return},[B,A]),k=o.useCallback(()=>R([D,h]),[R,D,h]);o.useEffect(()=>{z&&k()},[z,k]);const{onOpenChange:U,triggerPointerDownPosRef:K}=u;o.useEffect(()=>{if(h){let m={x:0,y:0};const I=C=>{var x,S;m={x:Math.abs(Math.round(C.pageX)-(((x=K.current)==null?void 0:x.x)??0)),y:Math.abs(Math.round(C.pageY)-(((S=K.current)==null?void 0:S.y)??0))}},E=C=>{m.x<=10&&m.y<=10?C.preventDefault():h.contains(C.target)||U(!1),document.removeEventListener("pointermove",I),K.current=null};return K.current!==null&&(document.addEventListener("pointermove",I),document.addEventListener("pointerup",E,{capture:!0,once:!0})),()=>{document.removeEventListener("pointermove",I),document.removeEventListener("pointerup",E,{capture:!0})}}},[h,U,K]),o.useEffect(()=>{const m=()=>U(!1);return window.addEventListener("blur",m),window.addEventListener("resize",m),()=>{window.removeEventListener("blur",m),window.removeEventListener("resize",m)}},[U]);const[pe,ae]=tt(m=>{const I=B().filter(x=>!x.disabled),E=I.find(x=>x.ref.current===document.activeElement),C=ot(I,m,E);C&&setTimeout(()=>C.ref.current.focus())}),fe=o.useCallback((m,I,E)=>{const C=!F.current&&!E;(u.value!==void 0&&u.value===I||C)&&(W(m),C&&(F.current=!0))},[u.value]),me=o.useCallback(()=>h==null?void 0:h.focus(),[h]),Q=o.useCallback((m,I,E)=>{const C=!F.current&&!E;(u.value!==void 0&&u.value===I||C)&&V(m)},[u.value]),le=i==="popper"?xe:Fe,ne=le===xe?{side:l,sideOffset:s,align:f,alignOffset:g,arrowPadding:w,collisionBoundary:b,collisionPadding:P,sticky:T,hideWhenDetached:d,avoidCollisions:v}:{};return n.jsx(Be,{scope:e,content:h,viewport:A,onViewportChange:oe,itemRefCallback:fe,selectedItem:D,onItemLeave:me,itemTextRefCallback:Q,focusSelectedItem:k,selectedItemText:Y,position:i,isPositioned:z,searchRef:pe,children:n.jsx(mt,{as:lt,allowPinchZoom:!0,children:n.jsx(ht,{asChild:!0,trapped:u.open,onMountAutoFocus:m=>{m.preventDefault()},onUnmountAutoFocus:_(c,m=>{var I;(I=u.trigger)==null||I.focus({preventScroll:!0}),m.preventDefault()}),children:n.jsx(vt,{asChild:!0,disableOutsidePointerEvents:!0,onEscapeKeyDown:p,onPointerDownOutside:a,onFocusOutside:m=>m.preventDefault(),onDismiss:()=>u.onOpenChange(!1),children:n.jsx(le,{role:"listbox",id:u.contentId,"data-state":u.open?"open":"closed",dir:u.dir,onContextMenu:m=>m.preventDefault(),...y,...ne,onPlaced:()=>H(!0),ref:N,style:{display:"flex",flexDirection:"column",outline:"none",...y.style},onKeyDown:_(y.onKeyDown,m=>{const I=m.ctrlKey||m.altKey||m.metaKey;if(m.key==="Tab"&&m.preventDefault(),!I&&m.key.length===1&&ae(m.key),["ArrowUp","ArrowDown","Home","End"].includes(m.key)){let C=B().filter(x=>!x.disabled).map(x=>x.ref.current);if(["ArrowUp","End"].includes(m.key)&&(C=C.slice().reverse()),["ArrowUp","ArrowDown"].includes(m.key)){const x=m.target,S=C.indexOf(x);C=C.slice(S+1)}setTimeout(()=>R(C)),m.preventDefault()}})})})})})})});He.displayName=At;var Ot="SelectItemAlignedPosition",Fe=o.forwardRef((t,r)=>{const{__scopeSelect:e,onPlaced:i,...c}=t,p=G(J,e),a=q(J,e),[l,s]=o.useState(null),[f,g]=o.useState(null),w=L(r,N=>g(N)),b=de(e),P=o.useRef(!1),T=o.useRef(!0),{viewport:d,selectedItem:v,selectedItemText:y,focusSelectedItem:u}=a,h=o.useCallback(()=>{if(p.trigger&&p.valueNode&&l&&f&&d&&v&&y){const N=p.trigger.getBoundingClientRect(),D=f.getBoundingClientRect(),W=p.valueNode.getBoundingClientRect(),Y=y.getBoundingClientRect();if(p.dir!=="rtl"){const x=Y.left-D.left,S=W.left-x,X=N.left-S,Z=N.width+X,he=Math.max(Z,D.width),ve=window.innerWidth-O,ge=_e(S,[O,Math.max(O,ve-he)]);l.style.minWidth=Z+"px",l.style.left=ge+"px"}else{const x=D.right-Y.right,S=window.innerWidth-W.right-x,X=window.innerWidth-N.right-S,Z=N.width+X,he=Math.max(Z,D.width),ve=window.innerWidth-O,ge=_e(S,[O,Math.max(O,ve-he)]);l.style.minWidth=Z+"px",l.style.right=ge+"px"}const V=b(),B=window.innerHeight-O*2,z=d.scrollHeight,H=window.getComputedStyle(f),F=parseInt(H.borderTopWidth,10),R=parseInt(H.paddingTop,10),k=parseInt(H.borderBottomWidth,10),U=parseInt(H.paddingBottom,10),K=F+R+z+U+k,pe=Math.min(v.offsetHeight*5,K),ae=window.getComputedStyle(d),fe=parseInt(ae.paddingTop,10),me=parseInt(ae.paddingBottom,10),Q=N.top+N.height/2-O,le=B-Q,ne=v.offsetHeight/2,m=v.offsetTop+ne,I=F+R+m,E=K-I;if(I<=Q){const x=V.length>0&&v===V[V.length-1].ref.current;l.style.bottom="0px";const S=f.clientHeight-d.offsetTop-d.offsetHeight,X=Math.max(le,ne+(x?me:0)+S+k),Z=I+X;l.style.height=Z+"px"}else{const x=V.length>0&&v===V[0].ref.current;l.style.top="0px";const X=Math.max(Q,F+d.offsetTop+(x?fe:0)+ne)+E;l.style.height=X+"px",d.scrollTop=I-Q+d.offsetTop}l.style.margin=`${O}px 0`,l.style.minHeight=pe+"px",l.style.maxHeight=B+"px",i==null||i(),requestAnimationFrame(()=>P.current=!0)}},[b,p.trigger,p.valueNode,l,f,d,v,y,p.dir,i]);$(()=>h(),[h]);const[M,A]=o.useState();$(()=>{f&&A(window.getComputedStyle(f).zIndex)},[f]);const oe=o.useCallback(N=>{N&&T.current===!0&&(h(),u==null||u(),T.current=!1)},[h,u]);return n.jsx(kt,{scope:e,contentWrapper:l,shouldExpandOnScrollRef:P,onScrollButtonChange:oe,children:n.jsx("div",{ref:s,style:{display:"flex",flexDirection:"column",position:"fixed",zIndex:M},children:n.jsx(j.div,{...c,ref:w,style:{boxSizing:"border-box",maxHeight:"100%",...c.style}})})})});Fe.displayName=Ot;var Dt="SelectPopperPosition",xe=o.forwardRef((t,r)=>{const{__scopeSelect:e,align:i="start",collisionPadding:c=O,...p}=t,a=ue(e);return n.jsx(gt,{...a,...p,ref:r,align:i,collisionPadding:c,style:{boxSizing:"border-box",...p.style,"--radix-select-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-select-content-available-width":"var(--radix-popper-available-width)","--radix-select-content-available-height":"var(--radix-popper-available-height)","--radix-select-trigger-width":"var(--radix-popper-anchor-width)","--radix-select-trigger-height":"var(--radix-popper-anchor-height)"}})});xe.displayName=Dt;var[kt,be]=te(J,{}),Se="SelectViewport",Ue=o.forwardRef((t,r)=>{const{__scopeSelect:e,nonce:i,...c}=t,p=q(Se,e),a=be(Se,e),l=L(r,p.onViewportChange),s=o.useRef(0);return n.jsxs(n.Fragment,{children:[n.jsx("style",{dangerouslySetInnerHTML:{__html:"[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"},nonce:i}),n.jsx(ie.Slot,{scope:e,children:n.jsx(j.div,{"data-radix-select-viewport":"",role:"presentation",...c,ref:l,style:{position:"relative",flex:1,overflow:"hidden auto",...c.style},onScroll:_(c.onScroll,f=>{const g=f.currentTarget,{contentWrapper:w,shouldExpandOnScrollRef:b}=a;if(b!=null&&b.current&&w){const P=Math.abs(s.current-g.scrollTop);if(P>0){const T=window.innerHeight-O*2,d=parseFloat(w.style.minHeight),v=parseFloat(w.style.height),y=Math.max(d,v);if(y<T){const u=y+P,h=Math.min(T,u),M=u-h;w.style.height=h+"px",w.style.bottom==="0px"&&(g.scrollTop=M>0?M:0,w.style.justifyContent="flex-end")}}}s.current=g.scrollTop})})})]})});Ue.displayName=Se;var We="SelectGroup",[Lt,Vt]=te(We),Bt=o.forwardRef((t,r)=>{const{__scopeSelect:e,...i}=t,c=Ie();return n.jsx(Lt,{scope:e,id:c,children:n.jsx(j.div,{role:"group","aria-labelledby":c,...i,ref:r})})});Bt.displayName=We;var ze="SelectLabel",Ht=o.forwardRef((t,r)=>{const{__scopeSelect:e,...i}=t,c=Vt(ze,e);return n.jsx(j.div,{id:c.id,...i,ref:r})});Ht.displayName=ze;var ce="SelectItem",[Ft,Ke]=te(ce),$e=o.forwardRef((t,r)=>{const{__scopeSelect:e,value:i,disabled:c=!1,textValue:p,...a}=t,l=G(ce,e),s=q(ce,e),f=l.value===i,[g,w]=o.useState(p??""),[b,P]=o.useState(!1),T=L(r,u=>{var h;return(h=s.itemRefCallback)==null?void 0:h.call(s,u,i,c)}),d=Ie(),v=o.useRef("touch"),y=()=>{c||(l.onValueChange(i),l.onOpenChange(!1))};if(i==="")throw new Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");return n.jsx(Ft,{scope:e,value:i,disabled:c,textId:d,isSelected:f,onItemTextChange:o.useCallback(u=>{w(h=>h||((u==null?void 0:u.textContent)??"").trim())},[]),children:n.jsx(ie.ItemSlot,{scope:e,value:i,disabled:c,textValue:g,children:n.jsx(j.div,{role:"option","aria-labelledby":d,"data-highlighted":b?"":void 0,"aria-selected":f&&b,"data-state":f?"checked":"unchecked","aria-disabled":c||void 0,"data-disabled":c?"":void 0,tabIndex:c?void 0:-1,...a,ref:T,onFocus:_(a.onFocus,()=>P(!0)),onBlur:_(a.onBlur,()=>P(!1)),onClick:_(a.onClick,()=>{v.current!=="mouse"&&y()}),onPointerUp:_(a.onPointerUp,()=>{v.current==="mouse"&&y()}),onPointerDown:_(a.onPointerDown,u=>{v.current=u.pointerType}),onPointerMove:_(a.onPointerMove,u=>{var h;v.current=u.pointerType,c?(h=s.onItemLeave)==null||h.call(s):v.current==="mouse"&&u.currentTarget.focus({preventScroll:!0})}),onPointerLeave:_(a.onPointerLeave,u=>{var h;u.currentTarget===document.activeElement&&((h=s.onItemLeave)==null||h.call(s))}),onKeyDown:_(a.onKeyDown,u=>{var M;((M=s.searchRef)==null?void 0:M.current)!==""&&u.key===" "||(Pt.includes(u.key)&&y(),u.key===" "&&u.preventDefault())})})})})});$e.displayName=ce;var re="SelectItemText",Ge=o.forwardRef((t,r)=>{const{__scopeSelect:e,className:i,style:c,...p}=t,a=G(re,e),l=q(re,e),s=Ke(re,e),f=Et(re,e),[g,w]=o.useState(null),b=L(r,y=>w(y),s.onItemTextChange,y=>{var u;return(u=l.itemTextRefCallback)==null?void 0:u.call(l,y,s.value,s.disabled)}),P=g==null?void 0:g.textContent,T=o.useMemo(()=>n.jsx("option",{value:s.value,disabled:s.disabled,children:P},s.value),[s.disabled,s.value,P]),{onNativeOptionAdd:d,onNativeOptionRemove:v}=f;return $(()=>(d(T),()=>v(T)),[d,v,T]),n.jsxs(n.Fragment,{children:[n.jsx(j.span,{id:s.textId,...p,ref:b}),s.isSelected&&a.valueNode&&!a.valueNodeHasChildren?Ne.createPortal(p.children,a.valueNode):null]})});Ge.displayName=re;var qe="SelectItemIndicator",Ye=o.forwardRef((t,r)=>{const{__scopeSelect:e,...i}=t;return Ke(qe,e).isSelected?n.jsx(j.span,{"aria-hidden":!0,...i,ref:r}):null});Ye.displayName=qe;var we="SelectScrollUpButton",Xe=o.forwardRef((t,r)=>{const e=q(we,t.__scopeSelect),i=be(we,t.__scopeSelect),[c,p]=o.useState(!1),a=L(r,i.onScrollButtonChange);return $(()=>{if(e.viewport&&e.isPositioned){let l=function(){const f=s.scrollTop>0;p(f)};const s=e.viewport;return l(),s.addEventListener("scroll",l),()=>s.removeEventListener("scroll",l)}},[e.viewport,e.isPositioned]),c?n.jsx(Je,{...t,ref:a,onAutoScroll:()=>{const{viewport:l,selectedItem:s}=e;l&&s&&(l.scrollTop=l.scrollTop-s.offsetHeight)}}):null});Xe.displayName=we;var ye="SelectScrollDownButton",Ze=o.forwardRef((t,r)=>{const e=q(ye,t.__scopeSelect),i=be(ye,t.__scopeSelect),[c,p]=o.useState(!1),a=L(r,i.onScrollButtonChange);return $(()=>{if(e.viewport&&e.isPositioned){let l=function(){const f=s.scrollHeight-s.clientHeight,g=Math.ceil(s.scrollTop)<f;p(g)};const s=e.viewport;return l(),s.addEventListener("scroll",l),()=>s.removeEventListener("scroll",l)}},[e.viewport,e.isPositioned]),c?n.jsx(Je,{...t,ref:a,onAutoScroll:()=>{const{viewport:l,selectedItem:s}=e;l&&s&&(l.scrollTop=l.scrollTop+s.offsetHeight)}}):null});Ze.displayName=ye;var Je=o.forwardRef((t,r)=>{const{__scopeSelect:e,onAutoScroll:i,...c}=t,p=q("SelectScrollButton",e),a=o.useRef(null),l=de(e),s=o.useCallback(()=>{a.current!==null&&(window.clearInterval(a.current),a.current=null)},[]);return o.useEffect(()=>()=>s(),[s]),$(()=>{var g;const f=l().find(w=>w.ref.current===document.activeElement);(g=f==null?void 0:f.ref.current)==null||g.scrollIntoView({block:"nearest"})},[l]),n.jsx(j.div,{"aria-hidden":!0,...c,ref:r,style:{flexShrink:0,...c.style},onPointerDown:_(c.onPointerDown,()=>{a.current===null&&(a.current=window.setInterval(i,50))}),onPointerMove:_(c.onPointerMove,()=>{var f;(f=p.onItemLeave)==null||f.call(p),a.current===null&&(a.current=window.setInterval(i,50))}),onPointerLeave:_(c.onPointerLeave,()=>{s()})})}),Ut="SelectSeparator",Wt=o.forwardRef((t,r)=>{const{__scopeSelect:e,...i}=t;return n.jsx(j.div,{"aria-hidden":!0,...i,ref:r})});Wt.displayName=Ut;var Ce="SelectArrow",zt=o.forwardRef((t,r)=>{const{__scopeSelect:e,...i}=t,c=ue(e),p=G(Ce,e),a=q(Ce,e);return p.open&&a.position==="popper"?n.jsx(xt,{...c,...i,ref:r}):null});zt.displayName=Ce;function Qe(t){return t===""||t===void 0}var et=o.forwardRef((t,r)=>{const{value:e,...i}=t,c=o.useRef(null),p=L(r,c),a=St(e);return o.useEffect(()=>{const l=c.current,s=window.HTMLSelectElement.prototype,g=Object.getOwnPropertyDescriptor(s,"value").set;if(a!==e&&g){const w=new Event("change",{bubbles:!0});g.call(l,e),l.dispatchEvent(w)}},[a,e]),n.jsx(ut,{asChild:!0,children:n.jsx("select",{...i,ref:p,defaultValue:e})})});et.displayName="BubbleSelect";function tt(t){const r=at(t),e=o.useRef(""),i=o.useRef(0),c=o.useCallback(a=>{const l=e.current+a;r(l),function s(f){e.current=f,window.clearTimeout(i.current),f!==""&&(i.current=window.setTimeout(()=>s(""),1e3))}(l)},[r]),p=o.useCallback(()=>{e.current="",window.clearTimeout(i.current)},[]);return o.useEffect(()=>()=>window.clearTimeout(i.current),[]),[e,c,p]}function ot(t,r,e){const c=r.length>1&&Array.from(r).every(f=>f===r[0])?r[0]:r,p=e?t.indexOf(e):-1;let a=Kt(t,Math.max(p,0));c.length===1&&(a=a.filter(f=>f!==e));const s=a.find(f=>f.textValue.toLowerCase().startsWith(c.toLowerCase()));return s!==e?s:void 0}function Kt(t,r){return t.map((e,i)=>t[(r+i)%t.length])}var $t=je,Gt=Ae,qt=De,Yt=ke,Xt=Le,Zt=Ve,Jt=Ue,Qt=$e,eo=Ge,to=Ye,oo=Xe,no=Ze;function mo({...t}){return n.jsx($t,{"data-slot":"select",...t})}function ho({...t}){return n.jsx(qt,{"data-slot":"select-value",...t})}function vo({className:t,children:r,...e}){return n.jsxs(Gt,{"data-slot":"select-trigger",className:ee("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex h-9 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&>span]:line-clamp-1",t),...e,children:[r,n.jsx(Yt,{asChild:!0,children:n.jsx(Ee,{className:"size-4 opacity-50"})})]})}function go({className:t,children:r,position:e="popper",...i}){return n.jsx(Xt,{children:n.jsxs(Zt,{"data-slot":"select-content",className:ee("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md",e==="popper"&&"data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",t),position:e,...i,children:[n.jsx(ro,{}),n.jsx(Jt,{className:ee("p-1",e==="popper"&&"h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),children:r}),n.jsx(so,{})]})})}function xo({className:t,children:r,...e}){return n.jsxs(Qt,{"data-slot":"select-item",className:ee("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",t),...e,children:[n.jsx("span",{className:"absolute right-2 flex size-3.5 items-center justify-center",children:n.jsx(to,{children:n.jsx(yt,{className:"size-4"})})}),n.jsx(eo,{children:r})]})}function ro({className:t,...r}){return n.jsx(oo,{"data-slot":"select-scroll-up-button",className:ee("flex cursor-default items-center justify-center py-1",t),...r,children:n.jsx(Tt,{className:"size-4"})})}function so({className:t,...r}){return n.jsx(no,{"data-slot":"select-scroll-down-button",className:ee("flex cursor-default items-center justify-center py-1",t),...r,children:n.jsx(Ee,{className:"size-4"})})}export{mo as S,vo as a,ho as b,go as c,xo as d};
