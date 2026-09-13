const KEY="evt-erp-v1";
const LEAD_STAGES=[{id:"новий",cls:"b-info"},{id:"в роботі",cls:"b-gold"},{id:"пропозиція",cls:"b-warn"},{id:"виграно",cls:"b-ok"},{id:"програно",cls:"b-danger"}];
const APP_PAGES=new Set(["dashboard","production","stock","orders","crm","clients","recipes","finance","service"]);
function load(){try{const r=localStorage.getItem(KEY);if(r){const p=JSON.parse(r);if(!p.leads)p.leads=structuredClone(EVT_SEED.leads);if(!p.deals)p.deals=structuredClone(EVT_SEED.deals||[]);if(!p.activities)p.activities=structuredClone(EVT_SEED.activities||[]);return p;}}catch(e){}return structuredClone(EVT_SEED);}
let state=load();
let session=JSON.parse(sessionStorage.getItem("evt-session")||"null");
let route=location.hash.replace("#","")||(session?"dashboard":"home");
let ui={toast:"",menu:false,crmTab:"pipeline"};
const money=n=>new Intl.NumberFormat("uk-UA",{style:"currency",currency:"UAH",maximumFractionDigits:0}).format(n);
const num=(n,d=1)=>new Intl.NumberFormat("uk-UA",{maximumFractionDigits:d}).format(n);
const byId=(a,id)=>a.find(x=>x.id===id);
const uid=p=>p+Math.random().toString(36).slice(2,7);
function save(){localStorage.setItem(KEY,JSON.stringify(state));}
function go(id){route=id;location.hash=id==="home"?"":id;ui.menu=false;render();}
function toast(m){ui.toast=m;render();setTimeout(()=>{ui.toast="";render();},2400);}
function leadBadge(s){return (LEAD_STAGES.find(x=>x.id===s)||LEAD_STAGES[0]).cls;}
function navSite(){
  const L=[["home","Головна"],["products","Продукція"],["about","Про компанію"],["contacts","Контакти"]];
  return `<header class="site-nav"><a class="brand" href="#home" data-go="home"><div class="brand-mark">GF</div><div><strong>ЕВТ Захід</strong><small>Грінфід</small></div></a><nav>${L.map(([i,l])=>`<button class="${route===i?"is-active":""}" data-go="${i}">${l}</button>`).join("")}${session?`<button class="btn btn-primary" data-go="dashboard">Кабінет</button>`:`<button class="btn btn-primary" data-go="login">Увійти в ERP</button>`}</nav></header>`;
}
function wrap(inner){return `<div class="site">${navSite()}<div class="section">${ui.toast?`<div class="alert-ok">${ui.toast}</div>`:""}</div>${inner}<footer class="site-foot">${state.company.name} · ${state.company.phone}</footer></div>`;}
function viewHome(){const c=state.company;return wrap(`<section class="hero"><div><p class="badge b-ok">Завод у с. Дідилів · з ${c.founded}</p><h1>Ефективна відгодівля тварин — Захід</h1><p>Корми <strong>Грінфід</strong> для бройлерів і свиней. Потужність ${c.capacityT} т/міс.</p><div class="toolbar"><button class="btn btn-primary" data-go="products">Каталог</button><button class="btn" data-go="contacts">Заявка в CRM</button></div></div><dl class="hero-card"><dt>Потужність</dt><dd>${c.capacityT} т/міс</dd><dt>Сервіс</dt><dd>Технолог + вет</dd><dt>Кабінет</dt><dd>ERP + CRM</dd></dl></section>`);}
function viewProducts(){return wrap(`<section class="section"><h1>Продукція Грінфід</h1><div class="prod-grid">${state.products.map(p=>`<article class="card"><span class="badge b-gold">${p.type}</span><h3>${p.name}</h3><p class="hint">${p.species}</p><p><strong>${money(p.price)}</strong> / т</p><button class="btn" data-go="contacts">Замовити</button></article>`).join("")}</div></section>`);}
function viewAbout(){const c=state.company;return wrap(`<section class="section"><h1>Про компанію</h1><div class="card"><p>${c.name}, ЄДРПОУ ${c.edrpou}.</p><p>${c.address}</p></div></section>`);}
function viewContacts(){const c=state.company;return wrap(`<section class="section"><h1>Контакти</h1><div class="grid two"><div class="card"><p><strong>${c.phone}</strong><br>${c.email}</p><p class="hint">Заявка одразу падає у CRM кабінету.</p></div><form class="card" id="lead-form"><h2>Заявка в CRM</h2><div class="field"><label>Ім’я</label><input name="name" required></div><div class="field"><label>Господарство</label><input name="farm" required></div><div class="field"><label>Телефон</label><input name="phone" required></div><div class="field"><label>Напрямок</label><select name="species"><option>Бройлери</option><option>Свині</option><option>Змішане</option></select></div><div class="field"><label>Потреба</label><textarea name="need" required></textarea></div><button class="btn btn-primary">Надіслати в CRM</button></form></div></section>`);}
function viewLogin(){return wrap(`<div class="login" style="min-height:auto"><form class="login-card" id="login-form"><div class="brand-mark">GF</div><h1>Кабінет ERP + CRM</h1><div class="field"><label>Логін</label><input name="login" required></div><div class="field"><label>Пароль</label><input name="pass" type="password" required></div><button class="btn btn-primary" style="width:100%">Увійти</button><p class="hint">director / evt2026</p></form></div>`);}
function shell(title,body){
  const items=[["dashboard","Дашборд"],["production","Виробництво"],["stock","Склад"],["orders","Замовлення"],["crm","CRM"],["clients","Клієнти"],["recipes","Рецептури"],["finance","Фінанси"],["service","Сервіс"]];
  return `<div class="app-shell"><aside class="sidebar ${ui.menu?"open":""}">${items.map(([i,l])=>`<button class="nav-btn ${route===i?"is-active":""}" data-go="${i}">${l}</button>`).join("")}<div class="sidebar-foot"><div>${session.name}<br>${session.role}</div><button class="linkish" id="logout">Вийти</button></div></aside><div class="main"><div class="topbar"><div><button class="btn menu-toggle" id="menu">Меню</button><h1>${title}</h1></div></div>${ui.toast?`<div class="alert-ok">${ui.toast}</div>`:""}${body}</div></div>`;
}
function table(headers,rows){return `<div class="card table-wrap"><table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`;}
function viewDash(){
  const inc=state.finance.filter(f=>f.type==="дохід").reduce((s,f)=>s+f.amount,0);
  const tons=state.products.reduce((s,p)=>s+p.stock,0);
  const open=(state.leads||[]).filter(l=>l.status!=="виграно"&&l.status!=="програно").length;
  return shell("Дашборд",`<div class="grid kpis"><div class="card"><div class="kpi-label">Виручка</div><div class="kpi-value">${money(inc)}</div></div><div class="card"><div class="kpi-label">Склад</div><div class="kpi-value">${num(tons)} т</div></div><div class="card"><div class="kpi-label">CRM</div><div class="kpi-value">${open}</div></div></div>`+table(["Дата","Клієнт","т","Статус"],state.orders.slice().reverse().map(o=>`<tr><td>${o.date}</td><td>${(byId(state.clients,o.clientId)||{}).name||""}</td><td>${o.tons}</td><td>${o.status}</td></tr>`))+`<p><button class="btn btn-primary" data-go="crm">Відкрити CRM</button></p>`);
}
function viewProd(){return shell("Виробництво",table(["Дата","Продукт","т","Статус"],state.batches.slice().reverse().map(b=>`<tr><td>${b.date}</td><td>${(byId(state.products,b.productId)||{}).name||""}</td><td>${b.tons}</td><td>${b.status}</td></tr>`)));}
function viewStock(){return shell("Склад",table(["SKU","Назва","Залишок"],state.products.map(p=>`<tr><td>${p.sku}</td><td>${p.name}</td><td>${num(p.stock)} т</td></tr>`))+table(["Сировина","Залишок"],state.materials.map(m=>`<tr><td>${m.name}</td><td>${num(m.stock)} ${m.unit}</td></tr>`)));}
function viewOrders(){return shell("Замовлення",table(["Дата","Клієнт","Продукт","т","Статус"],state.orders.slice().reverse().map(o=>`<tr><td>${o.date}</td><td>${(byId(state.clients,o.clientId)||{}).name||""}</td><td>${(byId(state.products,o.productId)||{}).name||""}</td><td>${o.tons}</td><td>${o.status}</td></tr>`)));}
function viewCrm(){
  const tab=ui.crmTab||"pipeline";
  const tabs=[["pipeline","Воронка"],["deals","Угоди"],["acts","Активності"]];
  const open=(state.leads||[]).filter(l=>l.status!=="виграно"&&l.status!=="програно");
  const pipe=(state.deals||[]).filter(d=>d.stage!=="виграно"&&d.stage!=="програно").reduce((s,d)=>s+d.amount,0);
  const won=(state.deals||[]).filter(d=>d.stage==="виграно").reduce((s,d)=>s+d.amount,0);
  let panel="";
  if(tab==="pipeline"){
    panel=`<div class="kanban">${LEAD_STAGES.map(st=>{const items=(state.leads||[]).filter(l=>l.status===st.id);return `<div class="kanban-col"><div class="kanban-head"><strong>${st.id}</strong><span class="badge ${st.cls}">${items.length}</span></div>${items.map(l=>`<article class="deal-card"><strong>${l.farm||l.name}</strong><p class="hint">${l.name} · ${l.phone}</p><p>${l.need}</p><p class="hint">${l.source||"сайт"} · ${l.date}</p><div class="toolbar"><select data-lead-stage="${l.id}">${LEAD_STAGES.map(s=>`<option ${s.id===l.status?"selected":""}>${s.id}</option>`).join("")}</select>${l.status!=="виграно"&&l.status!=="програно"?`<button class="btn btn-primary" data-convert="${l.id}">У клієнти</button>`:""}</div></article>`).join("")||`<p class="hint">Порожньо</p>`}</div>`;}).join("")}</div>`;
  }else if(tab==="deals"){
    panel=table(["Дата","Клієнт","Угода","т","Сума","Етап"],(state.deals||[]).slice().reverse().map(d=>`<tr><td>${d.date}</td><td>${(byId(state.clients,d.clientId)||{}).name||"—"}</td><td>${d.title}</td><td>${d.tons}</td><td>${money(d.amount)}</td><td><span class="badge ${leadBadge(d.stage)}">${d.stage}</span></td></tr>`));
  }else{
    panel=table(["Дата","Тип","Контакт","Текст"],(state.activities||[]).slice().reverse().map(a=>{const c=a.clientId?byId(state.clients,a.clientId):null;const l=a.leadId?byId(state.leads,a.leadId):null;return `<tr><td>${a.date}</td><td>${a.type}</td><td>${c?c.name:(l?l.farm:"—")}</td><td>${a.text}</td></tr>`;}));
  }
  const body=`<div class="grid kpis"><div class="card"><div class="kpi-label">Ліди</div><div class="kpi-value">${open.length}</div></div><div class="card"><div class="kpi-label">Воронка</div><div class="kpi-value">${money(pipe)}</div></div><div class="card"><div class="kpi-label">Виграно</div><div class="kpi-value">${money(won)}</div></div></div><div class="crm-tabs" style="margin:12px 0">${tabs.map(([id,l])=>`<button class="btn ${tab===id?"btn-primary":""}" data-crm-tab="${id}">${l}</button>`).join("")}</div>${panel}`;
  return shell("CRM продажів",body);
}
function viewClients(){return shell("Клієнти",table(["Господарство","Регіон","Напрямок"],state.clients.map(c=>`<tr><td>${c.name}</td><td>${c.region}</td><td>${c.species}</td></tr>`)));}
function viewRecipes(){return shell("Рецептури",state.recipes.map(r=>`<div class="card"><h2>${r.name}</h2><p class="hint">${(byId(state.products,r.productId)||{}).name||""}</p></div>`).join(""));}
function viewFin(){const inc=state.finance.filter(f=>f.type==="дохід").reduce((s,f)=>s+f.amount,0);const cost=state.finance.filter(f=>f.type==="витрата").reduce((s,f)=>s+f.amount,0);return shell("Фінанси",`<div class="grid three"><div class="card"><div class="kpi-label">Дохід</div><div class="kpi-value">${money(inc)}</div></div><div class="card"><div class="kpi-label">Витрати</div><div class="kpi-value">${money(cost)}</div></div></div>`+table(["Дата","Тип","Стаття","Сума"],state.finance.slice().reverse().map(f=>`<tr><td>${f.date}</td><td>${f.type}</td><td>${f.article}</td><td>${money(f.amount)}</td></tr>`)));}
function viewService(){return shell("Сервіс",table(["Дата","Клієнт","Тема","Статус"],state.tickets.slice().reverse().map(t=>`<tr><td>${t.date}</td><td>${(byId(state.clients,t.clientId)||{}).name||""}</td><td>${t.topic}</td><td>${t.status}</td></tr>`)));}
const views={home:viewHome,products:viewProducts,about:viewAbout,contacts:viewContacts,login:viewLogin,dashboard:viewDash,production:viewProd,stock:viewStock,orders:viewOrders,crm:viewCrm,clients:viewClients,recipes:viewRecipes,finance:viewFin,service:viewService};
function convertLead(id){
  const lead=byId(state.leads,id);if(!lead)return;
  const client={id:uid("c"),name:lead.farm||lead.name,region:lead.region||"Львівська",contact:lead.name,phone:lead.phone,species:lead.species||"Бройлери",heads:0,status:"активний"};
  state.clients.push(client);lead.status="виграно";
  state.deals=state.deals||[];state.activities=state.activities||[];
  state.deals.push({id:uid("d"),date:new Date().toISOString().slice(0,10),clientId:client.id,productId:state.products[0].id,title:String(lead.need||"").slice(0,60),tons:0,amount:0,stage:"в роботі",owner:session.name});
  state.activities.push({id:uid("a"),date:new Date().toISOString().slice(0,10),type:"нотатка",clientId:client.id,leadId:lead.id,text:"Лід конвертовано з сайту/воронки.",owner:session.name});
  save();toast(client.name+" у клієнтах");render();
}
function render(){
  if(APP_PAGES.has(route)&&!session)route="login";
  document.getElementById("app").innerHTML=(views[route]||viewHome)();
  document.querySelectorAll("[data-go]").forEach(el=>el.onclick=e=>{e.preventDefault();go(el.getAttribute("data-go"));});
  document.querySelectorAll("[data-crm-tab]").forEach(b=>b.onclick=()=>{ui.crmTab=b.getAttribute("data-crm-tab");render();});
  document.querySelectorAll("[data-lead-stage]").forEach(sel=>sel.onchange=()=>{const lead=byId(state.leads,sel.getAttribute("data-lead-stage"));if(!lead)return;lead.status=sel.value;save();toast("Етап: "+lead.status);render();});
  document.querySelectorAll("[data-convert]").forEach(b=>b.onclick=()=>convertLead(b.getAttribute("data-convert")));
  const lf=document.getElementById("login-form");
  if(lf)lf.onsubmit=e=>{e.preventDefault();const u=state.users.find(x=>x.login===lf.login.value&&x.pass===lf.pass.value);if(!u)return toast("Невірний логін");session={id:u.id,name:u.name,role:u.role};sessionStorage.setItem("evt-session",JSON.stringify(session));go("dashboard");};
  const lead=document.getElementById("lead-form");
  if(lead)lead.onsubmit=e=>{e.preventDefault();state.leads=state.leads||[];state.activities=state.activities||[];const id=uid("l");state.leads.push({id,date:new Date().toISOString().slice(0,10),name:lead.name.value,farm:lead.farm.value,phone:lead.phone.value,need:lead.need.value,species:lead.species.value,source:"сайт",status:"новий",owner:"Сайт Грінфід",region:""});state.activities.push({id:uid("a"),date:new Date().toISOString().slice(0,10),type:"нотатка",clientId:"",leadId:id,text:"Заявка з публічної форми сайту.",owner:"Сайт"});save();toast("Заявку прийнято. Вона вже в CRM.");};
  const out=document.getElementById("logout");if(out)out.onclick=()=>{session=null;sessionStorage.removeItem("evt-session");go("home");};
  const menu=document.getElementById("menu");if(menu)menu.onclick=()=>{ui.menu=!ui.menu;render();};
}
window.addEventListener("hashchange",()=>{route=location.hash.replace("#","")||"home";render();});
render();
