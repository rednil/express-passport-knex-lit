import { LitElement, html, css } from 'lit'
import '@material/mwc-textfield'
import '@material/mwc-button'
import {ref, createRef} from 'lit/directives/ref.js'

export class AppLogin extends LitElement {
  
  static get properties() {
    return {
      user: { type: Object },
    }
  }

  usernameRef = createRef()
  passwordRef = createRef()

  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      div {
        display: flex;
        flex-direction: column;
        width: 20em;
        text-align: center;
      }
      mwc-textfield {
        flex: 1;
      }
      mwc-button, .password {
        padding-bottom: 2em;
      }
     
    `
  }

  render() {
    return html`
      <div>
        <mwc-textfield ${ref(this.usernameRef)} label="Username" value="Herbert"></mwc-textfield>
        <mwc-textfield class="password" ${ref(this.passwordRef)} label="Password" value="Test"></mwc-textfield>
        <mwc-button raised @click=${this.signIn}>Sign In</mwc-button>
        <mwc-button raised @click=${this.signUp}>Create Account</mwc-button>
      </div>
      
    `
  }

  async postCredentials(type) {
    this.error = ''
    const username = this.usernameRef.value.value
    const password = this.passwordRef.value.value
    console.log('signIn', username, password)
    const response = await fetch(`/api/auth/${type}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({username, password})
    })
    this.dispatchEvent(new CustomEvent((response?.status==200) ? 'login' : 'fetch-error', {
      composed: true,
      bubbles: true,
      detail: response
    }))
  }
  signIn(){
    this.postCredentials('login')
  }
  signUp(){
    this.postCredentials('register')
  }
}

customElements.define('app-login', AppLogin)
