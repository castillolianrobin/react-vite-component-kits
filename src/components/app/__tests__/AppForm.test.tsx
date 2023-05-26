// import { defaultSlotTest } from "@/components/__tests__/helpers/slot.spec";
// import { required } from "@/composables/validation/validations";
// import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
// import { h } from "vue";
import { AppButton, AppForm, AppFormInput } from '../'
import { fireEvent, render } from "@testing-library/react";
import { required } from "@/hooks/validation/validations";
import { renderPropTest } from "@/components/__tests__/helpers/props.test";
const name = 'AppForm';

describe(name, ()=> {
  renderPropTest(AppForm, 'children');
  
  it('activate form validation of child component', async ()=> {
    const wrapper = render(<AppForm>
      <AppFormInput validations='required'></AppFormInput>
      <AppButton type="submit" id="submit"></AppButton>
    </AppForm>);

    const submitBtn = wrapper.container.querySelector('#submit');
    if (!submitBtn) return expect.fail('Submit button missing') 

    fireEvent.click(submitBtn);
    const errorTag = wrapper.container.querySelector('p');
    // should be same messeage wirth required 
    const errorMessage = required('')('');
    expect(errorTag?.innerHTML).toBe(errorMessage);
  })
});