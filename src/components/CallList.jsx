import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl, endPoint } from '../config/url';

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
  const baseurl = baseUrl.baseUrl
  const route = endPoint.activities;


  const fetchActivitiesData =  async () => {
    try {
      const response = await axios.get(baseurl + route);
      console.log(response, '...............response')
      // setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchActivitiesData();
  }, []);


  const handleArchivedCalls = (index) => {
    let newCallList = callList?.filter(call => call?.id != index)
    setArchivedCallList([...archivedCallList, callList[index]])
    setCallList(newCallList)
  }

  console.log(callList, 'Call')

  return (
    <div>
      <h2>AirCall Phone</h2>
      <ul>
        {callList.map((contact) => (
          <li key={contact?.id}>
            {contact.name}: {contact.phoneNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CallList;
