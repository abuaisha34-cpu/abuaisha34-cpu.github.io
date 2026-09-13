const KEY="evt-erp-v1";
const APP_PAGES=new Set(["dashboard","production","stock","orders","clients","recipes","finance","service"]);
let state; try{const r=localStorage.getItem(KEY);state=r?JSON.parse(r):structuredClone(EVT_SEED);}catch(e){state=structuredClone(EVT_SEED);}
if(!state.leads)state.leads=EVT_SEED.leads||[];
let session=JSON.parse(sessionStorage.getItem("evt-session")||"null");
let route=location.hash.replace("#","")|| (session?"dashboard":"home");
let ui={toast:"",menu:false};
const money=n=>new Intl.NumberFormat("uk-UA",{style:"currency",currency:"UAH",maximumFractionDigits:0}).format(n);
const num=(n,d=1)=>new Intl.NumberFormat("uk-UA",{maximumFractionDigits:d}).format(n);
const byId=(a,id)=>a.find(x=>x.id===id);
const uid=p=>p+Math.random().toString(36).slice(2,7);
function save(){localStorage.setItem(KEY,JSON.stringify(state));}
function go(id){route=id;location.hash=id==="home"?"":id;ui.menu=false;render();}
function toast(m){ui.toast=m;render();setTimeout(()=>{ui.toast="";render();},2400);}
function navSite(){
  const L=[["home","Головна"],["products","Продукція"],["about","Про компанію"],["contacts","Контакти"]];
  return `<header class="site-nav"><a class="brand" href="#home" data-go="home"><div class="brand-mark">GF</div><div><strong>ЕВТ Захід</strong><small>Грінфід</small></div></a><nav>${L.map(([i,l])=>`<button class="${route===i?"is-active":""}" data-go="${i}">${l}</button>`).join("")}${session?`<button class="btn btn-primary" data-go="dashboard">Кабінет</button>`:`<button class="btn btn-primary" data-go="login">Увійти в ERP</button>`}</nav></header>`;
}
function wrap(inner){return `<div class="site">${navSite()}<div class="section">${ui.toast?`<div class="alert alert-ok">${ui.toast}</div>`:""}</div>${inner}<footer class="site-foot">${state.company.name} · ${state.company.phone}</footer></div>`;}
function viewHome(){const c=state.company;return wrap(`<section class="hero"><div><p class="badge b-ok">Завод у с. Дідилів · з ${c.founded}</p><h1>Ефективна відгодівля тварин — Захід</h1><p>Корми <strong>Грінфід</strong> для бройлерів і свиней. Потужність ${c.capacityT} т/міс.</p><div class="toolbar"><button class="btn btn-primary" data-go="products">Каталог</button><button class="btn" data-go="contacts">Заявка</button></div></div><dl class="hero-card"><dt>Потужність</dt><dd>${c.capacityT} т/міс</dd><dt>Сервіс</dt><dd>Технолог + вет</dd><dt>Кабінет</dt><dd>ERP виробництва</dd></dl></section>`);}
function viewProducts(){return wrap(`<section class="section"><h1>Продукція Грінфід</h1><div class="prod-grid">${state.products.map(p=>`<article class="card"><span class="badge b-gold">${p.type}</span><h3>${p.name}</h3><p class="hint">${p.species}</p><p><strong>${money(p.price)}</strong> / т</p><button class="btn" data-go="contacts">Замовити</button></article>`).join("")}</div></section>`);}
function viewAbout(){const c=state.company;return wrap(`<section class="section"><h1>Про компанію</h1><div class="card"><p>${c.name}, ЄДРПОУ ${c.edrpou}.</p><p>${c.address}</p></div></section>`);}
function viewContacts(){const c=state.company;return wrap(`<section class="section"><h1>Контакти</h1><div class="grid two"><div class="card"><p><strong>${c.phone}</strong><br>${c.email}</p></div><form class="card" id="lead-form"><h2>Заявка</h2><div class="field"><label>Ім’я</label><input name="name" required></div><div class="field"><label>Господарство</label><input name="farm" required></div><div class="field"><label>Телефон</label><input name="phone" required></div><div class="field"><label>Потреба</label><textarea name="need" required></textarea></div><button class="btn btn-primary">Надіслати</button></form></div></section>`);}
function viewLogin(){return wrap(`<div class="login" style="min-height:auto"><form class="login-card" id="login-form"><div class="brand-mark">GF</div><h1>Кабінет ERP</h1><div class="field"><label>Логін</label><input name="login" id="login" required></div><div class="field"><label>Пароль</label><input name="pass" id="pass" type="password" required></div><button class="btn btn-primary" style="width:100%">Увійти</button><p class="hint">director / evt2026</p></form></div>`);}
function shell(title,body){
  const items=[["dashboard","Дашборд"],["production","Виробництво"],["stock","Склад"],["orders","Замовлення"],["clients","Клієнти"],["recipes","Рецептури"],["finance","Фінанси"],["service","Сервіс"]];
  return `<div class="app-shell"><aside class="sidebar ${ui.menu?"open":""}">${items.map(([i,l])=>`<button class="nav-btn ${route===i?"is-active":""}" data-go="${i}">${l}</button>`).join("")}<div class="sidebar-foot"><div>${session.name}<br>${session.role}</div><button class="linkish" id="logout">Вийти</button></div></aside><div class="main"><div class="topbar"><div><button class="btn menu-toggle" id="menu">Меню</button><h1>${title}</h1></div></div>${ui.toast?`<div class="alert alert-ok">${ui.toast}</div>`:""}${body}</div></div>`;
}
function table(headers,rows){return `<div class="card table-wrap"><table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`;}
function viewDash(){
  const inc=state.finance.filter(f=>f.type==="дохід").reduce((s,f)=>s+f.amount,0);
  const tons=state.products.reduce((s,p)=>s+p.stock,0);
  return shell("Дашборд",`<div class="grid kpis"><div class="card"><div class="kpi-label">Виручка</div><div class="kpi-value">${money(inc)}</div></div><div class="card"><div class="kpi-label">Склад</div><div class="kpi-value">${num(tons)} т</div></div></div>`+table(["Дата","Клієнт","т","Статус"],state.orders.slice().reverse().map(o=>`<tr><td>${o.date}</td><td>${(byId(state.clients,o.clientId)||{}).name||""}</td><td>${o.tons}</td><td>${o.status}</td></tr>`)));
}
function viewProd(){return shell("Виробництво",table(["Дата","Продукт","т","Статус"],state.batches.slice().reverse().map(b=>`<tr><td>${b.date}</td><td>${(byId(state.products,b.productId)||{}).name||""}</td><td>${b.tons}</td><td>${b.status}</td></tr>`)));}
function viewStock(){return shell("Склад",table(["SKU","Назва","Залишок"],state.products.map(p=>`<tr><td>${p.sku}</td><td>${p.name}</td><td>${num(p.stock)} т</td></tr>`))+table(["Сировина","Залишок"],state.materials.map(m=>`<tr><td>${m.name}</td><td>${num(m.stock)} ${m.unit}</td></tr>`)));}
function viewOrders(){return shell("Замовлення",table(["Дата","Клієнт","Продукт","т","Статус"],state.orders.slice().reverse().map(o=>`<tr><td>${o.date}</td><td>${(byId(state.clients,o.clientId)||{}).name||""}</td><td>${(byId(state.products,o.productId)||{}).name||""}</td><td>${o.tons}</td><td>${o.status}</td></tr>`)));}
function viewClients(){return shell("Клієнти",table(["Господарство","Регіон","Напрямок"],state.clients.map(c=>`<tr><td>${c.name}</td><td>${c.region}</td><td>${c.species}</td></tr>`)));}
function viewRecipes(){return shell("Рецептури",state.recipes.map(r=>`<div class="card"><h2>${r.name}</h2><p class="hint">${(byId(state.products,r.productId)||{}).name||""}</p></div>`).join(""));}
function viewFin(){const inc=state.finance.filter(f=>f.type==="дохід").reduce((s,f)=>s+f.amount,0);const cost=state.finance.filter(f=>f.type==="витрата").reduce((s,f)=>s+f.amount,0);return shell("Фінанси",`<div class="grid three"><div class="card"><div class="kpi-label">Дохід</div><div class="kpi-value">${money(inc)}</div></div><div class="card"><div class="kpi-label">Витрати</div><div class="kpi-value">${money(cost)}</div></div></div>`+table(["Дата","Тип","Стаття","Сума"],state.finance.slice().reverse().map(f=>`<tr><td>${f.date}</td><td>${f.type}</td><td>${f.article}</td><td>${money(f.amount)}</td></tr>`)));}
function viewService(){return shell("Сервіс",table(["Дата","Клієнт","Тема","Статус"],state.tickets.slice().reverse().map(t=>`<tr><td>${t.date}</td><td>${(byId(state.clients,t.clientId)||{}).name||""}</td><td>${t.topic}</td><td>${t.status}</td></tr>`)));}
const views={home:viewHome,products:viewProducts,about:viewAbout,contacts:viewContacts,login:viewLogin,dashboard:viewDash,production:viewProd,stock:viewStock,orders:viewOrders,clients:viewClients,recipes:viewRecipes,finance:viewFin,service:viewService};
function render(){
  if(APP_PAGES.has(route)&&!session)route="login";
  document.getElementById("app").innerHTML=(views[route]||viewHome)();
  document.querySelectorAll("[data-go]").forEach(el=>el.onclick=e=>{e.preventDefault();go(el.getAttribute("data-go"));});
  const lf=document.getElementById("login-form");
  if(lf)lf.onsubmit=e=>{e.preventDefault();const u=state.users.find(x=>x.login===lf.login.value&&x.pass===lf.pass.value);if(!u)return toast("Невірний логін");session={id:u.id,name:u.name,role:u.role};sessionStorage.setItem("evt-session",JSON.stringify(session));go("dashboard");};
  const lead=document.getElementById("lead-form");
  if(lead)lead.onsubmit=e=>{e.preventDefault();state.leads.push({id:uid("l"),date:new Date().toISOString().slice(0,10),name:lead.name.value,farm:lead.farm.value,phone:lead.phone.value,need:lead.need.value,status:"новий"});save();toast("Заявку прийнято");};
  const out=document.getElementById("logout");if(out)out.onclick=()=>{session=null;sessionStorage.removeItem("evt-session");go("home");};
  const menu=document.getElementById("menu");if(menu)menu.onclick=()=>{ui.menu=!ui.menu;render();};
}
window.addEventListener("hashchange",()=>{route=location.hash.replace("#","")||"home";render();});
render();
