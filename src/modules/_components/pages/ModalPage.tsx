import { useState } from "react";
// Components
import { AppButton, AppModal } from "@/components/app";
import { ComponentCard, PageHeader } from "../components";

export default function ModalPage() {
  const [modalActive, setModalActive] = useState(false)
  return (
    <div className="p-3 px-6 w-full h-full">
      <PageHeader >Modals</PageHeader>

      {/* Modal via Props */}
      <ComponentCard title="Modal Trigger via Prop">
        <AppModal 
          closeIcon
          active={ modalActive }
          onValueChange={ setModalActive }
        >
          <h1 
            className="mb-3 text-lg text-center drop-shadow-lg font-semibold text-primary-500"
          >
            Hello World!
          </h1>
          <p className="my-2 text-center">Showing Modal using v-model:active</p>
          <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
        </AppModal>
        <div className="grid md:grid-cols-2 items-center justify-center">
          <div className="flex justify-center">
            <AppButton onClick={ ()=>setModalActive(!modalActive) }>
              Show Modal via v-model
            </AppButton>
          </div>

          <p className="text-center">
            Reactive State: <b className="uppercase">{ modalActive ? 'Active' : 'Inactive'  }</b>
          </p>
        </div>
      </ComponentCard>


      
      {/* Modal via template */}
      <ComponentCard title="Modal Trigger via Slot">
        <AppModal 
          closeIcon
          trigger={({ toggleModal })=>(
            <div className="flex justify-center">
              {/* Trigger */}
              <AppButton onClick={ ()=>toggleModal(true) }>
                Show Modal via slot
              </AppButton>
            </div>
          )}
        >
          <h1 
            className="mb-3 text-lg text-center drop-shadow-lg font-semibold text-primary-500"
          >
            Hello World!
          </h1>
          <p className="my-2 text-center">Showing Modal using 'trigger' slot</p>
          <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
        </AppModal>
      </ComponentCard>

      <div className="grid md:grid-cols-2 gap-4">

        {/* Persisting Modal */}
        <ComponentCard title="Persisting Modal">
          <AppModal 
            persist 
            closeIcon
            trigger={({ toggleModal })=>(
              <div className="flex justify-center">
                <AppButton onClick={()=>toggleModal(true)}>
                  Show Persisting Modal
                </AppButton>
              </div>
            )}
            render={({ toggleModal})=>(
              <>
                <h1 
                  className="my-3 text-lg text-center drop-shadow-lg font-semibold text-primary-500"
                >
                  Persisting Modal
                </h1>
                <div className="flex flex-col items-center">
                  <p className="my-3">This modal will not close unless the force close button is clicked</p>
                  <AppButton 
                    color="secondary-500" 
                    onClick={ ()=>toggleModal(false) }
                  >
                    Force Close Modal
                  </AppButton>
                </div>
              </>
            )}
          >
          </AppModal>
        </ComponentCard>

        {/* Custom modal */}
        <ComponentCard title="Custom Modal">
          <AppModal
            modal={({ toggleModal })=>(
              <div className="bg-primary-500 p-4 rounded-lg">
                <h1 
                  className="my-3 text-lg text-center drop-shadow-lg font-semibold text-white"
                >
                  This is a custom modal
                </h1>
                <div className="flex flex-col items-center">
                  <p className="my-3">This modal will not close unless toggled</p>
                  <AppButton 
                    color="secondary-500" 
                    className="mt-5"
                    onClick={ ()=>toggleModal(false) } 
                  >
                    Close Modal
                  </AppButton>
                </div>
              </div>
            )}
            trigger={({ toggleModal })=>(
              <div className="flex justify-center">
                <AppButton onClick={ ()=>toggleModal(true) }>
                  Custom Modal
                </AppButton>
              </div>
            )}
          ></AppModal>
        </ComponentCard>
      </div>
    </div>
  )
}
