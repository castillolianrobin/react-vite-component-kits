import { ThemedColorTypes } from "@/hooks";
import ComponentCard from "../components/ComponentCard";
import PageHeader from "../components/PageHeader";
import { AppButton } from "@/components/app";


export default function ButtonPage() {

  const buttons:Button[] = [
    { title: 'Primary', color: 'primary-500' },
    { title: 'Secondary', color: 'secondary-500' },
    // { title: 'Info', color: 'info-500' },
    // { title: 'Alert', color: 'alert-500' },
    { title: 'Success', color: 'success-500' },
    { title: 'Error', color: 'error-500' },
    { title: 'Disabled', color: 'primary-500', disabled: true },
    { title: 'Loading', color: 'error-500', loading: true },
    { title: 'Small', color: 'primary-500', size: 'sm' },
    { title: 'Medium', color: 'primary-500', size: 'md' },
    { title: 'Large', color: 'primary-500', size: 'lg' },
  ]
  
  
  return (
  <div className="p-3 px-6 w-full h-full">
    <PageHeader>Buttons</PageHeader>

    <div>
      {/* Default Buttons */}
      <ComponentCard title="Default Buttons">
        <div className="flex flex-wrap items-center justify-center gap-4">
          { buttons.map(button=>(
            <AppButton
              { ...button }
              key={`solid-${button.title}`}
            >
              { button.title }
            </AppButton>
          )) }
        </div>
      </ComponentCard>


      {/* Outlined Buttons */}
      <ComponentCard title="Outlined Buttons">
        <div className="flex flex-wrap items-center justify-center gap-4">
          { buttons.map(button=>(
            <AppButton
              { ...button }
              key={`outline-${button.title}`}
              variant="outline"
            >
              { button.title }
            </AppButton>
          )) }
        </div>
      </ComponentCard>


      {/* Text Buttons */}
      <ComponentCard title="Text Buttons">
        <div className="flex flex-wrap items-center justify-center gap-4">
          { buttons.map(button=>(
            <AppButton
              { ...button }
              key={`text-${button.title}`}
              variant="text"
            >
              { button.title }
            </AppButton>
          )) }
        </div>
      </ComponentCard>
    </div>
  </div>
  )
}


/** __TYPE DEFINITIONS__ */


interface Button {
  title: string;
  color: ThemedColorTypes.ThemeColors;
  disabled?: boolean;
  loading?: boolean;
  size?: 'lg' | 'md' | 'sm'
}