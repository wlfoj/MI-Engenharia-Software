'use client'
import React from "react";
import {
  Tabs,
  TabsHeader,
  Tab,
  TabPanel,
  Typography,
} from "../../ClientSide";

import AdminData from "./profiledata";


export default function AdminP() {
  const [type, setType] = React.useState("admindata");


  return (
    <div className="flex w-full items-center justify-center rounded-md pt-28 md:pt-40 " >
      <Tabs value={type} className="overflow-visible h-[100%]  w-[50%] lg:w-3/6 rounded-lg bg-gray-100 justify-center" >
        <TabsHeader className="h-[5.2rem] text-black bg-light-blue-200">
          <Tab value="admindata" onClick={() => { setType("admindata") }}>
            <Typography className="text-base font-bold" >Dados</Typography> 
          </Tab>
        </TabsHeader>
          <TabPanel className="overflow-auto" value="admindata">
            <AdminData/>
          </TabPanel>
      </Tabs>
    </div>
  )
    ;
}
