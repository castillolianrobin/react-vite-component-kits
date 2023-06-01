import { AppFormSelect, AppFormSelectTypes } from "@/components/app";
import { ThemedColorTypes, ValidationTypes } from "@/hooks";
import { useState } from "react";
import { ComponentCard, PageHeader } from "../components";

export default function SelectPage() {
  
  const inputs:Input[] = [
    { label: 'Default' },
    { label: 'With Error Props', error: 'Invalid Message' },
    { label: 'Readonly', readOnly: true },
    { label: 'Disabled', disabled: true },
    { label: 'With Validations', validations: 'required | minLength(2)' },
    { label: 'With Validations and Name', validations: 'required | minLength(2)', name: 'Select Item' },
  ];

  const items: AppFormSelectTypes.SelectItemProp[] = [
    { label: 'Item 1', value: '1'  },
    { label: 'Item 2', value: '2'  },
    { label: 'Item 3', value: '3'  },
    { label: 'Item 4', value: '4'  },
    { label: 'Item 5', value: '5'  },
    { label: 'Item 6', value: '6'  },

  ]

  const [defaultInput, setDefaultInput] = useState('')
  const [multiSelectInput, setMultiSelectInput] = useState('')
  
  
  
  const [Select, setSelect] = useState('')
  
  return (
    <div className="p-3 px-6 w-full h-full">
      <PageHeader>Form Select</PageHeader>

      <ComponentCard title="Default Select Input">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-4">        
          {
            inputs.map((input, index)=>(
              <AppFormSelect
                value={ defaultInput }
                onValueChange={ setDefaultInput }
                items={ items }
                key={ `default-${index}` }
                { ...input }
              ></AppFormSelect>
            ))
          }
        </div>
      </ComponentCard>
      

      
      <ComponentCard title="Multiselect Input">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-4">
            {
              inputs.map((input, index)=>(
                <AppFormSelect
                  multiselect
                  value={ multiSelectInput }
                  onValueChange={ setMultiSelectInput }
                  items={ items }
                  key={ `default-${index}` }
                  { ...input }
                ></AppFormSelect>
              ))
            }
          </div>
      </ComponentCard>
    </div>
  )
}



/** __TYPE DEFINITION__ */

interface Input {
  label?: string;
  error?:string;
  disabled?: boolean;
  readOnly?: boolean;
  color?:ThemedColorTypes.ThemeColors;
  validations?: string | ValidationTypes.Validation[];
  name?: string;
}
