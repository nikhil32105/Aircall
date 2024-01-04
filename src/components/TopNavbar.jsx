
import React , {useState , useEffect}from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import activityCall from "../assests/activityCall.png";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const TopNavbar = ({getTabNumber}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    getTabNumber(activeTab)
  }, [activeTab]);

  return (
    <div className="t-navbar">
      <div className="activity">
        <span>
          <img src={activityCall} alt="" className="activity-icon" />
        </span>
        Activity
      </div>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {/* <Tab label="Activity" icon={<img src={activityCall} alt="Activity" className="activity-icon" />} /> */}
        <Tab label="Inbox" />
        <Tab label="All Calls" />
      </Tabs>
    </div>
  );
};

export default TopNavbar;
