import { useState } from "react";
// Components
import { AppButton, AppFormCheckbox, AppFormCheckboxGroup, AppFormRadio, AppFormRadioGroup } from "@/components/app";
import { ComponentCard, PageHeader } from "../components";
import { ThemedColorTypes, ValidationTypes } from "@/hooks";

export default function FormRadioPage() {
  
  const inputs:Input[] = [
    { label: 'Default' },
    { label: 'With Error Props', error: 'Invalid Message' },
    { label: 'Disabled', disabled: true },
    { label: 'With Validations', validations: 'required' },
  ]
  const [checkBox, setCheckBox] = useState(false);
  const [checkBoxGroup, setCheckBoxGroup ] = useState<(string | false)[]>([]);
  
  const checkItems = [
    { label: 'Eat Dinner', value: 'ate' },
    { label: 'Brush Teeth', value: 'brushed' },
    { label: 'Dress up', value: 'dressed' },
  ];
  const [radioButton, setRadioButton ] = useState(0);
  const [radioButtonGroup, setRadioButtonGroup ] = useState<string>();
  
  const radioItems = [
    { label: 'Ice Cream', value: 'ice_cream' },
    { label: 'Cake', value: 'cake' },
    { label: 'Halo halo', value: 'halo_halo' },
  ];
  
  
  return (
    <div className="p-3 px-6 w-full h-full">
      <PageHeader>Checkbox & Radio</PageHeader>

      {/*  Default Checkbox */}
      <ComponentCard title="Checkboxes">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
            { inputs.map((input, index)=> (
              <div 
                key={ `default-${index}` }
                className="flex justify-center"
              >
                <AppFormCheckbox  
                  value={ checkBox }
                  onValueChange={ setCheckBox }
                  { ...input }
                ></AppFormCheckbox>
              </div>
            ))}
          </div>
      </ComponentCard>

      {/* Custom Checkbox */}
      <ComponentCard title="Custom Checkboxes">
        <div className="grid md:grid-cols-2 gap-4 items-center">
          <div className="flex justify-center">
            <AppFormCheckbox
              toggleInput
              value={ checkBox }
              onValueChange={ setCheckBox }
              label="Custom Checkbox 1"
            >
            </AppFormCheckbox>
          </div>
          <div className="flex justify-center">
            <AppFormCheckbox
              value={ checkBox }
              onValueChange={ setCheckBox }
              label="Custom Checkbox 2"
              className="items-center"
              checkbox={ ({ isActive }) => (
                <AppButton
                  color={ isActive ? 'primary-500' : 'secondary-500' }
                >
                  {  isActive ? 'Active' : 'Inactive'  }
                </AppButton>
              ) }
            >
            </AppFormCheckbox>
          </div>
        </div>
      </ComponentCard>

      {/* Chekcbox Group */}
      <ComponentCard title="Checkbox Group">
          <div className="grid md: grid-cols-2 gap-4 items-center">
            <div className="flex justify-center">
              <AppFormCheckboxGroup
                value={ checkBoxGroup }
                onValueChange={ setCheckBoxGroup }
                items={ checkItems }
                label="To do"
                className="mx-auto"
                containerClass="flex-col md:flex-row"
              ></AppFormCheckboxGroup>
            </div>

            <div className="text-center">
              <span>Done: </span>
              <span className="text-primary-500 font-semibold">
                { checkBoxGroup.join(', ') }
              </span>
            </div>
          </div>
      </ComponentCard>



      {/* Default Radio Button */}
      <ComponentCard title="Radio Buttons">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            { inputs.slice(0, -1).map((input, index)=>(
              <div
                key={ `default-${index}` }
                className="flex justify-center"
              >
                <AppFormRadio
                  value={ radioButton }
                  onValueChange={ setRadioButton }
                  activeValue={ index }
                  { ...input }
                ></AppFormRadio>
              </div>
            ))}
          </div>
      </ComponentCard>


      {/* Radio Button Gropp */}
      <ComponentCard title="Radio Group">
          <div className="grid md: grid-cols-2 gap-4 items-center">
            <div className="flex">
              <AppFormRadioGroup
                value={ radioButtonGroup }
                onValueChange={ setRadioButtonGroup }
                items={ radioItems }
                label="Favorite Dessert"
                className="mx-auto"
                container-class="flex-col md:flex-row"
                validations="required"
              ></AppFormRadioGroup>
            </div>

            <div className="text-center ">
              <span>Current Value: </span>
              <span className="text-primary-500 font-semibold">
                { radioButtonGroup }
              </span>
            </div>
          </div>
      </ComponentCard>



    </div>
  )
}


/** __TYPE DEFINITIONS__ */
  
interface Input {
  label?: string;
  error?:string;
  disabled?: boolean;
  readonly?: boolean;
  color?:ThemedColorTypes.ThemeColors;
  validations?: string | ValidationTypes.Validation[];
}
