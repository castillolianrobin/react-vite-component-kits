import { render } from "@testing-library/react";
import { expect, it } from "vitest";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComponentType = (props: any ) => JSX.Element;

export function inputTest<T extends ComponentType, P extends Parameters<T>[0]>
(Component: T, changeInputEvent: CallableFunction, props: P, options?: Parameters<typeof render>[1]) { 
  const initVal = '';
  let value = initVal;
  const newval = 'New Value';
  const onValuechange = () => (value = newval);
  // Input Test
  it('emits update:modelValue', async ()=> {
    value = initVal;
    render(
      <Component
        { ...props } 
        value={value}
        onValueChange={onValuechange} 
      />, 
      options
    );
    
    await changeInputEvent();
    expect(value).toBe(newval);
  
  });
  
  // Disabled Test
  it('should not update if disabled', async () => {
    if ('disabled' in props ) {
      throw new Error('This component does not have a disable prop')
    }
    value = initVal;
    render(<Component
      { ...props } 
      disabled
      value={value}
      onValueChange={onValuechange} 
    />, options);

    await changeInputEvent();
    expect(value).toBe(initVal);

  });
}