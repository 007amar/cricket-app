import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Cards from "./Cards";

export default function BottomTabs(prop) {
  const [type, setType] = useState("All");

  const getIndex = (index) => {
    if (index === 0) {
      setType("all");
    }
    if (index === 1) {
      setType("international");
    }
    if (index === 2) {
      setType("domestic");
    }
  };

  useEffect(() => {}, [type]);

  return (
    <div className="bottom-tabs">
      <Tabs onSelect={(tabIndex) => getIndex(tabIndex)}>
        <TabList>
          <Tab>All</Tab>
          <Tab>International</Tab>
          <Tab>Domestic</Tab>
        </TabList>

        <TabPanel>
          <Cards type={type} status={prop.toptabindex} />
        </TabPanel>

        <TabPanel>
          <Cards type={type} status={prop.toptabindex} />
        </TabPanel>

        <TabPanel>
          <Cards type={type} status={prop.toptabindex} />{" "}
        </TabPanel>
      </Tabs>
    </div>
  );
}
