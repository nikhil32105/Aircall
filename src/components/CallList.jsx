import React, { useEffect, useState } from 'react';
import {  getCallList } from '../services/call';
import ArchivedCall from './ArchivedCall';
import UnArchivedCall from './UnArchivedCall';

const CallList = () => {
  const [archivedCallList, setArchivedCallList] = useState([])
  const [checkArchived, setCheckArchived] = useState(false)
  const [callList, setCallList] = useState([]);


  const fetchActivitiesData = async () => {
    try {
      const response = await getCallList();
      const data = response?.data
      const unarchivedCalllist = data?.filter(item => item?.is_archived == false)
      const archivedCalllist = data?.filter(item => item?.is_archived == true)
      setArchivedCallList(archivedCalllist)
      setCallList(unarchivedCalllist)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }



  useEffect(() => {
    fetchActivitiesData();
  }, []);

  console.log(checkArchived, 'UNARCHIVE')

  return (
    <div>
      <button onClick={() => setCheckArchived(!checkArchived)}>{checkArchived ? "Archive Calls" : "Unarchived Calls"}</button>
      {checkArchived ?
        <ArchivedCall list={archivedCallList} />
        :
        <UnArchivedCall list={callList} />
      }
    </div>
  );
};

export default CallList;
