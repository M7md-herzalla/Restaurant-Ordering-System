import { renderAbout } from "../pages/about.js";
import { renderHome } from "../pages/home.js";
import { renderMenu } from "../pages/menu.js";
import { renderCart } from "../pages/cart.js";
import { renderLogin } from "../pages/login.js";
import { renderRegister } from "../pages/register.js";
import { renderProfile } from "../pages/profile.js";
import { initLogin } from "./login.js";
import { initRegister } from "./register.js";
import { initProfile } from "./profile.js";
import { initSitePage } from "../../javaScript.js";
import { auth } from "./firebase-config.js";
const app=document.getElementById("app");

const routes={
     "/home": renderHome(),
  "/menu": renderMenu(),
  "/login": renderLogin(),
  "/register": renderRegister(),
  "/profile": renderProfile(),
  "/cart": renderCart(),
  "/about": renderAbout()
}

app.innerHTML = `
  <main id="routerView"></main>
`;

const view =document.getElementById("routerView");
let renderVersion = 0;
let cleanupPage=()=>{};
async function renderRouter() {
const version = ++renderVersion;
cleanupPage();
cleanupPage = () => {};

    const path=window.location.pathname.replace(/\/+$/, "") || "/";
    const guestOnly = ["/login", "/register"].includes(path);
    const protectedPage = ["/profile", "/cart"].includes(path);

if (guestOnly || protectedPage) {
  view.innerHTML = `
    <p role="status">Checking your session…</p>
  `;

  try {
    await auth.authStateReady();
  } catch (error) {
    if (version !== renderVersion) return;

    view.textContent =
      "Could not check your session. Please reload.";

    console.error("Session check error:", error);
    return;
  }

  // نتجاهل هذا الطلب إذا انتقلت لصفحة أخرى أثناء الانتظار.
  if (version !== renderVersion) return;

  if (guestOnly && auth.currentUser) {
    navigate("/profile", { replace: true });
    return;
  }

  if (protectedPage && !auth.currentUser) {
    navigate("/login", { replace: true });
    return;
  }
}


    const isAuthPage = [
  "/login",
  "/register",
  "/profile"
].includes(path);

view.classList.toggle("auth-page", isAuthPage);

document.body.classList.toggle("page-login", path === "/login");
document.body.classList.toggle("page-register", path === "/register");
document.body.classList.toggle("page-profile", path === "/profile");
    const content=routes[path];

    view.innerHTML=content || `
    <h1>Page not found</h1>
    <a href="/home" data-link>Back to Home</a>
    
    `;
    if (path === "/login") {
  cleanupPage = initLogin(navigate);
} else if (path === "/register") {
  cleanupPage = initRegister(navigate);
} else if (path === "/profile") {
  cleanupPage = initProfile(navigate);
}else if (["/home", "/menu", "/cart", "/about"].includes(path)) {
  cleanupPage = initSitePage(navigate);
}

  document.querySelectorAll("[data-link]").forEach(link => {
if (link.getAttribute("href")===path) {
    link.setAttribute("aria-current","page");
}
else{
          link.removeAttribute("aria-current");

}
  });
  }

export function navigate(path, { replace = false } = {}) {
  if (replace) {
    window.history.replaceState(null, "", path);
  } else {
    window.history.pushState(null, "", path);
  }

  renderRouter();
  window.scrollTo(0, 0);
}

document.addEventListener("click", event => {

if ( event.defaultPrevented ||
    event.button !== 0 ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    event.altKey) {
    return;
}
  const link = event.target.closest("a[data-link]");

  if ( !link ||
    link.hasAttribute("download") ||
    (link.target && link.target !== "_self")) {
    return;
  }

  const url = new URL(link.href);
  if (url.origin !== window.location.origin) return;
  event.preventDefault();
  const target = url.pathname + url.search + url.hash;
  const current=
  window.location.pathname+window.location.search+window.location.hash;

   if (target !== current) {
    navigate(target);
  }
});

window.addEventListener("popstate", renderRouter);
if (window.location.pathname==="/" || window.location.pathname==="/index.html") {
    navigate("/login",{replace: true});
}
else{
    renderRouter();
}