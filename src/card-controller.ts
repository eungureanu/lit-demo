import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { CustomButton } from "./custom-button";
import { ControlPanel } from "./control-panel";

@customElement('card-controller')
export class CardController extends LitElement {

    @property({type: Array<string>})
    cardContent: Array<string> = ['image', 'headline', 'description', 'link', 'selection'];

    @property({type: String})
    buttonColour: string = "#000000";

    @property({type: String})
    selectionElement: string = "normal-button";

    @property({type: String})
    fontSize: string = "20px";

    @property({type: String})
    fontFamily: string = "Arial";

    // @property({type: String})
    // cardAmount: string = "1";


    private handleColourSelected(event: CustomEvent) {
        this.buttonColour = event.detail.selectedColour;
    }

    private handleSelectionChosen(event: CustomEvent){
        this.selectionElement = event.detail.cardSelectionElement;
        console.log(this.selectionElement);
    }

    private handleFontSizeChange(event: CustomEvent){
        this.fontSize = event.detail.selectedFontSize;
    }

    private handleFontFamilyChange(event: CustomEvent){
        this.fontFamily = event.detail.selectedFontFamily;
    }

    private handleCardContentChange(event: CustomEvent){
        this.cardContent = event.detail.cardContent;
        console.log(this.cardContent);
    }

    // private handleCardAmount(event: CustomEvent){
    //     this.cardAmount = event.detail.cardAmount;
    // }


    render() {
        return html`
            <!--<custom-button .colour = ${this.buttonColour}></custom-button>-->
            <control-panel @cardContent-changed=${this.handleCardContentChange}  @colour-selected = ${this.handleColourSelected} @fontSize-selected = ${this.handleFontSizeChange} @fontFamily-selected = ${this.handleFontFamilyChange} @selectionElement-chosen = ${this.handleSelectionChosen}></control-panel>
            <br><br>
            <generic-card .cardContent=${this.cardContent} .buttonColour =${this.buttonColour} .fontFamily=${this.fontFamily} .fontSize = ${this.fontSize} .selectionElement = ${this.selectionElement}></generic-card>
        `
    }

}

declare global {
    interface HTMLElementTagNameMap {
        "card-controller": CardController;
    }
}