import{r as l,j as e,L as c,$ as r,S as n}from"./app-CL8bQxlr.js";import{B as t}from"./createLucideIcon-B3Iz-h8N.js";import{A as x}from"./app-sidebar-layout-DDY3wOZs.js";import{F as m,a as h}from"./TrashIcon-Bzmqn9-9.js";import{F as p}from"./PencilIcon-CmevCMVM.js";import"./index-JnR7gfV7.js";import"./index-C0ENdGIb.js";import"./x-UdVWHoq3.js";import"./truck-BB5-vzdL.js";import"./chevron-right-DjiEVRJu.js";const f=[{title:"Dashboard",href:"/dashboard"},{title:"Categories",href:"/categories"}];function F({categories:a}){const[i,d]=l.useState(!1),o=s=>{confirm("Are you sure you want to delete this category?")&&(d(!0),n.delete(`/categories/${s}`,{onFinish:()=>d(!1)}))};return e.jsxs(x,{breadcrumbs:f,children:[e.jsx(c,{title:"Categories"}),e.jsxs("div",{className:"flex flex-col gap-6 p-4",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h1",{className:"text-2xl font-bold text-foreground",children:"Categories"}),e.jsx(r,{href:"/categories/create",children:e.jsxs(t,{size:"sm",children:[e.jsx(m,{className:"h-4 w-4 mr-2"}),"Add Category"]})})]}),e.jsx("div",{className:"bg-card text-card-foreground dark:bg-sidebar-background rounded-xl shadow-sm overflow-hidden",children:e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full text-sm",children:[e.jsx("thead",{className:"text-xs uppercase bg-muted dark:bg-gray-800 text-muted-foreground",children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",className:"px-6 py-3 text-left",children:"Name"}),e.jsx("th",{scope:"col",className:"px-6 py-3 text-left",children:"Description"}),e.jsx("th",{scope:"col",className:"px-6 py-3 text-left",children:"Actions"})]})}),e.jsx("tbody",{children:a.length===0?e.jsx("tr",{className:"border-b dark:border-gray-800",children:e.jsx("td",{colSpan:3,className:"px-6 py-4 text-center text-muted-foreground",children:"No categories found"})}):a.map(s=>e.jsxs("tr",{className:"border-b dark:border-gray-800 hover:bg-muted/50 dark:hover:bg-gray-700",children:[e.jsx("td",{className:"px-6 py-4 font-medium",children:e.jsx(r,{href:`/categories/${s.id}`,className:"hover:underline text-foreground",children:s.name})}),e.jsx("td",{className:"px-6 py-4 text-foreground",children:s.description||"-"}),e.jsx("td",{className:"px-6 py-4",children:e.jsxs("div",{className:"flex space-x-2",children:[e.jsx(r,{href:`/categories/${s.id}/edit`,children:e.jsx(t,{variant:"outline",size:"icon",className:"h-8 w-8",children:e.jsx(p,{className:"h-4 w-4"})})}),e.jsx(t,{variant:"destructive",size:"icon",className:"h-8 w-8",onClick:()=>o(s.id),disabled:i,children:e.jsx(h,{className:"h-4 w-4"})})]})})]},s.id))})]})})})]})]})}export{F as default};
