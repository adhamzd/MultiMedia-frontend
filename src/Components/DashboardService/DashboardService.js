import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import "./DashboardService.css";

import { TiEdit, TiDelete } from "react-icons/ti";

export const DashboardService = ({
  name,
  icon,
  desc,
  id,
  refresh,
  setRefresh,
}) => {
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);

  const [newName, setNewName] = useState(`${name}`);
  const [description, setDescription] = useState(`${desc}`);
  const [image, setImage] = useState("");

  const editService = async () => {
    const formData = new FormData();

    formData.append("name", newName);
    formData.append("description", description);
    formData.append("image", image);

    const requsetOptions = {
      method: "Put",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: formData,
    };
    try {
      await fetch(
        `${process.env.REACT_APP_BACK_URL}service/${id}`,
        requsetOptions
      );
      setRefresh(!refresh);
    } catch (e) {
      setRefresh(!refresh);
    }
  };

  const deleteService = async () => {
    let requsetOptions = {
      method: "Delete",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    };
    try {
      await fetch(
        `${process.env.REACT_APP_BACK_URL}service/${id}`,
        requsetOptions
      );
      setRefresh(!refresh);
    } catch (e) {
      setRefresh(!refresh);
    }
  };

  return (
    <div className="outer-container">
      <div className="dashboard-service">
        <img src={icon} alt="service icon" className="serviceIcon"></img>
        <h3>{name}</h3>
        <TiEdit className="service-edit-icon" onClick={(e) => setEdit(!edit)} />
        <TiDelete
          className="service-delete-icon"
          onClick={(e) => setDel(!del)}
        />
        <div>
          <Dialog open={edit} onClose={(e) => setEdit(!edit)}>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Service Name"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Service Description"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="icon"
                label="Service Icon"
                type="file"
                fullWidth
                variant="standard"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={(e) => setEdit(!edit)}>Cancel</Button>
              <Button
                onClick={(e) => {
                  editService();
                  setEdit(!edit);
                }}
              >
                Send
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Dialog open={del} onClose={(e) => setDel(!del)}>
            <DialogTitle>Delete Service</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this service?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={(e) => setDel(!del)}>No</Button>
              <Button
                onClick={(e) => {
                  deleteService();
                  setDel(!del);
                }}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default DashboardService;
