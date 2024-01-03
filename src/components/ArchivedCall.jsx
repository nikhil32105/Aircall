import React from 'react'
import { archiveCall, getCallDetailsById } from '../services/call'

const ArchivedCall = ({ list }) => {
  

  const handleArchived =async (data) => {
    try {
      let params={is_archived: !data?.is_archived}
      let id=data?.id

      const response = await archiveCall(id,params)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleLinkClick = async (id) => {
    try {
      const response = await getCallDetailsById(id)
      console.log(response,'..............response')
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }



  return (
    < div >
      <h2>Archived Call</h2>
      <ul>
        {list.map((contact) => (
          <li key={contact?.id}>
            <span
              style={{ textDecoration: 'underline', cursor: 'pointer', color:'red' }}
              onClick={() => handleLinkClick(contact?.id)}
            >
              {contact.call_type ?? "NA"}
            </span>
            : {contact.from ?? "NA"}
            <button onClick={() => handleArchived(contact)}>X</button>
          </li>
        ))}
      </ul>

    </ div>
  )
}

export default ArchivedCall