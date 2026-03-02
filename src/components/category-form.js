export function initCategoryForm() {
    const section = document.querySelector(".content")
    section.innerHTML = `
        <header class="content-header">
            <h1>Cadastro de Naturezas</h1>
        </header>
        <div class="fields-container">
            <div class="field-group">
                <label for="codnat">Adicionar Natureza</label>
                <div class="category-inputs">
                    <div class="category-code-wrap">
                        <button type="button" class="btn-search-category" title="Buscar Natureza">
                            <i class="bi bi-search"></i>
                        </button>
                        <input type="number" id="codnat" name="codnat" placeHolder="Cód" min="0" />
                    </div>
                    <div class="category-name-wrap">
                        <input type="text" id="descrnat" name="descrnat" placeholder="Natureza" />
                        <button type="button" class="btn-add-category" title="Adicionar Natureza">
                            <div>+</div>
                        </button>
                    </div>
                </div>
            </div>
            <div class="field-group">
                <label for="codnatpai">Adicionar Grupo de Natureza</label>
                <div class="category-group-inputs">
                    <div class="category-group-code-wrap">
                        <button type="button" class="btn-search-category-group" title="Buscar Grupo de Natureza">
                            <i class="bi bi-search"></i>
                        </button>
                        <input type="number" id="codgrupo" name="codgrupo" placeHolder="Cód" min="0" />
                    </div>
                    <div class="category-group-name-wrap">
                        <input type="text" id="descrgrupo" name="descrgrupo" placeholder="Grupo de Natureza" />
                        <button type="button" class="btn-add-category-group" title="Adicionar Grupo de Natureza">
                            <div>+</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="table-section">

        </div>
    `;
}