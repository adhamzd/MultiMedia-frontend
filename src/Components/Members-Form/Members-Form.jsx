import React, { useState,useRef } from 'react'
import "./Members-Form.css"

export default function MembersForm({refresh,setRefresh}) {
    const ref = useRef();

    const reset = () => {
      ref.current.value = "";
    };

    const [name, setName] = useState("");
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("");

    const [error,setError] = useState(false);

    const addmember = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description)
        formData.append("image", image);

        const requsetOptions = {
            method: "Post",
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            body: formData,
        };
        try {
        const response = await fetch(`${process.env.REACT_APP_BACK_URL}member`, requsetOptions);

        if (response.status===201) {
        setName("");
        setDescription("");
        reset();
        setError(false)
        setRefresh(!refresh);
    } else  setError(true);} catch (e) {setRefresh(!refresh)}
    }

    const onSubmit = (e) => {
        addmember(e);
    };


    return (
        <form onSubmit={(e) => onSubmit(e)} className='adding-members-form' >
            <label className='label addMember' htmlFor="Name">
                <span>NAME</span>
                <input id='Name' value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='For Example:  Sam Smith' required autoComplete='off'/>
            </label>
            <label className='label addMember' htmlFor="description"> <span>DESCRIPTION</span>
                <input id='description' value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder='For Example: Digital Marketer' autoComplete='off'/>
            </label>
            <label className='label addMember' htmlFor="profileImg"> <span>PROFILE IMAGE</span>
                <input id='profileImg' onChange={(e) => setImage(e.target.files[0])} type="file" ref={ref} />
            </label>
            <button id='members-form-button' type="submit" >ADD</button>
            {error && <div style={{fontSize:"1.6rem"}}>Member Already Exist</div> }
        </form>

    )
}

