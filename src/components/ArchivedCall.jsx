import React from 'react'

const ArchivedCall = ({ callList }) => {
  console.log(callList, 'CALL')

  return (
    < div >
      <h2>Archived Call</h2>

      <ul>
        {callList?.length > 0 && callList?.map((contact) => (
          <li key={contact?.id}>
            {contact.name}: {contact.phoneNumber}
          </li>
        ))}
      </ul>

    </ div>
  )
}

export default ArchivedCall