import React from 'react'
import { archiveCall } from '../services/call'

const UnArchivedCall = ({ list }) => {
  const handleArchived = async (data) => {
    try {
      let params = { is_archived: !data?.is_archived }
      let id = data?.id
      const response = await archiveCall(id, params)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  return (
    < div >
      <h2>Aircall Phone</h2>
      <ul>
        {list?.length > 0 && list?.map((contact) => (
          <li key={contact?.id}>
            {contact.direction}: {contact.call_type}<button onClick={() => handleArchived(contact)}>X</button>
          </li>
        ))}
      </ul>

    </ div>
  )
}

export default UnArchivedCall