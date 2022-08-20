import React, { useState } from "react";
import { SidenavData } from "./SidenavData";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DashLinks = () => {
  const navigate = useNavigate();

  const [log, setLog] = useState(false);

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("../login", { replace: true });
  };
  return (
    <div className="sideNav-dash">
      <ul className="dashNavigation-List">
        {SidenavData.map((val, key) => {
          return (
            <li
              key={key}
              className="dashRow"
              id={window.location.pathname === val.link ? "active" : ""}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div>{val.title}</div>
            </li>
          );
        })}
        <li
          className="dashRow"
          onClick={() => {
            setLog(!log);
          }}
        >
          LOGOUT
        </li>
      </ul>
      <div>
        <Dialog open={log} onClose={(e) => setLog(!log)}>
          <DialogTitle>LOGOUT</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to Logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => setLog(!log)}>No</Button>
            <Button
              onClick={(e) => {
                logout();
                setLog(!log);
              }}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default DashLinks;
