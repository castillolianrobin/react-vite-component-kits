import { AppSteps } from "@/components/app";

export default function StepsPage() {
  return (
    <div>
      steps
      <AppSteps
        value={ 2 } 
        steps={[
          (<div className="bg-success-500">Test</div>),
          (<div className="bg-error-500">Test</div>),
          (<div className="bg-danger-500">Test</div>),
        ]}
      ></AppSteps>
    </div>
  )
}
