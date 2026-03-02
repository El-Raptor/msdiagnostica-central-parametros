import {
  renderCategoryTableSection,
  initCategoryTableEvents,
} from "./category-table.js";
import { initCategoryForm } from "./category-form.js";
import { initDREGroupContent } from "./dre-group-content.js";

export function initSidebarCategoryList(groups) {
  const menu = document.querySelector("menu.items");
  const naturezas = document.getElementById("naturezas");
  const gruposDRE = document.getElementById("grupos-dre");

  naturezas.addEventListener("click", (event) => {
    // 1. Verifica se o clique foi em um dos spans gerados pela função (os grupos)
    if (event.target.classList.contains("grupo-clicavel")) {
      const codGrupo = event.target.id; // Pega o ID (que é o CODGRUPO)

      const group = groups.find(
        (g) => parseInt(g.CODGRUPO) === parseInt(codGrupo),
      );
      console.log("Grupo clicado:", group);

      initCategoryForm();
      initCategoryTableEvents();
      renderCategoryTableSection(group);

      // event.stopPropagation() evita que o clique no grupo dispare a animação do menu de novo
      event.stopPropagation();
      return;
    }

    // 2. Lógica para abrir o menu e mudar o layout (só roda se não estiver ativo)
    if (!naturezas.classList.contains("active")) {
      menu.classList.add("category--active");
      naturezas.classList.add("active");
      gruposDRE.classList.add("inactive");

      // Verifica se a lista já existe. Se não existir, insere na tela.
      if (!naturezas.querySelector(".category-group-item")) {
        naturezas.insertAdjacentHTML("beforeend", renderCategoryGroups(groups));
      }
      console.log("Menu Naturezas expandido");
    }
  });

  gruposDRE.addEventListener("click", () => {
    menu.classList.remove("category--active");
    naturezas.classList.remove("active");
    gruposDRE.classList.remove("inactive");

    const listaGerada = naturezas.querySelector(".category-group-item");
    if (listaGerada) {
      listaGerada.remove();
    }

    initDREGroupContent(groups);

    console.log("Grupos DRE clicked");
  });
}

function renderCategoryGroups(groups) {
  return `
        <div class="category-group-item"> 
            ${groups.map((group) => `<span id="${group.CODGRUPO}" class="grupo-clicavel">${group.GRUPONAT}</span>`).join("")}
        </div>
    `;
}
