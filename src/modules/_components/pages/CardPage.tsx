// Components
import { ComponentCard, PageHeader } from "../components";
import { AppButton, AppCard } from "@/components/app";

export default function CardPage() {
  return (
    <div className="p-3 px-6 w-full h-full">
      <PageHeader>Cards</PageHeader>

      <div className="grid lg:grid-cols-2 items-stretch gap-5">
        {/* Default Card */}
        <ComponentCard title="Default Card">
          <div className="p-5 h-full">
            <AppCard className="h-full">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet gravida augue. Curabitur et erat non ligula iaculis malesuada id at magna. Nulla pharetra, lacus at blandit porta, mi metus congue nisl, iaculis tristique dui sem a libero. Aenean tempor, tortor non blandit gravida, urna felis malesuada massa, quis rutrum felis nisi vitae sem. Aenean volutpat orci massa. Fusce eget mollis felis, tristique gravida sem.
            </AppCard>
          </div>
        </ComponentCard>
        

        {/* Card Slots */}
        <ComponentCard title="Card Slot Composition">
          <div className="p-5 h-full">
            <AppCard 
              className="h-full"
              title={<span>Prop Name: title</span>}
              subtitle={<span>Prop Name: Subtitle</span>}
              actions={<span>Prop Name: Actions</span>}
            >

              <p>Prop Name: Children (Default)</p>
            </AppCard>
          </div>
        </ComponentCard>
      </div>

      {/* Sample Card */}
      <ComponentCard title="Sample Card with slots">
          <div className=" p-5">
            <AppCard 
              className="mx-auto w-[500px] max-w-full"
              title="Confirm Transaction!"
              subtitle="Transaction ID: 5x-453453-234X"
              actions={<>
                <AppButton variant="outline">
                  Cancel
                </AppButton>

                <AppButton>
                  Confirm
                </AppButton>
              </>}
            >              
              <p>
                We need your confirmation to proceed with the transaction step.
              </p>

              <p>
                Click the 'confirm' button to agree with the terms of service.
              </p>
            </AppCard>
          </div>
        </ComponentCard>
    </div>
  )
}
