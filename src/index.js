import { LitElement, html } from 'lit-element';
import style from './style';
import defaultConfig from './defaults';


class MediaStreamingCard extends LitElement {
  static get properties() {
    return {
      hass: Object,
      config: Object,
    };
  }

  setConfig(config) {

    if (!config.entities) throw new Error('Entities is required');
    if (config.entities && !Array.isArray(config.entities)) throw new Error('entities must be a list');

    this.config = { ...defaultConfig, ...config };
  }

  /**
  * get the current size of the card
  * @return {Number}
  */
  getCardSize() {
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
      <div class='track-header'>
        ${this.config.header}
      </div>
    `;
  }

  createBody() {
    const table = '';

    return html`
      <div class='track-body'>
        ${table}
      </div>
    `;
  }
}

customElements.define('media-streaming-card', MediaStreamingCard);