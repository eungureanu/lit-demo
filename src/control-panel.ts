import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { CustomButton } from "./custom-button";

@customElement('control-panel')
export class ControlPanel extends LitElement {

    static styles = css`
        :host {
            display: block; 
            border: 2px solid #000000;
        }

        datalist {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            writing-mode: lr;
            width: 200px;
        }

        option {
            padding: 0;
        }

        input[type="range"] {
            width: 200px;
            margin: 0;
        }
        `;

    @state()
    private cardContent: Array<string> = ['image', 'headline', 'description', 'link', 'selection'];

    @state()
    private selectedColour: string = "#000000"

    @state()
    private savedColour: string = "#000000"

    @state()
    private selectedFontFamily: string = "arial"

    @state()
    private selectedFontSize: string = "20px";

    private fontSizeMap: Record<number, string> = {
        0: "12px",
        25: "16px",
        50: "20px",
        75: "24px",
        100: "28px"
    }

    // private fontSizeMap: Record<number, { headline: string; paragraph: string; button: string }> = {
    //     0: { headline: "20px", paragraph: "10px", button: "14px" },  // XS
    //     25: { headline: "24px", paragraph: "14px", button: "18px" }, // S
    //     50: { headline: "28px", paragraph: "18px", button: "22px" }, // M
    //     75: { headline: "32px", paragraph: "22px", button: "26px" }, // L
    //     100: { headline: "36px", paragraph: "26px", button: "30px" } // XL
    // };
    
    @state()
    private cardSelectionElement: string = "normal-button";

    @state()
    private cardAmount: string = "1";

    private previewColour(event: Event) {
        const target = event.target as HTMLInputElement;
        this.selectedColour = target.value;
    }

    private updateColour(event: Event) {
        const target = event.target as HTMLInputElement;
        this.savedColour = target.value;
    }

    private updateFontFamily(event: Event){
        const target = event.target as HTMLSelectElement;
        this.selectedFontFamily = target.value;
        console.log(this.selectedFontFamily);
    }

    private updateFontSize(event: Event){
        const target = event.target as HTMLInputElement;
        // doesn't work, doesn't see it as a number
        // this.selectedFontSize = +target.value;
        // this.selectedFontSize = this.fontSizeMap[this.selectedFontSize]; 
        const selectedValue = Number(target.value);
        this.selectedFontSize = this.fontSizeMap[selectedValue];
    }

    private selectionChosen(event: Event){
        const target = event.target as HTMLInputElement;
        this.cardSelectionElement = target.value;
        console.log(target.value);
    }

    // private selectedContent(event: Event){
    //     const target = event.target as HTMLInputElement;
    //     console.log(target.value, "is visible: ", target.checked);
    // }

    
    private selectedContent(event: Event){
        //event.target - the actual element that triggered the event (here the <input>)
        //event.currentTarget - the element the event listener is attached to (here the <ul>; uses event bubbling)
        const target = (event.currentTarget as HTMLElement).querySelectorAll('input[type="checkbox"]');
        const selectedContent: string[] = [];
        //querySelectorAll returns a NodeList, not an array, but it has a forEach method
        target.forEach((checkbox) => {
            //we cast each Element from the NodeLis to HTMLInputElements to be able to check their attributes
            if ((checkbox as HTMLInputElement).checked) {
            selectedContent.push((checkbox as HTMLInputElement).value);
            }
        });
        this.cardContent = selectedContent;
    }

    // private cardAmountChanged(event: Event){
    //     const target = event.target as HTMLInputElement;
    //     this.cardAmount = target.value;
    //     console.log(this.cardAmount);
    // }

    connectedCallback() {
        super.connectedCallback();
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css?family=Arial|Roboto|Open+Sans|Lato|Bellota|Tangerine';
        document.head.appendChild(link);
    }

    updated(changedProperties: Map<string, any>){
        // console.log("Changed properties: ", changedProperties);
        changedProperties.forEach((oldValue, propName) => {
            console.log(`${propName} changed from`, oldValue, "to", (this as any)[propName]);
        });
        if(changedProperties.has("selectedColour")){
            this.dispatchEvent(new CustomEvent(
                "colour-selected", {
                    detail: {selectedColour: this.selectedColour},
                    bubbles: true, 
                    composed: true
            }));
        }
        if(changedProperties.has("selectedFontFamily")){
            this.dispatchEvent(new CustomEvent(
                "fontFamily-selected", {
                    detail: {selectedFontFamily: this.selectedFontFamily},
                    bubbles: true,
                    composed: true
                }
            ));
        }
        if(changedProperties.has("selectedFontSize")){
            this.dispatchEvent(new CustomEvent(
                "fontSize-selected", {
                    detail: {selectedFontSize: this.selectedFontSize},
                    bubbles: true,
                    composed: true
                }
            ))
        }
        if(changedProperties.has("cardSelectionElement")){
            this.dispatchEvent(new CustomEvent(
                "selectionElement-chosen", {
                    detail: {cardSelectionElement: this.cardSelectionElement},
                    bubbles: true,
                    composed: true
                }
            ))
        }
        if(changedProperties.has("cardAmount")){
            this.dispatchEvent(new CustomEvent(
                "cardAmount-changed", {
                    detail: {cardAmount: this.cardAmount},
                    bubbles:true,
                    composed: true
                }
            ))
        }
        if(changedProperties.has("cardContent")){
            this.dispatchEvent(new CustomEvent(
                "cardContent-changed", {
                    detail: {cardContent: this.cardContent},
                    bubbles:true,
                    composed: true
                }
            ))
        }
    }

    render() {
        return html`

            <label>Choose what to display in the card:</label>
            <ul @change = "${this.selectedContent}">
                <li><input type="checkbox" value="image" checked>Image</li>
                <li><input type="checkbox" value="headline" checked>Headline</li>
                <li><input type="checkbox" value="description" checked>Description</li>
                <li><input type="checkbox" value="link" checked>Link</li>
                <li><input type="checkbox" value="selection" checked>Selection element</li>
            </ul>

            <form>
                <label for="favcolor">Select a colour for the button:</label>
                <input type="color" id="favcolor" name="favcolor" @input = "${this.previewColour}" @change="${this.updateColour}">
            </form>
            
            <!--
            <p style="color: ${this.selectedColour}; font-family: ${this.selectedFontFamily}">text pt input</p>
            <p style="color: ${this.savedColour}; font-family: ${this.selectedFontFamily}; font-size: ${this.selectedFontSize}">text pt change</p>
            -->
            
            <label for="typeface">Choose a font family:</label>
            <select name="typeface" id="typeface" @change = "${this.updateFontFamily}">
                <option value="Arial">Arial</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Lato">Lato</option>
                <option value="Bellota">Bellota</option>
                <option value="Tangerine">Tangerine</option>
            </select>

            <br><label for="font-size">Choose a font size:</label><br>
            <input type="range" id="tempB" name="temp" min="0" max="100" step="25" list="font-sizes" @change="${this.updateFontSize}"/>
            <datalist id="font-sizes">
                <option value="0" label="XS"></option>
                <option value="25" label="S"></option>
                <option value="50" label="M"></option>
                <option value="75" label="L"></option>
                <option value="100" label="XL"></option>
            </datalist>
            <br>

            <fieldset @change="${this.selectionChosen}">
                <legend>Choose a selection element:</legend>
                    <input type="radio" id="normal-button" name="selection" value="normal-button" checked />
                    <label for="normal-button">Button</label>

                    <input type="radio" id="radio-button" name="selection" value="radio-button" />
                    <label for="radio-button">Radio button</label>

                    <input type="radio" id="checkbox" name="selection" value="checkbox" />
                    <label for="checkbox">Checkbox</label>
            </fieldset>

            <!--
            <label for="card-amount">Number of cards displayed (1-20):</label>
            <input type="number" id="card-amount" name="card-amount" min="1" max="20" value=3 @change="${this.cardAmountChanged}"/>
            -->
        `;
    }
}


declare global {
    interface HTMLElementTagNameMap {
        "control-panel": ControlPanel;
    }
}