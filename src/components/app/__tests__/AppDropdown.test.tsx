import { describe, expect, it } from 'vitest';
import { AppDropdown, AppButton, AppDropdownTypes } from '../';
import { renderPropTest } from '@/components/__tests__/helpers/props.test';
import { fireEvent, render, screen } from '@testing-library/react';
const name = 'AppDropdown';

describe(name, ()=>{
  describe('Trigger', ()=>{
    // Slot test
    renderPropTest(AppDropdown, 'trigger')
    
    
    const testTextVal = 'Test';
    function renderSimpleDropdown() {
      return render(<AppDropdown
          items={[ {text: 'Test'} ]}
          trigger={ ({ triggerAttrs }) => (
            <button id="trigger" {  ...triggerAttrs() }>
              Trigger
            </button>
          ) } 
      ></AppDropdown>);
    }
    const triggerBtn = async ()=> (await screen.queryByRole('button'));
    const getDropdownMenu = async () => (await screen.queryByRole('listbox'));
    
    it('show the menu on trigger click', async ()=> {
      renderSimpleDropdown()    
      const triggerButton = await triggerBtn();
      if (!triggerButton) return it.fails('No Trigger button detected');
      fireEvent.click(triggerButton);
      expect(await getDropdownMenu()).toBeInTheDocument();
    })
    
    it('hide the menu on trigger click', async ()=>{
      renderSimpleDropdown();
      const triggerButton = await triggerBtn();
      if (!triggerButton) return it.fails('No Trigger button detected');
      
      fireEvent.click(triggerButton);
      fireEvent.click(triggerButton);
      // const item = (await screen.queryByText(testTextVal)); 
      // expect(item).toBeInTheDocument();
      
      // if (!item) return it.fails('Item is missing');
      // fireEvent.click(item);
      expect(await getDropdownMenu()).toBeNull()
    })
  });
  describe('Dropdown', ()=>{
  //   it('should show on trigger', async ()=>{
  //     await trigger.trigger('click');
  //     const menu = wrapper.find('[role="listbox"]');
  //     expect(menu.exists()).toBeTruthy();
  //   })
    function renderDropdown(items: AppDropdownTypes.ItemProp[]) {
      return render(<AppDropdown
          items={ items }
          trigger={ ({ triggerAttrs }) => (
            <button id="trigger" {  ...triggerAttrs() }>
              Trigger
            </button>
          ) } 
      ></AppDropdown>);
    }
    const triggerBtn = async ()=> (await screen.queryByRole('button'));
    const getDropdownMenu = async () => (await screen.queryByRole('listbox'));


    it('should show the right content if items prop has value', async ()=>{
      const items = [
        { text: 'Item Test', onClick() { console.log('test') } }
      ];
      renderDropdown(items);
      const trigger = await triggerBtn(); 
      trigger && fireEvent.click(trigger);
      const item1 = await screen.queryAllByText(items[0].text)

      expect(item1.length).toBeGreaterThan(0);
    })

    it('hide the menu on item click', async ()=>{
      const items = [
        { text: 'Item Test', onClick() { console.log('test') } }
      ];
      renderDropdown(items);
      const triggerButton = await triggerBtn();
      if (!triggerButton) return it.fails('No Trigger button detected');

      fireEvent.click(triggerButton);
      const item = (await screen.queryByText(items[0].text)); 
      expect(item).toBeInTheDocument();
      item && fireEvent.click(item);

      // if (!item) return it.fails('Item is missing');
      expect(await getDropdownMenu()).toBeNull()
    })

    it('hide if click outside', async ()=> {
      const items = [
        { text: 'Item Test', onClick() { console.log('test') } }
      ];
      renderDropdown(items);
      const trigger = await triggerBtn(); 
      trigger && fireEvent.click(trigger);
      fireEvent.mouseDown(document)
      
      const item1 = await screen.queryAllByText(items[0].text)
      expect(item1.length).toBe(0);
    })

  //   it('should retain content if eager props is true', async ()=> {
  //     await wrapper.setProps({ eager: true });
  //     const menu = wrapper.find('[role="listbox"]');
  //     expect(menu.exists()).toBeTruthy();
  //     expect(menu.isVisible()).not.toBeTruthy();
  //   })
    
    // Slot Test
    // renderPropTest(AppDropdown, 'children')

  //   defaultSlotTest(AppDropdown, {}, {
  //     async afterMount(wrapper) { 
  //       const trigger = wrapper.find('[aria-label="dropdown button"]');
  //       await trigger.trigger('click'); 
  //     },
  //   })

  });
})