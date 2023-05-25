import { describe, it, expect } from 'vitest'
import { AppButton } from '../';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderPropTest } from '@/components/__tests__/helpers/props.test';
const name = 'AppButton';

describe(name, () => {
  /** Return the rendered button */
  async function renderButton(props?: Parameters<typeof AppButton>[0]) {
    const buttonText = 'test btn';
    render(<AppButton { ...props } >
      { buttonText }
    </AppButton>)
    return await screen.findAllByText(buttonText)

  } 
  it('renders a button element', async () => {
    const button = await renderButton();
    expect(button.length).toBe(1);
  })

  // it('renders a link element if to prop is not empty', () => {
  //   const wrapper = mount(AppButton, { props: { to: '/form'} })
  //   expect(wrapper.find('routerlink').attributes()).toHaveProperty('to')
  //   expect(wrapper.find('routerlink').exists()).toBe(true)
  // })

  it('emits a click event when clicked', async () => {
    let testValue = '';
    const newValue = 'New Val';
    const button = await renderButton({
      onClick: () => (testValue = newValue),
    });
    fireEvent.click(button[0])

    expect(testValue).toBe(newValue);
  })

  // /** test if hover is working */
  // const wrapper = mount(AppButton);
  // const classes = wrapper.classes();
  // it('has hover css', ()=>{
  //   const hoverClasses = classes.filter(
  //     _class=>_class.includes('hover:')  
  //   );
  //   expect(hoverClasses.length).greaterThan(0);
  // })

  // /** test if focus is working */ 
  // it('has focus css', ()=>{
  //   const focusClasses = classes.filter(
  //     _class=>_class.includes('focus:')  
  //   );
  //   expect(focusClasses.length).greaterThan(0);
  // })

  // /** test if active is working */
  // it('has active css', ()=>{
  //   const activeClasses = classes.filter(
  //     _class=>_class.includes('active:')  
  //   );
  //   expect(activeClasses.length).greaterThan(0);
  // })

  // /** test if disabled css is working */
  it('disables properly', async ()=>{
    let testValue = '';
    const newValue = 'New Val';
    const button = await renderButton({
      disabled: true,
      onClick: () => (testValue = newValue),
    });
    fireEvent.click(button[0])

    expect(testValue).not.toBe(newValue);
  })

  /** test if loading css is working */

  /** test if variant is working */

  /** test if sizes is working */


  renderPropTest(AppButton, 'children');
})
