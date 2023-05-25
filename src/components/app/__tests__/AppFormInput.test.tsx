// import { validationTest } from "@/components/__tests__/helpers/validation.spec";
import { fireEvent, screen } from "@testing-library/react";
import { describe, } from "vitest";
// import { namedSlotTest } from '../../__tests__/helpers/slot.spec';
import { AppFormInput as Component } from '..';
import { inputTest } from "@/components/__tests__/helpers/form.test";

const name = 'AppFormInput';
describe(name, () => {
  // // validation test
  // validationTest(component);

  // // input test
  const inputLabel = 'Sample-Input';
  inputTest(
    Component, 
    async ()=>{
      const input = screen.getByLabelText(inputLabel);
      fireEvent.change(input, {target: {value: '23'}})
    },
    { label: inputLabel },
  );

  // // slot tests
  // namedSlotTest(component, 'prepend');
  // namedSlotTest(component, 'append');
})
