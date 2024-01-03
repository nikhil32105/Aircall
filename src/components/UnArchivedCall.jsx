import React, { useState } from 'react'
import { archiveCall, getCallDetailsById } from '../services/call'
import "../App.css"
import moment from 'moment'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DownArrow from "../assests/down-arrow.png";


const UnArchivedCall = ({ list }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleArchiveAndClose = (data) => {
    handleArchived(data);
    handleClose(); // Close the Popover after handling the archived action
  };


  const handleArchived = async (data) => {
    try {
      let params = { is_archived: !data?.is_archived }
      let id = data?.id
      const response = await archiveCall(id, params)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleLinkClick = async (id) => {
    try {
      const response = await getCallDetailsById(id)
      console.log(response, '..............response')
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }




  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return (
    < div className="aircall-phone-container" >
      <h2>Aircall Phone</h2>
      <ul className="chat-list">
        {list.map((contact) => (
          <li key={contact?.id} className="chat-item">
            <span
              style={{ textDecoration: 'underline', cursor: 'pointer', color: 'red' }}
              onClick={() => handleLinkClick(contact?.id)}
              className="direction"
            >
              {contact.to ?? "NA"}
            </span>
            : {contact.call_type ?? "NA"}
            :{moment(contact?.created_at).format('HH:mm:ss')}
            {/* <button onClick={() => handleArchived(contact)}>X</button> */}
            <div>
              <Button aria-describedby={id} onClick={handleClick}>
                <img src={DownArrow} alt="Down Arrow" style={{ width: '16px', height: '16px' }} />
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                PaperProps={{ elevation: 0 }}

              >
                <Typography sx={{ p: 2, cursor: 'pointer', border: '1px solid #ccc', align: 'right', display: 'flex', justifyContent: 'flex-end' }} onClick={() => handleArchiveAndClose(contact)}>Archive</Typography>
              </Popover>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnArchivedCall