import{r as i,a as N,j as s,L,$ as p}from"./app-CL8bQxlr.js";import{c as l}from"./index-BaUo0c8x.js";import{M,P as O,H as T,C as A}from"./CartDrawer-BVaiULN8.js";import{B as m}from"./badge-BrXa6Sqe.js";import{c as E,B as r,f as u}from"./createLucideIcon-B3Iz-h8N.js";import{C as I}from"./card-Bi6v5dWj.js";import{S as $}from"./shopping-cart-y9q7ExdO.js";import"./x-UdVWHoq3.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],B=E("ArrowLeft",q);function J({product:e,relatedProducts:h,productImages:o,auth:D}){const[y,d]=i.useState(!1),[b,v]=i.useState([]),[j,f]=i.useState(0),[t,x]=i.useState(1),[c,w]=i.useState(!1);i.useEffect(()=>{n()},[]);const n=async()=>{try{const a=await N.get(route("cart.get")),{cart:g}=a.data;v(Object.values(g)),f(Object.keys(g).length)}catch(a){console.error("Error fetching cart",a)}},k=async()=>{if(t<=0){l.error("Please select a valid quantity");return}try{const a=await N.post(route("cart.add"),{product_id:e.id,quantity:t});f(a.data.cartCount),l.success("Product added to cart!"),x(1),d(!0),n()}catch(a){console.error("Error adding to cart",a),a.response&&a.response.status===422?l.error("Not enough stock available"):l.error("Failed to add product to cart")}},C=()=>{w(!c),l.success(c?"Removed from wishlist":"Added to wishlist")},S=()=>{t<e.stock&&x(t+1)},z=()=>{t>1&&x(t-1)};return console.log("Product image:",o),s.jsxs(s.Fragment,{children:[s.jsx(L,{title:`${e.name} | PT. Menara Galvalum`}),s.jsxs("div",{className:"min-h-screen bg-gray-50",children:[s.jsx("header",{className:"sticky top-0 z-40 bg-white shadow-sm",children:s.jsx("div",{className:"container mx-auto px-4 py-4",children:s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsxs(p,{href:route("home"),className:"text-primary flex items-center text-xl font-bold",children:[s.jsx(B,{className:"mr-2 h-5 w-5"}),"PT. Menara Galvalum"]}),s.jsxs(r,{variant:"ghost",onClick:()=>{n(),d(!0)},className:"relative",children:[s.jsx($,{className:"h-5 w-5"}),j>0&&s.jsx(m,{className:"absolute -top-2 -right-2 px-1.5 py-0.5",children:j})]})]})})}),s.jsx("section",{className:"py-8",children:s.jsx("div",{className:"container mx-auto px-4",children:s.jsxs("div",{className:"grid grid-cols-1 gap-8 md:grid-cols-2",children:[s.jsx("div",{className:"rounded-lg bg-white p-4 shadow-sm",children:s.jsx("div",{className:"aspect-square overflow-hidden rounded-md bg-gray-100",children:o?s.jsx("img",{src:o,className:"h-full w-full object-cover"}):s.jsx("div",{className:"flex h-full w-full items-center justify-center bg-gray-200",children:s.jsx("span",{className:"text-gray-400",children:"No image available"})})})}),s.jsxs("div",{children:[s.jsxs("div",{className:"mb-2 flex items-center gap-2",children:[e.category&&typeof e.category=="string"?s.jsx(m,{variant:"outline",className:"font-normal",children:e.category}):null,e.stock<=5&&e.stock>0?s.jsxs(m,{variant:"destructive",children:["Sisa ",e.stock]}):e.stock<=0?s.jsx(m,{variant:"destructive",children:"Out of Stock"}):null]}),s.jsx("h1",{className:"mb-2 text-2xl font-bold md:text-3xl",children:e.name}),s.jsx("p",{className:"text-primary mb-4 text-2xl font-bold",children:u(e.price).replace(",00","")}),s.jsxs("div",{className:"mb-6",children:[s.jsx("h3",{className:"mb-2 font-medium",children:"Description"}),s.jsx("p",{className:"text-gray-600",children:e.description})]}),s.jsxs("div",{className:"mb-6",children:[s.jsx("h3",{className:"mb-2 font-medium",children:"Specifications"}),s.jsxs("ul",{className:"space-y-1 text-sm text-gray-600",children:[s.jsxs("li",{className:"flex justify-between",children:[s.jsx("span",{className:"font-medium",children:"Weight:"}),s.jsxs("span",{children:[e.weight," kg"]})]}),e.dimensions&&s.jsxs("li",{className:"flex justify-between",children:[s.jsx("span",{className:"font-medium",children:"Dimensions:"}),s.jsx("span",{children:e.dimensions})]})]})]}),s.jsxs("div",{className:"mb-6",children:[s.jsx("h3",{className:"mb-2 font-medium",children:"Quantity"}),s.jsxs("div",{className:"flex w-fit items-center rounded-md border",children:[s.jsx(r,{type:"button",variant:"ghost",size:"sm",onClick:z,disabled:t<=1||e.stock<=0,className:"h-10 px-3",children:s.jsx(M,{className:"h-4 w-4"})}),s.jsx("span",{className:"w-12 text-center",children:t}),s.jsx(r,{type:"button",variant:"ghost",size:"sm",onClick:S,disabled:t>=e.stock||e.stock<=0,className:"h-10 px-3",children:s.jsx(O,{className:"h-4 w-4"})})]})]}),s.jsxs("div",{className:"flex gap-4",children:[s.jsx(r,{onClick:k,disabled:e.stock<=0,className:"flex-grow",size:"lg",children:"Add to Cart"}),s.jsx(r,{variant:"outline",size:"lg",onClick:C,className:c?"text-primary border-primary":"",children:s.jsx(T,{className:`h-5 w-5 ${c?"fill-primary":""}`})})]})]})]})})}),h.length>0&&s.jsx("section",{className:"bg-white py-8",children:s.jsxs("div",{className:"container mx-auto px-4",children:[s.jsx("h2",{className:"mb-6 text-xl font-semibold",children:"Related Products"}),s.jsx("div",{className:"grid grid-cols-2 gap-4 md:grid-cols-4",children:h.map(a=>s.jsx(I,{className:"overflow-hidden",children:s.jsxs(p,{href:route("products.show",a.id),className:"block",children:[s.jsx("div",{className:"aspect-square bg-gray-100",children:a.image?s.jsx("img",{src:`/storage/${a}`||a.image,alt:a.name,className:"h-full w-full object-cover"}):s.jsx("div",{className:"flex h-full w-full items-center justify-center bg-gray-200",children:s.jsx("span",{className:"text-xs text-gray-400",children:"No image"})})}),s.jsxs("div",{className:"p-3",children:[s.jsx("h3",{className:"mb-1 line-clamp-1 text-sm font-medium",children:a.name}),s.jsx("p",{className:"text-primary text-sm font-bold",children:u(a.price).replace(",00","")})]})]})},a.id))})]})}),s.jsx("footer",{className:"bg-gray-800 py-8 text-white",children:s.jsx("div",{className:"container mx-auto px-4",children:s.jsxs("div",{className:"mb-4 text-center",children:[s.jsx("h3",{className:"text-xl font-semibold",children:"PT. Menara Galvalum"}),s.jsx("p",{className:"text-sm text-gray-300",children:"Jl. Adi Sucipto, Karangasem, Kec. Laweyan, Kota Surakarta, Jawa Tengah 57145"}),s.jsx("p",{className:"text-sm text-gray-300",children:"Telp: 0852-9006-0664"})]})})}),s.jsx(A,{isOpen:y,onClose:()=>d(!1),items:b,fetchCart:n})]})]})}export{J as default};
