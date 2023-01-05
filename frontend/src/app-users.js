import { LitElement, html, css } from 'lit'
import '@material/mwc-button'
import '@material/mwc-list'
import '@material/mwc-icon-button'
import '@material/mwc-fab'
import '@material/mwc-icon'
import '@material/mwc-dialog'
import {ref, createRef} from 'lit/directives/ref.js'
import {AppAuth} from './app-auth'

export class AppUsers extends LitElement {

  static get properties() {
    return {
      users: { type: Array },
      mode: { type: String },
      self: { type: Object },
      selected: { type: Object }
    }
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
      }
      .user {
        display: flex;
      }

      .properties {
        display: flex;
        margin: 0 1em;
        
      }
      .fabs {
        position: fixed;
        right: 1em;
        bottom: 1em;
      }
      .list {
        margin: auto;
      }
      .item-content {
        display:flex;
      }
      .label {
        margin: auto 0;
        width: 10em;
      }
      .role {
        font-size: smaller;
        opacity: 0.5;
      }
    `
  }

  deleteDialog = createRef()
  userDialog = createRef()

  constructor(){
    super()
    this.users = []
    this.mode = ''
  }

  render() {
    return html`
      <div class="list">
        ${this.users.map(user => html`
          <div class="user">
            <span class="label">
              <div class="username">${user.username}</div>
              <div class="role">${user.role}</div>
            </span>
            <mwc-icon-button .data=${user} @click=${this.openUserDialog(AppAuth.EDIT)} icon="edit"></mwc-icon-button>
            <mwc-icon-button .data=${user} @click=${this.deleteCb} icon="delete"></mwc-icon-button>
          </div>
        `)}
      </div>
      <div class="fabs">
        <mwc-fab icon="add" @click=${this.openUserDialog(AppAuth.CREATE)} label="Add User"></mwc-fab>
      </div>
      <mwc-dialog ${ref(this.deleteDialog)}>
        <div>Delete User "${this.selected?.username}"</div>
        <mwc-button @click=${this.deleteUser}
            slot="primaryAction"
            dialogAction="discard">
          Delete
        </mwc-button>
        <mwc-button raised
            slot="secondaryAction"
            dialogAction="cancel">
          Cancel
        </mwc-button>
      </mwc-dialog>
      <mwc-dialog id="user-dialog" ${ref(this.userDialog)} ?open=${this.mode == AppAuth.EDIT}>
        <h1>${this.getUserDialogTitle()}</h1>
        <app-auth mode=${this.mode} .user=${this.selected} .self=${this.self}></app-auth>
        <mwc-button
            slot="primaryAction"
            dialogAction="discard"
            @click=${this.userAction}>
          Save
        </mwc-button>
        <mwc-button raised
            slot="secondaryAction"
            dialogAction="cancel">
          Cancel
        </mwc-button>
      </mwc-dialog>
    `
  }

  connectedCallback(){
    super.connectedCallback()
    console.log('connected')
    this.fetchUsers()
  }

  
  deleteCb(evt){
    this.selected = evt.target.data
    this.deleteDialog.value.open = true
  }

  async fetchUsers(){
    const response = await fetch('/api/users')
    if(this.noError(response)) {
      this.users = await response.json()
    }
  }

  noError(response){
    if(response.status == 200) return true
    else {
      this.dispatchEvent(new CustomEvent('error', { detail: response }))
    }
  }
  
  async deleteUser(evt){
    const id = this.selected.id
    const response = await fetch(`/api/users/${id}`, { method: 'DELETE' })
    if(this.noError(response)) {
      this.users.splice(this.users.findIndex(user => user.id == id),1)
      this.requestUpdate()
    }
  }
  
  async userAction(){
    const response = await this.shadowRoot.querySelector('app-auth').send()
    if(this.noError(response)) {
      const updatedUsers = await response.json()
      this.mergeUsers(updatedUsers)
    }
  }

  mergeUsers(updatedUsers = []){
    if(!Array.isArray(updatedUsers)) updatedUsers = [updatedUsers]
    updatedUsers.forEach(updatedUser => {
      const idx = this.users.findIndex(user => user.id == updatedUser.id)
      if(idx >= 0) this.users[idx] = updatedUser
      else this.users.push(updatedUser)
      this.requestUpdate()
    })
  }
  getUserDialogTitle(){
    return this.mode == AppAuth.EDIT ? `Edit User "${this.selected.username}"` : 'Create User'
  }
  openUserDialog(mode){
    return evt => {
      this.mode = mode
      this.selected = evt.target.data
      this.userDialog.value.open = true
    }
  }
}


customElements.define('app-users', AppUsers)
