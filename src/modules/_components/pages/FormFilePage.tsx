import { AppButton, AppFormFile } from "@/components/app";
import { useState } from "react";
import { ComponentCard, PageHeader } from "../components";

export default function FormFilePage() {
  const [file1, setFile1] = useState<File[]>([])
  const [file2, setFile2] = useState<File[]>([])
  const [file3, setFile3] = useState<File[]>([])
  const [file4, setFile4] = useState<File[]>([])
  const [file5, setFile5] = useState<File[]>([])

  
  return (
    <div className="p-3 px-6 w-full h-full">
      <PageHeader>Form File Upload</PageHeader>
      <ComponentCard title="Default File Upload">
        <AppFormFile
          value={file1}
          onValueChange={setFile1}
          label="Single file upload"
        ></AppFormFile>
      </ComponentCard>

      <ComponentCard title="File Upload With Limit">
        <AppFormFile
          value={file2}
          onValueChange={setFile2}
          accept="image/*"
          maxSize="25"
          label="Single file upload"
        ></AppFormFile>
      </ComponentCard>

      <ComponentCard title="Multiple File Upload">
        <AppFormFile
          value={file3}
          onValueChange={setFile3}
          label="Multiple file upload" 
          maxSize="25000"
          multiple
        ></AppFormFile>
      </ComponentCard>

      <ComponentCard title="Default File Input">
        <AppFormFile
          multiple
          defaultInput
          value={file4}
          onValueChange={setFile4}
          label="Multiple file upload" 
        ></AppFormFile>
      </ComponentCard>


      <ComponentCard title="File Upload Custom Display Slot">
        <AppFormFile
          value={file5}
          onValueChange={setFile5}
          label="Single file upload"
          color="success-500"
          defaultInput
          multiple
          display={ ({ openFileInput, props: _props })=>(
            <div 
              className="flex gap-2"
              onClick={ ()=>openFileInput() }          
            >
              {
                !_props?.value?.length 
                ? (<p className="text-secondary-500">
                    No file to show
                  </p>)
                : _props.value.map((file, i)=>(
                  (<div
                    key={ `file-${i}` }
                    className={ `
                      px-2 
                      text-white
                      rounded-full
                      bg-${_props.color}
                      flex gap-1 items-center
                    ` }
                  >
                    <span>{ file.name }</span>
                    <AppButton 
                      size="sm" 
                      variant="text"
                      color="black" 
                      className="p-0 rounded-full font-bold"
                      onClick={ (e)=>{ e.stopPropagation(); file5.splice(i, 1) } }
                    >
                      x
                    </AppButton>
                  </div>)
                ))
              }
            </div>)
          }
        ></AppFormFile>
      </ComponentCard>


    </div>
  )
}
