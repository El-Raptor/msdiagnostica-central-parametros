import { fetchCalc } from "../model/calculation.js";

export function addGroupListener() {
    const addBtn = document.querySelector(".btn-add-dre-group")

    if (addBtn) {
        addBtn.addEventListener("click", event => {
            renderForm()
        })
    }
}

function renderForm() {
    const dreForm = document.querySelector(".dre-form-section")

    dreForm.innerHTML = `
        <form>
            <div class="new-group-header">
                <h2>Novo Grupo</h2>
            </div>
            <div class=dre-fields-container>
                <div class="field-group-wrap">
                    <label for="group-name">Nome do Grupo do DRE</label>
                    <input type="text" id="group-name" name="group-name" />
                </div>
                <div class="calc-n-order-fields">
                    <div class="field-calc-wrap">
                        <label for="calc">Cálculo</label>
                        <div class="calc-input">
                            <button type="button" class=btn-search-calc title="Buscar Cálculo">
                                <i class="bi bi-search"></i>
                            </button>
                            <input type="text" id="calc" name="calc" autocomplete="off" placeholder="Digite ou busque..." />

                            <ul id="calc-dropdown" class="dropdown-list"></ul>
                        </div>
                    </div>
                    <div class="field-order-wrap">
                        <label for="order">Ordem</label>
                        <input type="number" id="order" name="order" />
                    </div>
                </div>
            </div>
            <div class="submit-container">
                <button type="submit" class="btn-save">
                    Salvar
                </button>
            </div>
        </form>
    `;

    initCalcAutocomplete();
}

function initCalcAutocomplete() {
    const input = document.getElementById("calc");
    const btnSearch = document.querySelector(".btn-search-calc");
    const dropdown = document.getElementById("calc-dropdown");
    const calculations = fetchCalc(); // Busca os dados do seu arquivo

    // Função para renderizar os itens na lista
    function renderDropdown(items) {
        dropdown.innerHTML = ""; // Limpa a lista atual
        
        if (items.length === 0) {
            dropdown.innerHTML = "<li class='no-results'>Nenhum cálculo encontrado</li>";
            dropdown.classList.add("show");
            return;
        }

        items.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.NOME; // Mostra apenas o nome visualmente
            
            // Quando clicar em um item da lista
            li.addEventListener("click", () => {
                input.value = item.NOME;
                // Guarda o código (ex: "RL") em um atributo de dados caso precise salvar no banco
                input.dataset.valor = item.VALOR; 
                dropdown.classList.remove("show"); // Esconde a lista
            });
            
            dropdown.appendChild(li);
        });
        
        dropdown.classList.add("show");
    }

    // Evento 1: Clicar no botão da lupa mostra todos os cálculos
    btnSearch.addEventListener("click", (e) => {
        e.stopPropagation(); // Evita que o clique feche o dropdown imediatamente
        if (dropdown.classList.contains("show")) {
            dropdown.classList.remove("show");
        } else {
            renderDropdown(calculations);
        }
    });

    // Evento 2: Digitar no input filtra a lista
    input.addEventListener("input", () => {
        const searchTerm = input.value.toLowerCase();
        
        // Filtra pelo Nome ou pela Sigla/Valor
        const filtered = calculations.filter(calc => 
            calc.NOME.toLowerCase().includes(searchTerm) || 
            calc.VALOR.toLowerCase().includes(searchTerm)
        );
        
        renderDropdown(filtered);
    });

    // Evento 3: Focar no input também abre a lista filtrada
    input.addEventListener("focus", () => {
        const searchTerm = input.value.toLowerCase();
        const filtered = calculations.filter(calc => calc.NOME.toLowerCase().includes(searchTerm));
        renderDropdown(filtered);
    });

    // Evento 4: Clicar fora da área fecha o dropdown
    document.addEventListener("click", (e) => {
        if (!input.contains(e.target) && !btnSearch.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove("show");
        }
    });
}