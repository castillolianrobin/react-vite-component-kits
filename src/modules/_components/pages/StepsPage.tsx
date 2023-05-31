// Components
import { AppSteps } from "@/components/app";
import { ComponentCard, PageHeader } from "../components";

export default function StepsPage() {
  return (
    <div className="p-3 px-6 w-full h-full">
      <PageHeader>Tabs</PageHeader>
      
      
      
      {/* Default Tabs */}
      <ComponentCard title="Default Steps">
        <div className="p-1 md:p-5 h-full ">
          <AppSteps 
            containerClass="p-5 border rounded"
            steps={[
              // Step 1
              (<div className="text-center ">
                <p className="font-semibold">Step content 1</p>
                <p>
                  Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                </p>
              </div>),

              // Step 2
              (<div className="text-center">
                <p className="font-semibold">Step Content 2</p>
                <p>
                  Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                </p>
              </div>),

              // Step 3
              (<div className="text-center">
                <p className="font-semibold">Test content 3</p>
                <p>
                  Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                </p>
              </div>),
            ]} 
          ></AppSteps>
        </div>
      </ComponentCard>

      {/* Default Tabs */}
      <ComponentCard title="Labeled Steps">
        <div className="p-1 md:p-5 h-full ">
        <AppSteps 
            containerClass="p-5 border rounded"
            steps={{
              // Step 1
              'Add': (<div className="text-center ">
                <p className="font-semibold">Step content 1</p>
                <p>
                  Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                </p>
              </div>),

              // Step 2
              'Push': (<div className="text-center">
                <p className="font-semibold">Step Content 2</p>
                <p>
                  Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                </p>
              </div>),

              // Step 3
              'Commit': (<div className="text-center">
                <p className="font-semibold">Test content 3</p>
                <p>
                  Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
                </p>
              </div>),
            }} 
          ></AppSteps>
        </div>
      </ComponentCard>
    </div>
  )
}
