import { AppFormInput, AppFormSelect, AppPagination } from "@/components/app";
import { useState } from "react";
import { ComponentCard, PageHeader } from "../components";

export default function PaginationPage() {
  // First pagination
  const [firstPagination, setFirstPagination] = useState(1);
  // Second pagination
  const [secondPagination, setSecondPagination] = useState(1);
  const [secondPaginationLength, setsecondPaginationLength ] = useState(10);
  
  // Third pagination
  const [thirdPagination, setThirdPagination] = useState(1);
  const [thirdPaginationLength, setThirdPaginationLength] = useState(100);
  const [thirdPaginationPageVisible, setThirdPaginationPageVisible] = useState(3);
  
  // Fourth pagination
  const [fourthPagination, setFourthPagination] = useState(1);

  
  return (
    <div className="p-3 px-6 w-full h-full">
      <PageHeader>Pagination</PageHeader>

      <ComponentCard title="Pagination v-model">
        <div className="grid lg:grid-cols-2 items-center justify-center">
          <div>
            <AppPagination
              value={ firstPagination }
              onValueChange={ setFirstPagination }
              length="10"
            ></AppPagination>
          </div>

          <p className="text-center">
            Current Page:
            <b className="ml-2 text-primary-500">
              { firstPagination }
            </b>
          </p>
        </div>
      </ComponentCard>

      <div className="grid lg:grid-cols-2 gap-4">
        <ComponentCard title="Pagination Length">
          <div className="grid lg:grid-cols-2 items-end justify-center">
            <div>
              <AppPagination
                value={ secondPagination }
                onValueChange={ setSecondPagination }
                length={ secondPaginationLength }
              ></AppPagination>
            </div>

            <div>
              <AppFormInput
                value={ secondPaginationLength }
                onValueChange={ (e)=>setsecondPaginationLength(+e) }
                label="Pagination Length"
                type="number"
                min="1"
              />
            </div>
          </div>
        </ComponentCard>

        <ComponentCard title="Pagination Visible Page">
          <div className="grid lg:grid-cols-2 items-end justify-center">
            <div>
              <AppPagination
                value={ thirdPagination }
                onValueChange={ setThirdPagination }
                length={ thirdPaginationLength }
                pageVisible={ thirdPaginationPageVisible }
              ></AppPagination>
            </div>

            <div>
              <AppFormSelect
                value={ thirdPaginationPageVisible }
                onValueChange={ setThirdPaginationPageVisible }
                items={ [1,2,3,4,5] }
                label="Visible Page Length"
              ></AppFormSelect>
            </div>
          </div>
        </ComponentCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 w-full overflow-hidden">
        {/* persistEdgePAges props */}
        <ComponentCard title="Pagination with persisting edge pages">
          <div className="grid items-center justify-center">
            <div>
              <AppPagination
                value={ fourthPagination }
                onValueChange={ setFourthPagination }
                length="10"
                pageVisible="5"
                persistEdgePages
              ></AppPagination>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard title="Disabled Pagination">
          <div className="grid items-center justify-center">
            <div>
              <AppPagination
                length="10"
                disabled
              ></AppPagination>
            </div>
          </div>
        </ComponentCard>
      </div>
    </div>
  )
}
