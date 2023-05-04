class CustomHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header> 
                <a href="../index.htm">◄</a>
            </header>
        `
    }
}

customElements.define('cust-header', CustomHeader)