import React, { useState } from "react";
import { archiveCall, getCallDetailsById } from "../services/call";
import "../App.css";
import moment from "moment";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { HiOutlineDotsVertical } from "react-icons/hi";
import incommingCall from "../assests/incomming-.png";
import { MdCallMissed } from "react-icons/md";
import { MdCallReceived } from "react-icons/md";

const AllCall = ({ list }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleArchiveAndClose = (data) => {
    handleArchived(data);
    handleClose();
  };

  const handleArchived = async (data) => {
    try {
      let params = { is_archived: !data?.is_archived };
      let id = data?.id;
      const response = await archiveCall(id, params);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLinkClick = async (id) => {
    try {
      const response = await getCallDetailsById(id);
      console.log(response, "..............response");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatPhoneNumber = (phoneNumber) => {
    console.log(phoneNumber);
    const temp = phoneNumber.toString();
    if (temp && temp?.length >= 2) {
      // Insert a dash after the first two digits
      console.log(`${temp.substring(0, 2)}-${temp.substring(2)}`);
      return `${temp.substring(0, 2)}-${temp.substring(2)}`;
    }
    return phoneNumber;
  };

  return (
    <div className="contact-history-container">
      <h2>All Calls Phone</h2>
      <ul
        className="chat-list"
        style={{
          border: "1px solid gray",
          borderRadius: "10px",
          paddingLeft: "1rem",
          paddingBottom: "1rem",
        }}
      >
        {list.map(
          (contact) =>
            contact?.to &&
            contact.from && (
              <li key={contact?.id} className="chat-item ccc">
                <div className="call">
                  {contact.call_type === "missed" ? (
                    <MdCallMissed size={25} style={{ color: "red" }} />
                  ) : (
                    <MdCallReceived size={25} style={{ color: "green" }} />
                  )}
                </div>
                <div className="contact-details">
                  <span
                    style={{
                      cursor: "pointer",
                      color: "black",
                      fontSize: "20px",
                      fontWeight: "bold",
                      fontFamily: "",
                    }}
                    onClick={() => handleLinkClick(contact?.id)}
                    className="direction"
                  >
                    {contact.from && formatPhoneNumber(contact.from)}
                  </span>
                  <span className="call-type">
                    tried to call {contact.to ?? "NA"}
                  </span>
                </div>
                <div className="options">
                  <Button aria-describedby={id} onClick={handleClick}>
                    <HiOutlineDotsVertical style={{ color: "gray" }} />
                  </Button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    PaperProps={{ elevation: 0 }}
                  >
                    <Typography
                      sx={{
                        p: 2,
                        cursor: "pointer",
                        border: "1px solid #ccc",
                        borderRadius: "12px",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                      onClick={() => handleArchiveAndClose(contact)}
                    >
                      Archive
                    </Typography>
                  </Popover>
                </div>
                <span className="timestamp">
                  {moment(contact?.created_at).format("hh:mm A")}
                </span>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default AllCall;
