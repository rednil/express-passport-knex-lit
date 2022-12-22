import { LitElement, html, css } from 'lit'
import '@material/mwc-select'
import '@material/mwc-list/mwc-list-item'
import {ref, createRef} from 'lit/directives/ref.js'

export class AppAuth extends LitElement {
  static EDIT   = 'EDIT'
  static CREATE   = 'CREATE'
  static LOGIN    = 'LOGIN'
  static REGISTER = 'REGISTER'

  usernameRef = createRef()
  passwordRef = createRef()
  roleRef = createRef()

  static get properties() {
    return {
      mode: { type: String },
      user: { type: Object },
      self: { type: Object }
    }
  }

  static get styles() {
    return css`
      :host {
        display:flex;
        flex-direction: column;
      }
    `
  }

  constructor(){
    super()
    this.user = {}
    this.self = {}
  }
  
  render() {
    return html`
      <mwc-textfield id="username" label="Username" value=${this.user?.username}></mwc-textfield>
      <mwc-textfield id="password" label="Password" placeholder=${this.user?.id?'Keep existing':''}></mwc-textfield>
      <mwc-select id="role" label="Role" ${ref(this.roleRef)} value=${this.user?.role || 'USER'}>
        <mwc-list-item value='USER'>User</mwc-list-item>
        <mwc-list-item value='ADMIN'>Admin</mwc-list-item>   
      </mwc-select>
    `
  }

  getUserData(){
    const data = {...this.user}
    ;['username', 'password', 'role'].forEach(prop => {
      const dom = this.shadowRoot.querySelector('#'+prop)
      if(dom.value) data[prop] = dom.value 
    })
    return data
  }
  async send(){
    this.error = ''
    const data = this.getUserData()
    let method = 'POST', path = '/api/users' 
    switch(this.mode){
      case AppAuth.LOGIN: 
        path = '/api/auth/login'
        break
      case AppAuth.REGISTER: 
        path = '/api/auth/register'
        break
      case AppAuth.EDIT:
        method = 'PUT'
        break
    }
    return console.log(method, path, data)
    const response = await fetch(path, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method,
      body: JSON.stringify(data)
    })
  }
 
}


customElements.define('app-auth', AppAuth)
