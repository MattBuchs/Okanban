(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}})();const d="http://localhost:3000",u=async()=>await(await fetch(`${d}/lists`)).json(),m=async t=>{const e=await fetch(`${d}/lists`,{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}});return e.ok?await e.json():null},y=async t=>{const e=await fetch(`${d}/cards`,{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}});return e.ok?await e.json():null},f=()=>{document.querySelector("#add-list-modal").classList.add("is-active")},c=()=>{const t=document.querySelector("#add-list-modal"),e=document.querySelector("#add-card-modal"),o=document.querySelectorAll(".modal-background");[t,e,...o].forEach(s=>s.classList.remove("is-active"))},p=async()=>{(await u()).forEach(e=>{l(e),e.cards.forEach(o=>i(o))})},h=()=>{document.querySelector("#show-list-modal").addEventListener("click",f)},L=()=>{const t=document.querySelectorAll(".modal-background");[...document.querySelectorAll(".close"),...t].forEach(r=>{r.addEventListener("click",c)})},S=async()=>{const t=document.querySelector("#add-list-modal form");t.addEventListener("submit",async e=>{e.preventDefault();const o=Object.fromEntries(new FormData(t));t.reset(),console.log(o);const r=await m(o);r||(alert("Error on list creation"),c()),l(r),c()})},l=async t=>{const e=document.querySelector("#list-template"),o=document.importNode(e.content,!0),r=document.querySelector("#lists-container");o.querySelector('[slot="list-name"]').textContent=t.name,o.querySelector('[slot="list-id"]').id=`list-${t.id}`,o.querySelector('[slot="add-card-button"]').addEventListener("click",n=>{n.preventDefault(),C(t.id)}),r.appendChild(o)},C=t=>{const e=document.querySelector("#add-card-modal");e.classList.add("is-active"),e.dataset.listId=t},q=async()=>{const e=document.querySelector("#add-card-modal").querySelector("form");e.addEventListener("submit",async o=>{o.preventDefault();const r=Object.fromEntries(new FormData(e)),s=document.querySelector("#add-card-modal").dataset.listId;r.list_id=s;const n=await y(r);n||alert("Error during the creation of the card"),i(n)})},i=t=>{const o=document.querySelector("#card-template").content.cloneNode(!0);o.querySelector('[slot="card-title"]').textContent=t.content,o.querySelector(".card-header").style.backgroundColor=t.color,document.querySelector(`#list-${t.list_id}`).querySelector('[slot="list-content"]').append(o),document.querySelector("#add-card-modal form").reset(),c()};document.addEventListener("DOMContentLoaded",()=>{h(),L(),S(),q(),p()});