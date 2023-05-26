import { AppButton, AppCard, AppDropdown, AppDropdownTypes } from "@/components/app";
import { ComponentCard, PageHeader } from "../components";


export default function DropdownPage() {
  const dropdownItems = [
    { text: 'Item 1' },
    { text: 'Item 2' },
    { text: 'Item 3' },
    { text: 'Item 4' },
  ];  

  const dropPositions: AppDropdownTypes.Props['drop'][] = [
    'down', 'up', 'right', 'left'
  ];
  

  return (
    <div className="p-3 px-6 w-full h-full">
      <PageHeader>Dropdowns</PageHeader>
      <div className="">
        {/* Default Dropdown */}
        <ComponentCard title="Default Dropdown">
          <div className="flex flex-wrap justify-center gap-4">
            <AppDropdown></AppDropdown>
          </div>
        </ComponentCard>

        {/* Dropdown Drop Positions */}
        <ComponentCard title="Dropdown Positions">
          <div className="grid grid-cols-2 md:grid-cols-4 justify-center gap-6">
            { dropPositions.map(position => (
              <div 
                key={ position }
                className="flex justify-center"
              >
                <AppDropdown
                  drop={ position }
                  items={ dropdownItems }
                  trigger={ (props)=>(
                    <AppButton
                      className="capitalize" 
                      { ...props.triggerAttrs() }
                    >
                      Drop { position }
                    </AppButton>
                  ) }
                ></AppDropdown>
              </div>
            )) }
          </div>
        </ComponentCard>


        <div className="grid md:grid-cols-2 gap-4">

          {/* Slotted Dropdown */}
          <ComponentCard title="Dropdown Trigger Slot">
            <div className="flex flex-wrap justify-center gap-4">
              <AppDropdown
                items={ dropdownItems }
                trigger={ ({ triggerAttrs }) => (
                  <AppButton
                    variant="outline" 
                    { ...triggerAttrs() } 
                  >
                    Custom Trigger
                  </AppButton>
                ) }
              >
              </AppDropdown>
            </div>
          </ComponentCard>

          {/* Slotted Dropdown */}
          <ComponentCard title="Dropdown Default Slot (Menu)">
            <div className="flex flex-wrap justify-center gap-4">
              <AppDropdown>
                <div className="p-2 bg-primary-300 relative whitespace-nowrap">
                  <p>Showing an AppCard instead</p>
                  <AppCard className="min-w-full">
                    Hello World
                  </AppCard>
                </div>
              </AppDropdown>
            </div>
          </ComponentCard>
        </div>

      </div>
    </div>
    )
  }
  
  
