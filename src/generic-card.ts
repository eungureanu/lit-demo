import { css, html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { CustomButton } from "./custom-button";

@customElement('generic-card')
export class GenericCard extends LitElement{

    static styles = css`
    :host {
        display: block; 
        border: 2px solid #000000;
    }
    `;

    @property()
    private cardContent: Array<string> = ['image', 'headline', 'description', 'link', 'selection'];

    @property()
    private selectionElement: string = "checkbox";

    @property()
    private buttonColour: string = "#000000";

    @property()
    private fontSize: string = "20px";

    @property()
    private fontFamily: string = "Arial";

    render() {
        return html `
            ${this.cardContent.includes('image')
            ? html `<img src="./assets/Screenshot 2025-02-16 at 12.32.46.png" alt="blueberries">`
            : nothing}

            ${this.cardContent.includes('headline') 
            ? html `<h1>Lorem Ipsum</h1>`
            : nothing}

            ${this.cardContent.includes('description')
            ? html `<p style="font-size: ${this.fontSize}; font-family: ${this.fontFamily}">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<p>`
            : nothing}

            ${this.cardContent.includes('link')
            ? html `<a href = "https://www.google.com" target="_blank">Google</a>`
            : nothing}
            
            ${this.cardContent.includes('selection') 
            ? (this.selectionElement === "normal-button" 
                ? html`<custom-button .colour=${this.buttonColour}></custom-button>`
                : this.selectionElement === "checkbox"
                ? html`<input type="checkbox" id="checkbox"><label for="checkbox">Checkbox</label>`
                : html`<input type="radio" id="radio" name="radio"><label for="radio">Radio Button</label>`)
            : ''}
        `;
    }
}