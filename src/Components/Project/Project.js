import { useState } from "react";
import React from "react";
import "./Project.css";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

const Project = ({ name, service, image, description }) => {
  const [isopen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="projectCard"
        style={{ backgroundImage: `url(${image})` }}
        onClick={(e) => setIsOpen(true)}
      >
        <h3 className="projectName">{name.toUpperCase()}</h3>
        <p className="projectService">{service.toUpperCase()}</p>
      </div>
      <div className="pop-up-project">
        <Dialog
          // sx={{ width: "auto" }}
          open={isopen}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogActions>
            <Button onClick={handleClose}>X</Button>
          </DialogActions>
          <DialogContent>
            <div>
              <img
                src={image}
                style={{ width: "100%" }}
                alt="Project Icon"
              ></img>
              <br></br>
              <br></br>
              <h3>Name: {name}</h3> <br></br>
              <p>Service: {service.toUpperCase()}</p>
              <br></br>
              <p>Description: {description}</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Project;
