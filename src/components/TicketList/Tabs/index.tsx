"use client"

import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
} from "@material-tailwind/react";
import TicketList from "../ActiveTickets";
import ActiveTickets from "../ActiveTickets";
import ClosedTickets from "../ClosedTickets";
 
export default function TabsTicketList() {
  const [activeTab, setActiveTab] = React.useState("html");
  const data = [
    {
      label: "Ativos",
      value: "html",
      desc: <ActiveTickets />,
    },
    {
      label: "Encerrados",
      value: "react",
      desc: <ClosedTickets />,
    },
  ];
  return (
    <Tabs value={activeTab} className="w-full flex flex-col items-center px-2 md:px-36">
      <div className="bg-gray-200 w-full flex flex-col items-center rounded-lg">
        <Typography variant="h3" color="indigo" >Meus Ingressos</Typography>
        <TabsHeader
          className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className: "bg-transparent border-b-2 border-indigo-500 shadow-none rounded-none",
          }}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={activeTab === value ? "text-indigo-500" : ""}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
      </div>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}