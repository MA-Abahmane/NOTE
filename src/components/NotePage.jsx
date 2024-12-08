import axios from "axios";
import React, { useEffect, useState } from "react";


function Note(props) {
    const [users, setUsers] = useState([]);
    const [notes, setNotes] = useState([]);
    const [userLast, setLast] = useState("");
    const [userName, setUserName] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editingNote, setEditingNote] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [newContent, setNewContent] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newSharedWith, setNewSharedWith] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);


    const token = localStorage.getItem("token");


    useEffect(() => {
        fetchNotes();
        fetchUsers();
        const storedName = localStorage.getItem("first");
        const storedlast = localStorage.getItem("last");
        if (storedName && storedlast) {
            setUserName(storedName);
            setLast(storedlast);
        }

    }, []);


    const fetchUsers = async () => {
        try {
            const resp = await axios.get("https://notes.devlop.tech/api/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(resp.data);
        } catch (err) {
            console.error("Error fetching users:", err.response?.data || err.message);
            alert("Failed to fetch users. Please try again.");
        }
    };

    const fetchNotes = async () => {

        try {
            const resp = await axios.get('https://notes.devlop.tech/api/notes', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setNotes(resp.data);
        } catch (err) {
            console.error("Error fetching notes:", err.response ? err.response.data : err.message);
            alert("Failed to fetch notes. Please try again.");
        }
    };


    const addNote = async () => {
        try {
            const newNote = {
                title: newTitle,
                content: newContent,
                shared_with: newSharedWith,
            };
            const resp = await axios.post("https://notes.devlop.tech/api/notes", newNote, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setNotes([...notes, resp.data]);
            setNewTitle("");
            setNewContent("");
            setNewSharedWith([]);
            setShowAddForm(false);
        } catch (err) {
            console.error("Error adding note:", err.response?.data || err.message);
            alert("Failed to add note. Please try again.");
        }
    };

    const updateNote = async (noteId, updatedData) => {
        try {
            await axios.put(
                `https://notes.devlop.tech/api/notes/${noteId}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === noteId ? { ...note, ...updatedData } : note
                )
            );

        } catch (err) {
            console.error("Error updating note:", err.response ? err.response.data : err.message);
            alert("Failed to update the note. Please try again.");
        }
    };


    const remove = async (noteId) => {
        try {

            await axios.delete(`https://notes.devlop.tech/api/notes/${noteId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));

        } catch (err) {
            console.error("Error deleting note:", err.response ? err.response.data : err.message);
            alert("Failed to delete the note. Please try again.");
        }
    };

    
    const logout = async () => {

        try {
            const resp = await axios.post('https://notes.devlop.tech/api/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(resp.data);
            localStorage.removeItem('token'); 
            props.setisConect(false);

        }
        catch (err) {
            console.error(err.response?.data || err.message);
        }
    }

    return (
        <div className="container mt-5 ">
          {/* Background video */}
            <video autoPlay muted loop  className="background-video">
                <source src="/waterfall.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
            {/* control bar */}
            <h1 className="title poppins-regular text-center mb-4">NOTE</h1>
            <div className="control-bar">
                <h4 className="welcome poppins-regular" >Salutations, {userName} {userLast} ! </h4>
                <div className="bntContainer">
                    <button className="btn btn-danger" onClick={logout}><img width="50px" src="/off.png" /></button>
                    <button className="btn btn-success" onClick={() => setShowAddForm(!showAddForm)}>
                        <img 
                            width="40px" 
                            src="/plus.png" 
                            className={showAddForm ? "remove" : "add"}
                        />
                    </button>
                </div>
            </div>
            <br/>

            {/* Add New Note */}
            <div className="mb-3 d-flex justify-content-center" >
                <div className="d-flex gap-1">
                </div>  
                
                {showAddForm && (
                    <div className="card mt-2 p-4 shadow-sm   " style={{ width: "30rem" }}>
                        <h4 className="card-title text-white text-center mb-3 justify-content-center">New Note</h4>
                       
                        <form onSubmit={(e) => {
                                e.preventDefault();
                                addNote();
                            }}
                        >

                            <div className="mb-3">
                                <label htmlFor="newTitle" className=" text-white form-label">
                                &nbsp;Title
                                </label>
                                <input
                                    type="text"
                                    id="newTitle"
                                    className="form-control"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    placeholder="Note title.."
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="newContent" className="text-white form-label">
                                &nbsp;Content
                                </label>
                                <textarea
                                    id="newContent"
                                    className="form-control"
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                    placeholder="Note contents.."
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="newSharedWith" className="text-white form-label">
                                &nbsp;Share With
                                </label>
                                <select
                                    id="newSharedWith"
                                    className="form-select"
                                    value={newSharedWith}
                                    onChange={(e) =>
                                        setNewSharedWith(
                                            Array.from(e.target.selectedOptions, (option) => option.value)
                                        )}
                                    multiple
                                >
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.first_name} {user.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <br/>
                            <button type="submit" className="btn btn-success w-150">
                                Save
                            </button>
                        </form>
                    </div>
                )}
            </div>


            {/* Notes Table */}
            {(notes.length > 0) ? (
                <table 
                    style={showAddForm ? { display: "none" } : { display: "block" }}
                    className="table table-striped table-bordered">

                    <thead className="table-dark text-center">
                        <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Date</th>
                            <th scope="col">Title</th>
                            <th scope="col">Content</th>
                            <th scope="col">Shared with</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {notes.map((note, index) => (
                            <>
                                <tr key={index}>
                                    <th scope="row"> <h4> {index + 1} </h4></th>

                                    <td>
                                        <i 
                                            className="text-muted"> {new Date(note.date).toLocaleDateString('en-GB')}
                                        </i>
                                    </td>

                                    <td>{note.title}</td>

                                    <td> {note.content} </td>

                                    <td >
                                        {note.shared_with && note.shared_with.length > 0
                                            ? note.shared_with.map((user) => user.first_name).join(", ")
                                            : "Not shared"}
                                    </td>


                                    <td>
                                        <div className="d-flex justify-content-start gap-1">
                                            <button
                                                className="btn btn-warning mr-2"
                                                onClick={() => {
                                                    setEditingNote(note);
                                                    setEditTitle(note.title);
                                                    setEditContent(note.content);
                                                }}
                                            >
                                                <img width="20px" src="/wrench.png" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm("Are you sure you want to delete this note?")) {
                                                    remove(note.id);
                                                    }
                                                }}
                                                className="btn btn-danger"
                                                >
                                                <img width="25px" src="/trash.png" alt="Delete" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>

                                {/* Edit Note */}
                                {editingNote && editingNote.id === note.id && (
                                    <tr>
                                        <td colSpan="6">
                                            <form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    updateNote(editingNote.id, { title: editTitle, content: editContent });
                                                    setEditingNote(null);
                                                }}
                                            >
                                                <div className="mb-3">
                                                    <label htmlFor="editTitle" className="form-label">&nbsp;Title</label>
                                                    <input
                                                        type="text"
                                                        id="editTitle"
                                                        className="form-control"
                                                        value={editTitle}
                                                        onChange={(e) => setEditTitle(e.target.value)}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="editContent" className="form-label">&nbsp;Content</label>
                                                    <textarea
                                                        id="editContent"
                                                        className="form-control"
                                                        value={editContent}
                                                        onChange={(e) => setEditContent(e.target.value)}
                                                    />
                                                </div>
                                                <div className="d-flex justify-content-start gap-2">
                                                    <button type="submit" className="btn btn-success">Save</button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        onClick={() => setEditingNote(null)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </td>
                                    </tr>
                                )}
                            </>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h6 className=" text-muted bg-white text-center text-white">No Notes..</h6>
            )}

        </div>
    );
}


export default Note;
