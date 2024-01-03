import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl, endPoint } from '../config/url';
import { archiveCall, getCallList } from '../services/call';

const CallList = () => {
  const [archivedCallList, setArchivedCallList] = useState([])
  const [checkArchived, setCheckArchived] = useState(false)
  const [callList, setCallList] = useState([
    { id: 1, name: 'John Doe', phoneNumber: '9149323087' },
    { id: 2, name: 'Jane Smith', phoneNumber: '9149323087' },
    { id: 3, name: 'Alice Johnson', phoneNumber: '9149323087' },
    { id: 4, name: 'Alice Johnson', phoneNumber: '9149323087' },
    { id: 5, name: 'Alice Johnson', phoneNumber: '9149323087' },
    { id: 6, name: 'Alice Johnson', phoneNumber: '9149323087' },
  ]);


  const fetchActivitiesData =  async () => {
    try {
      const response = await getCallList();
      const unarchivedCalllist=response?.data?.filter(item=>item?.is_archived==false)
      const archivedCalllist=response?.data?.filter(item=>item?.is_archived==true)
setArchivedCallList(archivedCalllist)
      setCallList(unarchivedCalllist)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  const handleArchived =async (id) => {
    try {
      let params={is_archived: true}
      const response = await archiveCall(id,params)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchActivitiesData();
  }, []);

  console.log(archivedCallList,callList)


  return (
    <div>
      <h2>AirCall Phone</h2>
      <ul>
        {callList.map((contact) => (
          <li key={contact?.id}>
            {contact.call_type??"NA"}: {contact.from??"NA"}<button onClick={()=>handleArchived(contact?.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CallList;
