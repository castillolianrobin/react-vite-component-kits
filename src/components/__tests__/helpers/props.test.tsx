import { render } from "@testing-library/react";
import React from "react";



export async function renderPropTest<T extends IComponent>
(Component: T, propName: keyof Parameters<T>[0], extraProp?: Parameters<T>[0]) {
  it(`renders element in '${propName as string}' Prop`, () => {
    const Test = Component as React.ComponentType<Parameters<typeof Component>[0]>;
    const testValue = 'Test Value 123'
    const props = {
      ...extraProp,
      [propName]: (<div id="test">{ testValue }</div>)
    }
    const wrapper = render(<Test {...props }></Test>)
    const testElement =  wrapper.container.querySelector('#test');
    
    expect(testElement?.innerHTML).toBe(testValue);
  })
}

export async function renderScopedPropTest<T extends IComponent>
(Component: T, propName: keyof Parameters<T>[0], extraProp?: Parameters<T>[0]) {
  it(`renders element in '${propName as string}' Prop`, () => {
    const Test = Component as React.ComponentType<Parameters<typeof Component>[0]>;
    const testValue = 'Test Value 123'
    const props = {
      ...extraProp,
      [propName]: ()=>(<div id="test">{ testValue }</div>)
    }
    const wrapper = render(<Test {...props }></Test>)
    const testElement =  wrapper.container.querySelector('#test');
    
    expect(testElement?.innerHTML).toBe(testValue);
  })
}



/** __TYPE DEFINITION__ */

export interface IComponent {
  (props: object): JSX.Element;
}