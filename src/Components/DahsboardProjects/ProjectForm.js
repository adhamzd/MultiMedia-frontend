import React, { useState, useEffect, useRef } from "react";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import "./ProjectForm.css";

const ProjectForm = ({ refresh, setRefresh }) => {
  const ref = useRef();

  const reset = () => {
    ref.current.value = "";
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [service, setService] = useState("");
  const [services, setServices] = useState("");
  const [image, setImage] = useState("");

  const [error, setError] = useState(false);

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
    setService(e.target.value);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const addProject = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("service", service);
    formData.append("description", description);
    formData.append("image", image);

    const requsetOptions = {
      method: "Post",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: formData,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACK_URL}projects`,
        requsetOptions
      );

      if (response.status === 201) {
        setTitle("");
        setDescription("");
        setService("");
        reset();
        setError(false);
        setRefresh(!refresh);
      } else setError(true);
    } catch (e) {
      setRefresh(!refresh);
    }
  };

  const onSubmit = (e) => {
    addProject(e);
  };

  return (
    <>
      <div className="projectForm">
        <form onSubmit={(e) => onSubmit(e)}>
          <label className="projectForm-label">
            TITLE <br />
            <input
              type="text"
              className="projectTitle"
              required
              placeholder="FOR EXAMPLE:    PROJECT 1"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              autoComplete="off"
            />
          </label>
          <br />
          <label className="projectForm-label">
            SERVICE <br />
            <br />
            <FormControl className="FormControl">
              <InputLabel style={{ color: "white" }}>
                Select A Service
              </InputLabel>
              {services && (
                <Select
                  onChange={handleServiceChange}
                  label="select a service"
                  value={service}
                  style={{
                    borderRadius: "20px",
                    border: "0.5px #111111 solid",
                    width: "100%",
                    color: "white",
                  }}
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
          </label>
          <br />
          <br />
          <br />
          <br />
          <br />
          <label className="projectForm-label">
            DESCRIPTION <br />
            <input
              type="text"
              className="projectDescription"
              required
              placeholder="ADD YOUR PROJECT DESCRIPTION"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              autoComplete="off"
            />
          </label>
          <br />
          <label className="projectForm-label">
            PROJECT IMAGE <br />
            <input
              type="file"
              className="projectImage"
              onChange={(e) => setImage(e.target.files[0])}
              ref={ref}
            />
          </label>
          <br />
          <button type="submit" className="submitProject">
            ADD
          </button>
          {error && (
            <div style={{ fontSize: "2rem" }}>Project Already Exist</div>
          )}
        </form>
      </div>
    </>
  );
};

export default ProjectForm;
