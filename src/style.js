import { css } from 'lit-element';

const style = css`

  ha-card {
    padding: 24px 16px 16px 16px;
  }

  .header {
    font-family: var(--paper-font-headline_-_font-family);
    -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing);
    font-size: var(--paper-font-headline_-_font-size);
    font-weight: var(--paper-font-headline_-_font-weight);
    letter-spacing: var(--paper-font-headline_-_letter-spacing);
    line-height: var(--paper-font-headline_-_line-height);
    text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);
    opacity: var(--dark-primary-opacity);
    
    margin-bottom: 15px;
  }

  paper-dropdown-menu {
    width: 100%;
  }

`;

export default style;
