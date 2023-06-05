import { AppTable, AppTableType } from "@/components/app";
import { ComponentCard, PageHeader } from "../components";

export default function TablePage() {
  const headers: TableType['headers'] = [
    { text: 'First Name', key: 'first_name', sortable: true },
    { text: 'Last Name', key: 'last_name', sortable: true },
    { text: 'Age', key: 'age', sortable: true },
  ];

  const items: TableType['items'] = [
    { first_name: 'Elson', last_name: 'Sparks', age: 17 },
    { first_name: 'Sheemus', last_name: 'Barks', age: 44 },
    { first_name: 'Tyrone', last_name: 'Al-zhakim', age: 23 },
    { first_name: 'Christie', last_name: 'Fermin', age: 15 },
    { first_name: 'Barley', last_name: 'Monroe', age: 20 },
    { first_name: 'Marlou', last_name: 'Ford', age: 12 },
    { first_name: 'Zandro', last_name: 'Marudz', age: 12 },
    { first_name: 'Tristle', last_name: 'Fermin', age: 54 },
    { first_name: 'Byrone', last_name: 'Al-zhakim', age: 23 },
    { first_name: 'Carlo', last_name: 'Ford', age: 20 },
    { first_name: 'Alexander Dee', last_name: 'Grate', age: 20 },
    { first_name: 'Edris', last_name: 'Elback', age: 20 },
    { first_name: 'Lil', last_name: 'Wayne', age: 20 },
    { first_name: 'Glock', last_name: 'Nayn', age: 40 },
    { first_name: 'Preston', last_name: 'Miles', age: 24 },
    { first_name: 'Edie', last_name: 'Smith', age: 24 },
  ];
  return (
    <div className="p-3 px-6 w-full h-full">
      <PageHeader>Table</PageHeader>

      <ComponentCard title="Default Table">
        <AppTable
          headers={ headers }
          items={ items }
          mobileColumnNumber="2"
        ></AppTable>
      </ComponentCard>

      <ComponentCard title="Table with 5 items per page">
        <AppTable
          headers={ headers }
          items={ items }
          itemsPerPage="5"
        ></AppTable>
      </ComponentCard>

      <ComponentCard title="Table Cell Render Items">
        <AppTable
          headers={ headers }
          itemsPerPage="5"
          persistColumnOnMobile={ [2] }
          items={ items.map(item=>({
            ...items,
            
            first_name: ()=>(
              <p className="text-primary-500">
                { `${item.first_name}` }
              </p>
            ),
            
            last_name: ()=> (
              <p className="font-bold">
                { `${item.last_name}` }
              </p> 
            ),
            
            age: ()=>(
              <div className="flex item-center justify-between">
                <p> { `${item.age}` } </p>
                {
                  (item.age as number < 18) && (
                    <p className="ml-1 px-2 py-1 bg-secondary-500 rounded-full text-white text-xs">
                      Underage
                    </p>

                  )
                }
              </div>
            )
          })) }
        >
        </AppTable>
      </ComponentCard>

      <ComponentCard title="Loading Table">
        <AppTable
          headers={ headers }
          items={ items }
          mobileColumnNumber="2"
          loading
        ></AppTable>
      </ComponentCard>

    </div>
  )
}


/** __TYPE DEFINITION__ */

type TableType = AppTableType.Props<'first_name' | 'last_name' | 'age'>;