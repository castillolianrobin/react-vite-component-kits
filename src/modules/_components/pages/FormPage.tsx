import { AppButton, AppForm, AppFormInput } from "@/components/app";
import { ComponentCard, PageHeader } from "../components";
import { ThemedColorTypes, ValidationTypes } from "@/hooks";
import { useState } from "react";

export default function FormPage() {
  const inputs:Input[] = [
    { label: 'First Name', validations: 'required', name: 'First Name' },
    { label: 'Last Name', validations: 'required', name: 'Last Name' },
    { label: 'Username', validations: 'required', name: 'Username' },
    { label: 'Password', type: 'password', validations: 'required | minLength(5)', name: 'Password' },
  ]

  
  const [inputVal, setInputVal ] = useState(new Array(inputs.length).fill(''));
  function setValue(index: number, value: unknown ) {
    
    const input = [...inputVal];
    input[index] = value;
    setInputVal(input);
  }

  // const gender = ref('');
  // const id = ref([]);
  
  
  return (
    <div className="p-3 px-6 w-full h-full">
      <PageHeader>Form</PageHeader>
      <ComponentCard title="Form Validation">
        <AppForm 
          className="p-4 flex flex-col gap-4"
        >

          {inputs.map((input, i)=>(
            <AppFormInput
              key={ `default-${i}` }
              value={inputVal[i]}
              onValueChange={(e)=>setValue(i, e)}
              { ...input }
            ></AppFormInput>

          ))}
          

          <AppButton type="submit" className="mt-5 mr-auto">
            Submit
          </AppButton>
        </AppForm>
      </ComponentCard>
    </div>
  )
}



/** __TYPE DEFINITION__ */

interface Input {
  label?: string;
  error?:string;
  disabled?: boolean;
  readonly?: boolean;
  color?:ThemedColorTypes.ThemeColors;
  validations?: string | ValidationTypes.Validation[];
  name?: string;
  type?: 'password' | 'text';
}