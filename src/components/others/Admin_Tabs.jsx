import { Card, CardBody } from "@heroui/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useState } from "react";
import CreateTask from "./CreateTask";
import AssignTask from "./AssignTask";

export function Admin_Tabs() {
  const [activeTab, setActiveTab] = useState("createUser");
  const data = [
    {
      label: "Assign Task",
      value: "createUser",
    },

    {
      label: "Create User",
      value: "assignTask",
    },
  ];

  return (
    <div className=" p-5">
      <Card className="bg-blue-300 h-[125%]">
        <CardBody>
          <Tabs value={activeTab} onChange={setActiveTab} className="w-full">
            <TabsHeader
              className="bg-transparent"
              indicatorProps={{
                className: "bg-gray-900/10 shadow-none !text-gray-900",
              }}
            >
              {data.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody className=" w-full  ">
              <TabPanel key={"createUser"} value={"createUser"}>
                <CreateTask />
              </TabPanel>
              <TabPanel key={"assignTask"} value={"assignTask"}>
                <AssignTask />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
