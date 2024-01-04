import React, { useEffect, useState } from "react";
import { getCallList } from "../services/call";
import ArchivedCall from "./ArchivedCall";
import UnArchivedCall from "./UnArchivedCall";
import "../App.css";
import ArchiveIcon from "../assests/archive.png";
import Navbar from "./Navbar";
import TopNavbar from "./TopNavbar";
import AllCall from "./AllCall";

const options = [
  {
    id: "1",
    created_at: "2024-01-04T12:00:00",
    direction: "inbound",
    from: "123-456-7890",
    to: "987-654-3210",
    via: "Aircall-1",
    duration: 180,
    is_archived: false,
    call_type: "answered",
  },
  {
    id: "2",
    created_at: "2024-01-04T12:15:00",
    direction: "outbound",
    from: "987-654-3210",
    to: "234-567-8901",
    via: "Aircall-2",
    duration: 120,
    is_archived: true,
    call_type: "missed",
  },
  {
    id: "3",
    created_at: "2024-01-04T12:30:00",
    direction: "inbound",
    from: "345-678-9012",
    to: "789-012-3456",
    via: "Aircall-3",
    duration: 240,
    is_archived: false,
    call_type: "voicemail",
  },
  {
    id: "4",
    created_at: "2024-01-04T12:45:00",
    direction: "outbound",
    from: "789-012-3456",
    to: "123-456-7890",
    via: "Aircall-4",
    duration: 150,
    is_archived: true,
    call_type: "answered",
  },
  {
    id: "5",
    created_at: "2024-01-04T13:00:00",
    direction: "inbound",
    from: "234-567-8901",
    to: "345-678-9012",
    via: "Aircall-5",
    duration: 180,
    is_archived: false,
    call_type: "missed",
  },
  {
    id: "6",
    created_at: "2024-01-04T13:15:00",
    direction: "outbound",
    from: "456-789-0123",
    to: "567-890-1234",
    via: "Aircall-6",
    duration: 210,
    is_archived: true,
    call_type: "answered",
  },
  {
    id: "7",
    created_at: "2024-01-04T13:30:00",
    direction: "inbound",
    from: "567-890-1234",
    to: "678-901-2345",
    via: "Aircall-7",
    duration: 90,
    is_archived: false,
    call_type: "voicemail",
  },
  {
    id: "8",
    created_at: "2024-01-04T13:45:00",
    direction: "outbound",
    from: "678-901-2345",
    to: "789-012-3456",
    via: "Aircall-8",
    duration: 120,
    is_archived: true,
    call_type: "missed",
  },
  {
    id: "9",
    created_at: "2024-01-04T14:00:00",
    direction: "inbound",
    from: "789-012-3456",
    to: "123-456-7890",
    via: "Aircall-9",
    duration: 180,
    is_archived: false,
    call_type: "answered",
  },
  {
    id: "10",
    created_at: "2024-01-04T14:15:00",
    direction: "outbound",
    from: "123-456-7890",
    to: "234-567-8901",
    via: "Aircall-10",
    duration: 150,
    is_archived: false,
    call_type: "voicemail",
  },
  {
    id: "11",
    created_at: "2024-01-04T12:15:00",
    direction: "outbound",
    from: "987-654-3210",
    to: "234-567-8901",
    via: "Aircall-2",
    duration: 120,
    is_archived: false,
    call_type: "missed",
  },
  {
    id: "12",
    created_at: "2024-01-04T12:15:00",
    direction: "outbound",
    from: "987-654-3210",
    to: "234-567-8901",
    via: "Aircall-2",
    duration: 120,
    is_archived: false,
    call_type: "missed",
  },
  {
    id: "13",
    created_at: "2024-01-04T12:15:00",
    direction: "outbound",
    from: "987-654-3210",
    to: "234-567-8901",
    via: "Aircall-2",
    duration: 120,
    is_archived: false,
    call_type: "missed",
  },
  {
    id: "14",
    created_at: "2024-01-04T12:15:00",
    direction: "outbound",
    from: "987-654-3210",
    to: "234-567-8901",
    via: "Aircall-2",
    duration: 120,
    is_archived: false,
    call_type: "missed",
  },
  {
    id: "15",
    created_at: "2024-01-04T12:15:00",
    direction: "outbound",
    from: "987-654-3210",
    to: "234-567-8901",
    via: "Aircall-2",
    duration: 120,
    is_archived: false,
    call_type: "missed",
  },
  {
    id: "16",
    created_at: "2024-01-04T12:15:00",
    direction: "outbound",
    from: "987-654-3210",
    to: "234-567-8901",
    via: "Aircall-2",
    duration: 120,
    is_archived: false,
    call_type: "missed",
  },
  {
    id: "17",
    created_at: "2024-01-04T12:15:00",
    direction: "outbound",
    from: "987-654-3210",
    to: "234-567-8901",
    via: "Aircall-2",
    duration: 120,
    is_archived: false,
    call_type: "missed",
  },
  {
    id: "18",
    created_at: "2024-01-04T12:15:00",
    direction: "outbound",
    from: "987-654-3210",
    to: "234-567-8901",
    via: "Aircall-2",
    duration: 120,
    is_archived: false,
    call_type: "missed",
  },
];

const CallList = () => {
  const [archivedCallList, setArchivedCallList] = useState([]);
  const [checkArchived, setCheckArchived] = useState(false);
  const [callList, setCallList] = useState([]);
  const [currentTab, setCurrentTab] = useState()
  const [allCallsList, setAllCallsList] = useState([])

  const sortCallList = (list) => {
    const sortedArchivedCalllist = list.sort((a, b) => {
      const dateA = new Date(a?.created_at);
      const dateB = new Date(b?.created_at);
      return dateB - dateA;
    });
    return sortedArchivedCalllist;
  };

  const fetchActivitiesData = async () => {
    try {
      const response = await getCallList();
      const data = response?.data;
      const sortedCallList = sortCallList(data)
      setAllCallsList(sortedCallList)


      const unarchivedCalllist = sortedCallList?.filter(
        (item) => item?.is_archived == false
      );
      const archivedCalllist = sortedCallList?.filter(
        (item) => item?.is_archived == true
      );

      // Group the sorted data by date
      const groupedData = sortedCallList.reduce((result, item) => {
        const date = item.created_at.split("T")[0]; // Extracting the date part
        result[date] = result[date] || [];
        result[date].push(item);
        return result;
      }, {});

      console.log(groupedData, "groupedData");

      setArchivedCallList(archivedCalllist);
      setCallList(unarchivedCalllist);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getTabNumber = (tabNum) => {
    setCurrentTab(tabNum)
  }

  useEffect(() => {
    fetchActivitiesData();
  }, []);

  return <div className="aircall-phone-container">
    <TopNavbar getTabNumber={getTabNumber} />
    {currentTab === 0 && !checkArchived && (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #ccc",
        }}
      >
        <img src={ArchiveIcon} style={{ width: "20px", height: "20px" }} />
        <div
          className="chat-item"
          style={{
            fontSize: "20px",
            color: "gray",
            marginLeft: "5px",
            cursor: "pointer",
          }}
          onClick={() => setCheckArchived(!checkArchived)}
        >
          Archived ({archivedCallList?.length})
        </div>
      </div>
    )}

    {currentTab === 1 && (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #ccc",
        }}
      >
      <div
          className="chat-item"
          style={{
            fontSize: "20px",
            color: "gray",
            marginLeft: "5px",
            cursor: "pointer",
          }}
          
        >
        Total Number of Calls ({allCallsList?.length})
        </div>
      </div>
    )}

    {currentTab === 0 ? (
      checkArchived ? (
        <ArchivedCall
          list={archivedCallList}
          checkArchived={checkArchived}
          setCheckArchived={setCheckArchived}
        />
      ) : (
        <UnArchivedCall list={callList} />
      )
    ) : (
      <AllCall list={allCallsList} />
    )}

    <Navbar />
  </div>


};

export default CallList;
