import React, { useState } from 'react';
import ArchivedCall from './ArchivedCall';

const PhoneDirectory = () => {
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

  const handleArchivedCalls = (index) => {
    let newCallList = callList?.filter(call => call?.id != index)
    setArchivedCallList([...archivedCallList, callList[index]])
    setCallList(newCallList)
  }

  

  return (
    <div>
      <div onClick={() => setCheckArchived(true)}>Archived</div>
      {checkArchived ?
        <ArchivedCall callList={archivedCallList} /> :


        <>
          <h2>AirCall Phone</h2>
          <ul>
            {callList.map((contact) => (
              <li key={contact?.id}>
                {contact.name}: {contact.phoneNumber} : <button onChange={handleArchivedCalls(contact?.id)}>X</button>
              </li>
            ))}
          </ul>
        </>
      }
    </div>
  );
};

export default PhoneDirectory;
