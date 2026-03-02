
export function addGroupListener() {
    const addBtn = document.querySelector(".btn-add-dre-group")

    addBtn.addEventListener("click", event => {
        renderForm()
    })
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
                            <button class=btn-search-calc title="Buscar Cálculo">
                                <i class="bi bi-search"></i>
                            </button>
                            <input type="text" id="calc" name="calc" />
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
        <form>
    `;
}