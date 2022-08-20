import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl, Select, MenuItem } from "@mui/material";

import "./Project.css";

import { TiEdit, TiDelete } from "react-icons/ti";

const Project = ({
  title,
  description,
  service,
  image,
  id,
  refresh,
  setRefresh,
}) => {
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);

  const [newTitle, setNewTitle] = useState(`${title}`);
  const [newDescription, setNewDescription] = useState(`${description}`);
  const [newService, setNewService] = useState(`${service}`);
  const [newImage, setNewImage] = useState("");

  const [services, setServices] = useState("");

  const fetchServices = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACK_URL}service`);
      const resJson = await res.json();
      setServices(resJson);
    } catch (e) {
      setRefresh(!refresh);
    }
  };
  let handleServiceChange = (e) => {
    setNewService(e.target.value);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const editProject = async () => {
    const formData = new FormData();

    formData.append("title", newTitle);
    formData.append("description", newDescription);
    formData.append("service", newService);
    formData.append("image", newImage);

    const requsetOptions = {
      method: "Put",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: formData,
    };
    try {
      await fetch(
        `${process.env.REACT_APP_BACK_URL}projects/${id}`,
        requsetOptions
      );
      setRefresh(!refresh);
    } catch (e) {
      setRefresh(!refresh);
    }
  };

  const deleteProject = async () => {
    let requsetOptions = {
      method: "Delete",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    };
    try {
      await fetch(
        `${process.env.REACT_APP_BACK_URL}projects/${id}`,
        requsetOptions
      );
      setRefresh(!refresh);
    } catch (e) {
      setRefresh(!refresh);
    }
  };

  const editClickOpen = () => {
    setEdit(true);
  };

  const editClose = () => {
    setEdit(false);
  };

  const deleteClickOpen = () => {
    setDel(true);
  };

  const deleteClose = () => {
    setDel(false);
  };

  return (
    <div>
      <TiEdit className="project-edit-icon" onClick={editClickOpen} />

      <TiDelete className="project-delete-icon" onClick={deleteClickOpen} />

      <div
        className="projectCard-dash"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="projectTitle-dash"> {title} </div>

        <div>
          <Dialog open={edit} onClose={editClose}>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Project Title"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Project Description"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <br />
              <br />

              <label
                autoFocus
                margin="dense"
                id="edit-service-title"
                variant="standard"
              >
                {" "}
                Project Service{" "}
              </label>
              <br />
              <br />

              <FormControl className="FormControl">
                {services && (
                  <Select
                    onChange={handleServiceChange}
                    label="Project Service"
                    value={newService}
                    defaultValue={newService}
                  >
                    {services.map((ele, i) => {
                      return (
                        <MenuItem key={i} value={ele._id}>
                          {" "}
                          {ele.name.toUpperCase()}{" "}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              </FormControl>
              <br />
              <br />
              <br />
              <br />

              <TextField
                autoFocus
                margin="dense"
                id="image"
                label="Project Image"
                type="file"
                fullWidth
                variant="standard"
                defaultValue={newImage}
                onChange={(e) => setNewImage(e.target.files[0])}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={(e) => setEdit(!edit)}>Cancel</Button>
              <Button
                onClick={(e) => {
                  editProject();
                  setEdit(!edit);
                }}
              >
                Send
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div>
          <Dialog open={del} onClose={deleteClose}>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this project?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={(e) => setDel(!del)}> No </Button>
              <Button
                onClick={(e) => {
                  deleteProject();
                  setDel(!del);
                }}
              >
                {" "}
                Yes{" "}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Project;
