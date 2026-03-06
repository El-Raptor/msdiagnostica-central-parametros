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
    initDragAndDrop(groups);
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
                        <tbody id="draggable-body">
                            ${groups
                              .map(
                                (group, index) => `
                                <tr data-id="${group.CODGRUPO}" draggable="true" data-index="${index}">
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

function initDragAndDrop() {
  const tbody = document.getElementById("draggable-body");
  if (!tbody) return;

  let draggedRow = null;

  tbody.addEventListener("dragstart", (e) => {
    draggedRow = e.target.closest("tr");
    if (draggedRow) {
      // O setTimeout garante que a classe só é aplicada DEPOIS que a "imagem fantasma" do drag é criada pelo navegador
      setTimeout(() => draggedRow.classList.add("dragging"), 0);
    }
  });

  // Mostra o indicador de drop (linha verde) dependendo da posição do mouse
  tbody.addEventListener("dragover", (e) => {
    e.preventDefault(); // Necessário para permitir o drop
    const targetRow = e.target.closest("tr:not(.dragging)");

    clearDropIndicators(tbody);

    if (targetRow) {
      const bounding = targetRow.getBoundingClientRect();
      const offset = e.clientY - bounding.top;

      // Se o mouse estiver na metade de cima da linha, mostra a marcação em cima
      if (offset < bounding.height / 2) {
        targetRow.classList.add("drop-above");
      } else {
        // Caso contrário, mostra a marcação embaixo
        targetRow.classList.add("drop-below");
      }
    }
  });

  // Limpa os indicadores se o mouse sair da linha
  tbody.addEventListener("dragleave", (e) => {
    const targetRow = e.target.closest("tr");
    if (targetRow) {
      targetRow.classList.remove("drop-above", "drop-below");
    }
  });

  // Lógica principal de soltar o item e reordenar o DOM
  tbody.addEventListener("drop", (e) => {
    e.preventDefault();
    clearDropIndicators(tbody);

    const targetRow = e.target.closest("tr:not(.dragging)");
    
    if (targetRow && draggedRow) {
      const bounding = targetRow.getBoundingClientRect();
      const offset = e.clientY - bounding.top;

      // Insere a linha arrastada antes ou depois do alvo com base na posição do mouse
      if (offset < bounding.height / 2) {
        tbody.insertBefore(draggedRow, targetRow);
      } else {
        tbody.insertBefore(draggedRow, targetRow.nextSibling);
      }
    }

    if (draggedRow) {
      draggedRow.classList.remove("dragging");
      updateOrder(tbody); // Atualiza os números da coluna "Ordem"
    }
  });

  // Prevenção extra para garantir que estilos sejam limpos ao cancelar o drag
  tbody.addEventListener("dragend", () => {
    if (draggedRow) {
      draggedRow.classList.remove("dragging");
      clearDropIndicators(tbody);
      draggedRow = null;
    }
  });
}

function clearDropIndicators(tbody) {
  tbody.querySelectorAll("tr").forEach((row) => {
    row.classList.remove("drop-above", "drop-below");
  });
}


// Atualiza o índice interno e a coluna "Ordem" visível na tabela
function updateOrder(tbody) {
  const rows = tbody.querySelectorAll("tr");
  const newOrderData = [];

  rows.forEach((row, index) => {
    const novaOrdem = index + 1; // Supondo que a ordem comece em 1
    
    // Atualiza o data-index da linha
    row.setAttribute("data-index", index);

    // A coluna "Ordem" é a 3ª na tabela (índice 2)
    const ordemCell = row.querySelectorAll("td")[2];
    if (ordemCell) {
      ordemCell.textContent = novaOrdem;
    }

    // Guarda os dados se você precisar enviar pro backend depois
    newOrderData.push({
      id: row.getAttribute("data-id"),
      novaOrdem: novaOrdem
    });
  });

  console.log("Ordem alterada:", newOrderData);
}
