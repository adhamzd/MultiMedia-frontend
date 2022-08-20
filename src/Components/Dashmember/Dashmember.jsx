import "./Dashmember.css"
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TiEdit, TiDelete } from "react-icons/ti";

export default function Dashmember({ name, image, id, description, refresh, setRefresh }) {

    const [edit, setEdit] = useState(false);
    const [del, setDel] = useState(false);

    const [newName, setNewName] = useState(name);
    const [newDescription, setDescription] = useState(description);
    const [profileImage, setProfileImage] = useState('');

    const editMember = async () => {
        const formData = new FormData();

        formData.append("name", newName);
        formData.append("description", newDescription);
        formData.append("image", profileImage);

        const requsetOptions = {
            method: "Put",
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
            body: formData,
        };
        try {
        await fetch(`${process.env.REACT_APP_BACK_URL}member/${id}`, requsetOptions);
        setRefresh(!refresh);
    }catch(e){setRefresh(!refresh);}
    };

    const deleteMember = async () => {
        let requsetOptions = {
            method: "Delete",
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        };
        try {
        await fetch(`${process.env.REACT_APP_BACK_URL}member/${id}`, requsetOptions);
        setRefresh(!refresh);} catch (e){setRefresh(!refresh);}
    };


    return (
        <div className="member-card" >
                <div className='current-member-container' style={{ backgroundImage: `url(${image})` }} >
                </div>
                <p className='member-name' >{name}</p>
                <div className="edit-delete-container" >
                    <TiEdit className="member-edit-icon" onClick={(e) => setEdit(!edit)} />
                    <TiDelete
                        className="member-delete-icon"
                        onClick={(e) => setDel(!del)}
                    /></div>
                <div>
                    <Dialog open={edit} onClose={(e) => setEdit(!edit)}>
                        <DialogTitle>Edit Member</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Member Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                defaultValue={newName}
                                autoComplete="off"
                                onChange={(e) => setNewName(e.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="description"
                                label="Member Description"
                                type="text"
                                fullWidth
                                variant="standard"
                                defaultValue={description}
                                autoComplete="off"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <TextField
                                className="edit-img-field"
                                autoFocus
                                margin="dense"
                                id="profileImage"
                                label="Member Profile Image"
                                type="file"
                                fullWidth
                                variant="standard"
                                onChange={(e) => setProfileImage(e.target.files[0])}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => setEdit(!edit)}>Cancel</Button>
                            <Button
                                onClick={(e) => {
                                    editMember();
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
                        <DialogTitle>Delete Member</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete this member?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => setDel(!del)}>No</Button>
                            <Button
                                onClick={(e) => {
                                    deleteMember();
                                    setDel(!del);
                                }}
                            >
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
    )
}
