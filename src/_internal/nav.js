import { navLinks } from "./navlink.js";
   
const navHTML = /*html*/ `
  <a class="btn btn-ghost text-xl" href="/">Gestion des erreurs</a>
  <ul>
      ${navLinks
        .map((link) => `<li><a href="${link.href}.html">${link.label}</a></li>`)
        .join("")}
  </ul>`;

export default function () {
  const nav = document.createElement("nav");
  nav.innerHTML = navHTML;
  document.body.prepend(nav);
}
  