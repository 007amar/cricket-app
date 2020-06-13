import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import BottomTabs from "./BottomTabs";

export default function TopTabs() {
  const [status, setStatus] = useState("upcoming");

  const getIndex = (index) => {
    if (index === 0) {
      setStatus("upcoming");
    }
    if (index === 1) {
      setStatus("running");
    }
    if (index === 2) {
      setStatus("completed");
    }
  };

  useEffect(() => {}, [status]);

  return (
    <div className="top-tabs">
      <Tabs onSelect={(index) => getIndex(index)}>
        <TabList>
          <Tab>UPCOMING</Tab>
          <Tab>RUNNING</Tab>
          <Tab>COMPLETED</Tab>
        </TabList>

        <TabPanel>
          <BottomTabs toptabindex={status} />
        </TabPanel>
        <TabPanel>
          <BottomTabs toptabindex={status} />
        </TabPanel>
        <TabPanel>
          <BottomTabs toptabindex={status} />
        </TabPanel>
      </Tabs>
    </div>
  );
}
