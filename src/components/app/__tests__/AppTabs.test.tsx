// import { namedSlotTest } from "@/components/__tests__/helpers/slot.spec";
import { describe, expect, it } from "vitest";
import { AppTabs } from '../'
import type { AppTabsTypes } from "../";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderScopedPropTest } from "@/components/__tests__/helpers/props.test";
const name = 'AppTabs';
describe(name, ()=> {
  const items:AppTabsTypes.ItemProp[] = [
    { text: 'Tab 1', key: 'tab-1', content: 'Content 1' },
    { text: 'Tab 2', key: 'tab-2', content: 'Content 2' },
    { text: 'Tab 3', key: 'tab-3', content: (<h3>Content 3</h3>) },
  ];
  function mountWithDefaultItem(props?: Omit<AppTabsTypes.Props, 'items'>) {
    return render(<AppTabs 
      { ...props }
      items={ items } 
    />) 
  }
  it('should render tabs properly', () => {
    mountWithDefaultItem();

    const tabItems = screen.queryAllByRole('tab');
    const tabItemsText = tabItems.map(item=>item.innerHTML);
    expect(tabItemsText).toStrictEqual(items.map(({text})=>text));
  })

  it('should render default tab properly', async ()=> {
    waitFor(async ()=> {
      mountWithDefaultItem();
      const defaultText = items[0].content;
      const defautlKey = items[0].key;
      const defaultTabPanel = await screen
        .queryByLabelText(`${defautlKey} tabpanel`);
      expect(defaultTabPanel).toBeInTheDocument();
      expect(defaultTabPanel?.innerText).toBe(defaultText);
    })
  })
  
  it('should not render other tabs', async ()=> {
    mountWithDefaultItem();
    
    const nondefautlKey = items[1].key;
    const tabPanel = await screen
      .queryByLabelText(`${nondefautlKey} tabpanel`)
    expect(tabPanel).not.toBeInTheDocument()
    
  })

  it('should render other tabs on change', async ()=> {
    
    waitFor(async ()=> {
      mountWithDefaultItem();
      
      const nondefautlKey = items[1].key;
      
      const nonDefaultTab = screen
        .queryByLabelText(`${nondefautlKey} tab`)
      nonDefaultTab && fireEvent.click(nonDefaultTab);
  
      const tabPanel = await screen
        .queryByLabelText(`${nondefautlKey} tabpanel`)
      
        expect(tabPanel).toBeInTheDocument()
    });
  })

  it('should render all tabs if eager prop is enabled', async ()=> {
    waitFor(async ()=> {
      mountWithDefaultItem({ eager: true });
  
      const nondefautlKey = items[1].key;
      const tabPanel = await screen
        .queryByLabelText(`${nondefautlKey} tabpanel`)
      expect(tabPanel).toBeInTheDocument()
    });
  });

  // renderScopedPropTest(AppTabs, 'tabs', { items });
  // renderScopedPropTest(AppTabs, 'panel', { items });
  
  // namedSlotTest(component, 'tabs', { props: { items } });
  // namedSlotTest(component, 'panel', { props: { items } });
})