import { useState } from "react";
// Components
import { AppFormInput, AppFormTextArea } from "@/components/app";
import ComponentCard from "../components/ComponentCard";
// Hooks
import { ThemedColorTypes } from "@/hooks";

export default function FormInputPage() {
  const inputs:Input[] = [
    { label: 'Default' },
    { label: 'With Error Props', error: 'Invalid Message' },
    { label: 'Readonly', readOnly: true },
    { label: 'Disabled', disabled: true },
    { label: 'With Validations', validations: 'required | minLength(2)' },
    { label: 'With Validations and Name', validations: 'required | minLength(2)', name: 'Password' },
  ]

  const [defaultInput, setDefaultInput] = useState('');
  const [PasswordInput, setPasswordInput] = useState('');
  const [NumberInput, setNumberInput] = useState(0);
  const [defaultTextArea, setDefaultTextArea] = useState('');
  
  
  return (
    <div className="p-4">
      <ComponentCard title="Text Inputs">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-4">
            {/* v-for="(input, index) in inputs" */}
          { 
            inputs.map((input, i)=>(
              <AppFormInput
                key={`default-${i}`}
                value={defaultInput}
                onValueChange={setDefaultInput}
                { ...input }
              ></AppFormInput>
            )) 
          }
        </div>
      </ComponentCard>

      <div className="grid md:grid-cols-2 gap-4">
        <ComponentCard title="Text Inputs">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-4">
              {/* v-for="(input, index) in inputs" */}
            { 
              [inputs[0],inputs[4]].map((input, i)=>(
                <AppFormInput
                  type="password"
                  key={`number-${i}`}
                  value={PasswordInput}
                  onValueChange={setPasswordInput}
                  { ...input }
                ></AppFormInput>
              )) 
            }
          </div>
        </ComponentCard>

        <ComponentCard title="Text Inputs">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-4">
              {/* v-for="(input, index) in inputs" */}
            { 
              [inputs[0],inputs[4]].map((input, i)=>(
                <AppFormInput
                  type="number"
                  key={`number-${i}`}
                  value={NumberInput}
                  onValueChange={(e)=>setNumberInput(+e)}
                  { ...input }
                ></AppFormInput>
              )) 
            }
          </div>
        </ComponentCard>
      </div>

      <ComponentCard title="Text Areas">
          <div className="grid md:grid-cols-3 gap-4">
            {
              [inputs[0],inputs[4]].map((input, index)=>(
                <AppFormTextArea
                  value={ defaultTextArea }
                  onValueChange={ setDefaultTextArea }
                  v-for="(input, index) in [inputs[0],inputs[4]]"
                  key={ `textarea-${index}` }
                  { ...input }
                ></AppFormTextArea>
              ))
            }

            <AppFormTextArea
              disableResize
              value={ defaultTextArea }
              onValueChange={ setDefaultTextArea }
              label="No Resize"
            ></AppFormTextArea>
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
  readOnly?: boolean;
  color?:ThemedColorTypes.ThemeColors;
  validations?: string;
  name?: string;
}
