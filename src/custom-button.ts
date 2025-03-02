import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('custom-button')
export class CustomButton extends LitElement{

@property({type: String})
colour: string = "rgb(239, 239, 239)";

@property({type: Number})
borderRadius: number = 0;

@property({type: Number})
padding: Number = 5;

    render(){
      return html `
      <button
        style="background-color: ${this.colour}; border-radius: ${this.borderRadius}px; padding: ${this.padding}px;"> hello from the button 
      </button>
      `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
      "custom-button": CustomButton;
    }
  }