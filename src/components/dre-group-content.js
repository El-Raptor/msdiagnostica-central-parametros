import { addGroupListener } from "./dre-form.js";

const COLS = [
  { key: "GRUPONAT", label: "Grupo", align: "left" },
  { key: "CALCULO", label: "Cálculo", align: "center" },
  { key: "ORDEM", label: "Ordem", align: "center" },
];

export function initDREGroupContent(groups) {
  const section = document.querySelector(".content");
  section.innerHTML = `
        <header class="content-header">
            <h1>Cadastro de Grupos do DRE</h1>
        </header>
        ${renderDREGroupTable(groups)}
    `;

    addGroupListener()
}

function renderDREGroupTable(groups) {
  return `
        <section class="dre-section">
            <section class="dre-table-section">
                <span class="dre-group-table-title">Grupos do DRE</span>
                <div class="table-container" id="dre-table-container">
                    <table class="dre-group-table">
                        <thead>
                            <tr>
                                ${COLS.map((col) => `<th class="align-${col.align}">${col.label}</th>`).join("")}
                                <th>
                                    <button class="btn-add-dre-group">
                                        <i class="bi bi-plus"></i>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            ${groups
                              .map(
                                (group) => `
                                <tr>
                                    ${COLS.map((col) => `<td class="align-${col.align}">${group[col.key]}</td>`).join("")}
                                    <td></td>
                                </tr>
                            `,
                              )
                              .join("")}
                        </tbody>
                    </table>
                </div>
            </section>
            <section class="dre-form-section">
            
            </section>
        </section>
    `;
}
