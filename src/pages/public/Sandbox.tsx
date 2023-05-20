import { useState } from 'react';
import * as AppComponent from '../../components/app/index'; 
import AppFormRadio from '../../components/app/AppFormRadio';
export default function Sandbox() {
  const [radioValue, setRadioValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [checkboxGroupValue, setCheckboxGroupValue] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  
  return (
    <div className='p-5'>
      {/* BUTTONS */}
      <h3 className='font-bold text-lg'>Buttons</h3>
      <div className='flex flex-wrap gap-2'>
        <AppComponent.AppButton>Default Button</AppComponent.AppButton>
        <AppComponent.AppButton outline>Outline Button</AppComponent.AppButton>
        <AppComponent.AppButton disabled>Disabled Button</AppComponent.AppButton>
        <AppComponent.AppButton color='secondary'>Secondary Button</AppComponent.AppButton>
        <AppComponent.AppButton color='success'>Success Button</AppComponent.AppButton>
        <AppComponent.AppButton color='error'>Error Button</AppComponent.AppButton>
        <AppComponent.AppButton color='warning'>Warning Button</AppComponent.AppButton>
        <AppComponent.AppButton loading>Loading Button</AppComponent.AppButton>
      </div>

      {/* INPUTS */}
      <h3 className='font-bold text-lg'>Form Inputs</h3>
      <div className='flex flex-wrap gap-2'>
        <AppComponent.AppFormInput label='Text Field'></AppComponent.AppFormInput>
        <AppComponent.AppFormInput label='Password Field' type='password'></AppComponent.AppFormInput>
        <AppComponent.AppFormInput label='Number Field' type='number'></AppComponent.AppFormInput>
        <AppComponent.AppFormInput label='Error Field' error="Missing Field"></AppComponent.AppFormInput>
        <AppComponent.AppFormInput label='Readonly Field' readOnly value='Read Only'></AppComponent.AppFormInput>
        <AppComponent.AppFormInput label='Disabled Field' disabled></AppComponent.AppFormInput>
      </div>

      <h3 className='font-bold text-lg'>Form Radios, Checkboxes, Clickable Input</h3>
      <div className='flex flex-wrap gap-2'>
        <AppComponent.AppFormRadio
          label='Radio 1'
          value={radioValue}
          onValueChange={setRadioValue}
        ></AppComponent.AppFormRadio>
        <AppComponent.AppFormRadio
          label='Radio 2'
          value={radioValue}
          onValueChange={setRadioValue}
        ></AppComponent.AppFormRadio>
        {/* test: { radioValue } */}
        <AppComponent.AppFormRadioGroup
          className='ml-5'
          label='Form Radio Group'
          value={radioValue}
          onValueChange={setRadioValue}
          error='asdasd'
          items={[
            { label: 'Test 1' },
            { label: 'Test 2' },
          ]}
        ></AppComponent.AppFormRadioGroup>

        {/* <AppComponent.AppFormCheckbox label='Checkbox' value={checkboxValue} onValueChange={setCheckboxValue}></AppComponent.AppFormCheckbox> */}
        {/* <AppComponent.AppFormCheckbox label='Checkbox' value='Checkbox'></AppComponent.AppFormCheckbox> */}

        <AppComponent.AppFormCheckboxGroup
          label='Checkbox Group'
          items={[
            { label: 'Check 1', },
            { label: 'Check 2', },
            { label: 'Check 3' },
          ]}
          value={checkboxGroupValue}
          onValueChange={e=>setCheckboxGroupValue(e)}
        ></AppComponent.AppFormCheckboxGroup>

        <AppComponent.AppFormSelect
          label='Form Select'
          color='error'
          items={['Item 1', 'Item 2']}
          value={selectValue}
          onValueChange={setSelectValue}
        ></AppComponent.AppFormSelect>
        
      </div>
      <div className='relative mt-4'>
        <AppComponent.AppButton 
          onClick={()=>setModalActive(!modalActive)}
        >
          Show Modal
        </AppComponent.AppButton>
        <AppComponent.AppModal 
          mountToApp 
          active={modalActive}
          onClose={()=>{ setModalActive(false); console.log('assadas')}}
        >
          <div className='asdad'>
            App Modal Sample
          </div>
        </AppComponent.AppModal>
      </div>
    </div>
  )
}
