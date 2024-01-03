import React, { useEffect, useState } from 'react';
import { getCallList } from '../services/call';
import ArchivedCall from './ArchivedCall';
import UnArchivedCall from './UnArchivedCall';

const CallList = () => {
  const [archivedCallList, setArchivedCallList] = useState([])
  const [checkArchived, setCheckArchived] = useState(false)
  const [callList, setCallList] = useState([]);

  const sortCallList = (list) => {
    const sortedArchivedCalllist = list.sort((a, b) => {
      const dateA = new Date(a?.created_at);
      const dateB = new Date(b?.created_at);
      return dateB - dateA;
    });
    return sortedArchivedCalllist
  }


  const fetchActivitiesData = async () => {
    try {
      const response = await getCallList();
      const data = response?.data
      const unarchivedCalllist = data?.filter(item => item?.is_archived == false)
      const archivedCalllist = data?.filter(item => item?.is_archived == true)
      const sortedCallListArchived = sortCallList(archivedCalllist)
      const sortedCallListUnArchived = sortCallList(unarchivedCalllist)
    


      // const groupedByDay = sortedCallListArchived.reduce((result, item) => {
      //   const date = new Date(item.created_at).toLocaleDateString();
      //   console.log(date,'...............date')
      //   if (!result[date]) {
      //     result[date] = [];
      //   }
      //   result[date].push(item);
      //   return result;
      // }, {});

      //  console.log(groupedByDay,'..............groupedByDay')

      setArchivedCallList(sortedCallListArchived)
      setCallList(sortedCallListUnArchived)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }




  useEffect(() => {
    fetchActivitiesData();
  }, []);



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
