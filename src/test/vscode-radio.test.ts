import '../vscode-radio/index.js';
import {VscodeRadio} from '../vscode-radio/index.js';
import '../vscode-radio-group/index.js';
import {VscodeRadioGroup} from '../vscode-radio-group/index.js';
import {aTimeout, expect, fixture, html} from '@open-wc/testing';

const createSampleForm = () => {
  const form = document.createElement('form');
  const group = document.createElement(
    'vscode-radio-group'
  ) as VscodeRadioGroup;
  const rb1 = document.createElement('vscode-radio') as VscodeRadio;
  rb1.name = 'test';
  rb1.value = '1';
  rb1.label = 'One';
  const rb2 = document.createElement('vscode-radio') as VscodeRadio;
  rb2.name = 'test';
  rb2.value = '2';
  rb2.label = 'Two';
  const rb3 = document.createElement('vscode-radio') as VscodeRadio;
  rb3.name = 'test';
  rb3.value = '3';
  rb3.label = 'Three';

  group.appendChild(rb1);
  group.appendChild(rb2);
  group.appendChild(rb3);
  form.appendChild(group);

  return {form, group, rb1, rb2, rb3};
};

describe('vscode-radio', () => {
  it('is defined', () => {
    const el = document.createElement('vscode-radio');
    expect(el).to.instanceOf(VscodeRadio);
  });

  it('autofocus should be applied', () => {
    const {rb2} = createSampleForm();
    rb2.autofocus = true;


  });

  it('should show check icon when it is checked', async () => {
    const el = await fixture<VscodeRadio>(
      html`<vscode-radio checked></vscode-radio>`
    );

    expect(el.shadowRoot?.querySelector('.icon.checked')).to.be.ok;
  });

  it('focused property should be true when it is focused', async () => {
    const el = await fixture<VscodeRadio>(
      html`<vscode-radio></vscode-radio>`
    );

    el.focus();
    await el.updateComplete;

    expect(el.focused).to.be.true;
  });

  it('should not be focusable when it is disabled', async () => {
    const el = await fixture<VscodeRadio>(
      html`<vscode-radio disabled></vscode-radio>`
    );

    expect(el.tabIndex).to.eq(-1);
  });

  it('should be invalid if one of the radio button is required in the group and none of them is checked', async () => {
    const {form, rb1, rb2, rb3} = createSampleForm();

    rb2.required = true;
    document.body.appendChild(form);


    await aTimeout(0);

    expect(rb1.checkValidity()).to.be.false;
    expect(rb2.checkValidity()).to.be.false;
    expect(rb3.checkValidity()).to.be.false;

    form.remove();
  });

  it('should be valid if one or more of the radio buttons is required in the group and one of them is checked', async () => {
    const {form, rb1, rb2, rb3} = createSampleForm();

    rb2.required = true;
    rb1.checked = true;
    document.body.appendChild(form);

    await aTimeout(0);

    expect(rb1.checkValidity()).to.be.true;
    expect(rb2.checkValidity()).to.be.true;
    expect(rb3.checkValidity()).to.be.true;

    form.remove();
  });
});
