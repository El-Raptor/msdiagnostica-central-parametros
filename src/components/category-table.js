import { fetchCategories } from "../model/categories.js";

let currentGroup = null;

const COLS = [
  { key: "CODNAT", label: "Código", align: "center" },
  { key: "DESCRNAT", label: "Natureza", align: "left" },
  { key: "CODNATPAI", label: "Código Pai", align: "center" },
  { key: "DESCRNATPAI", label: "Grupo Natureza", align: "left" },
];

export async function renderCategoryTableSection(group) {
  currentGroup = group;
  const tableSection = document.querySelector(".table-section");
  const categories = await fetchCategories(group.CODGRUPO);

  console.log("Renderizando tabela para o grupo:", group);
  console.log("Categorias encontradas:", categories);

  const html = `
        <span class="category-table-title">${group.GRUPONAT}</span>
        <div class="table-container">
            <table class="category-table">
                <thead>
                    <tr>
                        <th class="align-center" style="width: 50px;"></th>
                        ${COLS.map((col) => `<th class="align-${col.align}">${col.label}</th>`).join("")}
                    </tr>
                </thead>
                <tbody>
                    ${renderCategoryTableRows(categories)}
                </tbody>
            </table>
        </div>
    `;
  tableSection.innerHTML = html;
}

function renderCategoryTableRows(categories) {
  return categories
    .map(
      (category) => `
        <tr>
            <td class="align-center">
                <button class="btn-delete-row" data-id="${category.CODNAT}" title="Excluir natureza">-</button>
            </td>
            ${COLS.map((col) => `<td class="align-${col.align}">${category[col.key]}</td>`).join("")}
        </tr>
    `,
    )
    .join("");
}

export function initCategoryTableEvents() {
  const tableSection = document.querySelector(".table-section");

  tableSection.addEventListener("click", async (event) => {
    // Verifica se o clique foi em um botão de exclusão (ou dentro dele)
    const deleteBtn = event.target.closest(".btn-delete-row");

    if (deleteBtn) {
      const codnat = deleteBtn.getAttribute("data-id");

      if (confirmDelete) {
        console.log(`Iniciando exclusão da natureza: ${codnat}`);

        try {
          // 2. Aqui você chamaria sua função de API para deletar no banco de dados.
          // Exemplo: await deleteCategory(codnat);

          // nucep e codnat
          /*const primaryKeys = {NUCEP: currentGroup.CODGRUPO, CODNAT: codnat };

          JSK.excluir("AD_TSICNA", primaryKeys).then(() => {
            console.log("Registro excluído com sucesso.");
          });*/

          alert(`Natureza ${codnat} excluída com sucesso! (Simulação)`);

          // 3. Recarrega a tabela com o grupo atual para refletir a exclusão
          if (currentGroup) {
            await renderCategoryTableSection(currentGroup);
          }
        } catch (error) {
          console.error("Erro ao excluir natureza:", error);
          alert("Ocorreu um erro ao tentar excluir a natureza.");
        }
      }
    }
  });
}
