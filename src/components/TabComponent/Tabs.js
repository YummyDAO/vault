/*import React, { useState } from "react";
import FirstTab from "../AllTabs/FirstTab";
import SecondTab from "../AllTabs/SecondTab";

const Tabs = () => {

    const [activeTab, setActiveTab] = useState("tab1");
    const handleTab1 = () => {
        // update the state to tab1
        setActiveTab("tab1");
      };
      const handleTab2 = () => {
        // update the state to tab2
        setActiveTab("tab2");
      };
  return (
    <div className="Tabs">
     <ul className="nav">
        <li className={activeTab === "tab1" ? "active" : ""} onClick={handleTab1}>Tab 1</li>
        <li className={activeTab === "tab2" ? "active" : ""} onClick={handleTab2}>Tab 2</li>
      </ul>
      <div className="outlet">
      {activeTab === "tab1" ? <FirstTab /> : <SecondTab />}
        //{<FirstTab />
        //<SecondTab />}
      //</div>
    //</div>
  //);
//};
export default Tabs;*/

import React, { useState } from "react";
import TabNavItem from "../V2/TabNavItem";
import TabContent from "../V2/TabContent";
import FirstTab from "../AllTabs/FirstTab.js";
import SecondTab from "../AllTabs/SecondTab.js";
import ThirdTab from "../AllTabs/ThirdTab.js"
 
const Tabs = ({isprice}) => {
  const [activeTab, setActiveTab] = useState("tab1");
 
  return (
    <div className="Tabs">
      <ul className="nav">
        <TabNavItem title="Deposit" id="tab1" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title="Withdraw" id="tab2" activeTab={activeTab} setActiveTab={setActiveTab}/>
        <TabNavItem title="Stats" id="tab3" activeTab={activeTab} setActiveTab={setActiveTab}/>
      </ul>
 
      <div className="outlet">
        <TabContent id="tab1" activeTab={activeTab}>
        <FirstTab/>
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}>
        <SecondTab/>
        </TabContent>
        <TabContent id="tab3" activeTab={activeTab}>
          <ThirdTab price={isprice}/>
        </TabContent>
      </div>
    </div>
  );
};
 
export default Tabs;
