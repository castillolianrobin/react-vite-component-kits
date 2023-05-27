import { AppCard, AppTabs } from "@/components/app";
import { ComponentCard, PageHeader } from "../components";

export default function TabsPage() {
  const tabItems1 = [
    { text: 'Tab 1', content: 'Content 1' },
    { text: 'Tab 2', content: 'Content 2' },
    { text: 'Tab 3', content: 'Content 3' },
  ];
  const tabItems2 = [
    { text: 'Tab 1', key: 'tab-1' },
    { text: 'Tab 2', key: 'tab-2' },
    { text: 'Tab 3', key: 'tab-3' },
  ];
  
  return (
    <div className="p-3 px-6 w-full h-full">
      <PageHeader>Tabs</PageHeader>
      <div>
        {/* Default Tabs */}
        <ComponentCard title="Default Tabs">
          <div className="p-5 h-full">
          <AppCard className="h-full">
            <AppTabs items={ tabItems1 } />
          </AppCard>  
          
          </div>  
        </ComponentCard>
      </div>
      
    </div>
  )
}
