import { AppCard, AppFormInput, AppTabs } from "@/components/app";
import { ComponentCard, PageHeader } from "../components";

export default function TabsPage() {
  const tabItems1 = [
    { text: 'Tab 1', content: 'Content 1' },
    { text: 'Tab 2', content: 'Content 2' },
    { text: 'Tab 3', content: 'Content 3' },
  ];
  const sampleEagerElement = (
    <div className="mt-6 flex flex-col md:flex-row gap-3 items-center">
      <input  className="dark: bg-secondary-600"/>
    </div>
  );
  const tabItems2 = [
    { text: 'Tab 1', key: 'tab-1', content: sampleEagerElement  },
    { text: 'Tab 2', key: 'tab-2', content: sampleEagerElement },
    { text: 'Tab 3', key: 'tab-3', content: sampleEagerElement },
  ];
  
  return (
    <div className="p-3 px-6 w-full h-full">
      <PageHeader>Tabs</PageHeader>
      <div>
        {/* Default Tabs */}
        <ComponentCard title="Default Tabs">
          <div className="p-5 h-full">
            <AppCard className="h-full">
              <AppTabs items={ tabItems1 }  />
            </AppCard>    
          </div>  
        </ComponentCard>

        {/* Tab with key */}
        <ComponentCard title="Tabs With Key Property">
          <div className="p-5 h-full">
            <AppCard className="h-full">
              <AppTabs
                items={ tabItems2 }
                panel={(props)=>{
                  const currentTab = props.tabs().find(tab=>tab.key === props.currentTab )
                  return (
                  <div className="flex flex-col md:flex-row gap-3 items-center">
                    <h3 className="text-lg font-semibold">
                      Hello World!
                    </h3>
                    <p>
                      Displaying { currentTab?.text }
                    </p>
                    <p>Key: <span className="">{ currentTab?.key }</span></p>
                  </div>
                )}}
              >
              </AppTabs>
            </AppCard>
          </div>
        </ComponentCard>

        {/* Tab with Eager prop */}
        <ComponentCard title="Tabs With Eager Property">
          <p className="mt-2 text-center">
            Tab with eager props will not unmount inactive tab content
          </p>
          <div className=" p-5 grid md:grid-cols-2 gap-3 h-full">
            <AppCard 
              className="h-full"
              subtitle="Tab with Eager prop on"
            >
              <AppTabs
                items={ tabItems2 }
                eager
              >
                {/* <template
                  v-for="(item) in tabItems2"
                  :key="item.key" 
                  #[`${item.key}`]
                >
                  <div class="flex flex-col md:flex-row gap-3 items-center">
                    <AppFormInput
                      :label="`Input for ${item.text}`"
                    ></AppFormInput>
                  </div>
                </template> */}
              </AppTabs>
            </AppCard>

            <AppCard
              className="h-full"
              subtitle="Tab with Eager prop off"
            >
              <AppTabs 
                items={ tabItems2 }
              >
                {/* <template
                  v-for="(item) in tabItems2"
                  :key="item.key" 
                  #[`${item.key}`]
                >
                  <div class="flex flex-col md:flex-row gap-3 items-center">
                    <AppFormInput
                      :label="`Input for ${item.text}`"
                    ></AppFormInput>
                  </div>
                </template> */}
              </AppTabs>
            </AppCard>

          </div>
        </ComponentCard>
      </div>
      
    </div>
  )
}
