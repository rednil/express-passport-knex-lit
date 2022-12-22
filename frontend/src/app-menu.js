import { LitElement, html, css } from 'lit'
import '@material/mwc-list'
import '@material/mwc-icon-button'

export class AppMenu extends LitElement {

  static get properties() {
    return {
      
    }
  }

  static get styles() {
    return css`
     
    `
  }

  render() {
    return html`
      <mwc-list>
          <mwc-list-item @click=${()=>window.location.hash=""}>Main Page</mwc-list-item>
          <mwc-list-item @click=${()=>window.location.hash="#/users"}>Users</mwc-list-item>
      </mwc-list>
    `
  }
}


customElements.define('app-menu', AppMenu)
