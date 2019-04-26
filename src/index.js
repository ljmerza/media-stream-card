import { LitElement, html } from 'lit-element';
import style from './style';
import defaultConfig from './defaults';


class MediaStreamCard extends LitElement {
  static get properties() {
    return {
      hass: Object,
      config: Object,
    };
  }

  constructor(){
    super();

    this.payload = {};
  }

  setConfig(config) {
    this.config = { ...defaultConfig, ...config };
  }

  /**
  * get the current size of the card
  * @return {Number}
  */
  getCardSize() {
    if(this.config){
      const headerSize = (this.config.showHeader && this.config.header) ? 1 : 0;
      const bodySize = 0;
      return headerSize + bodySize;
    }
    
    return 1;
  }

  static get styles() {
    return style;
  }

  /**
   * generates the card HTML
   * @return {TemplateResult}
   */
  render() {

    return html`
      <ha-card>
        ${this.createHeader()}
        ${this.createBody()}
      </ha-card>
    `;
  }

  /**
   * create card header
   * @return {TemplateResult}
   */
  createHeader() {
    if (this.config.showHeader === false) return html``;
    
    return html`
      <div class='header'>
        ${this.config.header}
      </div>
    `;
  }

  createBody() {
    const entities = this.getEntities();
    const listItems = entities.map(entity => html`<paper-item>${entity}</paper-item>`);
    const selectedIndex = 0;
    const url = '';

    return html`
      <div class='body'>
        <paper-input
          autofocus=""
          label="Url"
          value="${url}"
          @value-changed=${e => this.setUrl(e)}
        ></paper-input>
        
        <paper-dropdown-menu @value-changed=${e => this.setMediaPlayer(e)} label="Media Player">
          <paper-listbox selected="${selectedIndex}" slot="dropdown-content" placeholder="Media Player">
            ${listItems}
          </paper-listbox>
        </paper-dropdown-menu>

        <paper-dropdown-menu @value-changed=${e => this.setStreamType(e)} label="Media Player">
          <paper-listbox selected="${selectedIndex}" slot="dropdown-content" placeholder="Media Player">
            <paper-item>Music</paper-item>
            <paper-item>Video</paper-item>
          </paper-listbox>
        </paper-dropdown-menu>

        <div class="card-actions">
          <mwc-button @click=${this.playRequest}>Play Request</mwc-button>
        </div>

      </div>
    `;
  }

  setUrl({ detail: { value } }) {
    this.payload.url = value;
  }

  setMediaPlayer({ detail: { value } }){
    this.payload.player = value;
  }

  setStreamType({ detail: { value } }){
    this.payload.stream = value;
  }

  playRequest(){
    if (!this.payload.url || !this.payload.player || !this.payload.stream) return false;
    this.hass.callService('media_extractor', 'play_media', {
      "entity_id": this.payload.player,
      "media_content_id": this.payload.url,
      "media_content_type": this.payload.stream
    });
  }

  getEntities(){
    return Object.keys(this.hass.states).filter(entity_id => {
      if (/pandora$/.test(entity_id)) return false;
      if (/spotify$/.test(entity_id)) return false;
      if(/^media_player/.test(entity_id)) return true;
      return false;
    });
  }
}

customElements.define('media-stream-card', MediaStreamCard);