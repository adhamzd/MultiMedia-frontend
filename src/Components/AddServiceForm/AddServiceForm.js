import React, { useState, useRef } from "react";

import "./AddServiceForm.css";

function AddServiceForm({ refresh, setRefresh }) {
  const ref = useRef();

  const reset = () => {
    ref.current.value = "";
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [error, setError] = useState(false);
  const [postError, setPostError] = useState(false);

  const addService = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    const requestOptions = {
      method: "Post",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: formData,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACK_URL}service`,
        requestOptions
      );
      if (response.status === 201) {
        setName("");
        setDescription("");
        reset();
        setError(false);
        setRefresh(!refresh);
      } else {
        setError(true);
      }
    } catch (err) {
      setPostError(true);
    }
  };

  return (
    <div className="service-dashboard-form">
      <form onSubmit={(e) => addService(e)} className="about-dashboard-form">
        <label className="dashboard-service-label">
          <h3> NAME: </h3>
          <input
            type="text"
            className="service-dashboard-input"
            placeholder="Project Name"
            onChange={(e) => setName(e.target.value)}
            required
            value={name}
          ></input>
        </label>
        <label className="dashboard-service-label">
          <h3> DESCRIPTION: </h3>
          <textarea
            className="service-dashboard-textarea"
            placeholder="Project Description"
            onChange={(e) => setDescription(e.target.value)}
            required
            value={description}
          ></textarea>
        </label>
        <label className="dashboard-service-label">
          <h3>ICON:</h3>
          <input
            type="file"
            ref={ref}
            onChange={(e) => setImage(e.target.files[0])}
            className="service-dashboard-image-input"
            required
          ></input>
        </label>
        <button type="submit" className="service-dashboard-button">
          ADD
        </button>
        {error && <div style={{ fontSize: "2rem" }}>Service Already Exist</div>}
        {postError && (
          <div style={{ fontSize: "2rem" }}>
            Failed to add Service. Try Again Later.
          </div>
        )}
      </form>
    </div>
  );
}

export default AddServiceForm;
