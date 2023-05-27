// Components
import { AppButton, AppTooltip } from "@/components/app";
import { ComponentCard, PageHeader } from "../components";

export default function TooltipPage() {
  return (
    <div className="p-3 px-6 w-full h-full">
      <PageHeader>Tooltips</PageHeader>
       
      {/* Default Tooltip */}
      <ComponentCard title="Default Tooltip">
        <div className="p-4">
          <div className="flex item-center justify-center gap-1">
            <p>
              Hover on the info icon to show the tooltip
            </p>
            <AppTooltip
              direction="left"
              tooltipText="Default tooltip text"
            ></AppTooltip>
          </div>
        </div>
      </ComponentCard>

      {/* Tooltio Direction */}
      <ComponentCard title="Tooltip Directions">
        <div className="p-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 item-center justify-center gap-5">
            <div className="flex justify-center items-center">
              <AppTooltip 
                direction="top" 
                tooltipText="Tooltip Text"
              >
                <div className="border border-primary-300 px-2 rounded">
                  Top
                </div>
              </AppTooltip>
            </div>
            <div className="flex justify-center items-center">
              <AppTooltip 
                direction="bottom" 
                tooltipText="Tooltip Text"
              >
                <div className="border border-primary-300 px-2 rounded">
                  Bottom
                </div>
              </AppTooltip>
            </div>

            <div className="flex justify-center">
              <AppTooltip 
                direction="right" 
                tooltipText="Tooltip Text"
              >
                <div className="border border-primary-300 px-2 rounded">
                  Right
                </div>
              </AppTooltip>
            </div>

            <div className="flex justify-center">
              <AppTooltip 
                direction="left" 
                tooltipText="Tooltip top"
              >
                <div className="border border-primary-300 px-2 rounded">
                  Left
                </div>
              </AppTooltip>
            </div>
          </div>

        </div>
        </ComponentCard>

        <ComponentCard title="Tooltip on Click">
          <div className="flex justify-center">
            <AppTooltip 
              showOnClick
              direction="top" 
              tooltipText="Tooltip top"
            >
              <AppButton>Click Me</AppButton>
            </AppTooltip>
          </div>
        </ComponentCard>
    </div>
  )
}
