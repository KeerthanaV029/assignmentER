import axios from "axios";
import { useEffect, useState } from "react";

const UserList = () => {

    const [deleteMsg, setDeleteMsg] = useState()
    const [users, setUsers] = useState([])
    const api = 'https://jsonplaceholder.typicode.com/users'
    const deleteApi='https://jsonplaceholder.typicode.com/users/'
    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await axios.get(api)
                console.log(response.data)
                setUsers(response.data)
            }
            catch (err) { }
        }
        getAllUsers()
    }, [])
    const onDelete = async(id) => 
    {
        try{
            await axios.delete(deleteApi+id)
            let tempArray = [...users].filter(u => u.id !== id)
            setUsers([...tempArray])
            setDeleteMsg("User deleted from the system.")
        }
        catch(err)
        {
            console.log(err);
        }

    }
    return (
        <div className="container">
            {
                deleteMsg !== undefined ?
                    <div className="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="d-flex">
                            <div className="toast-body">
                                 {deleteMsg}
                            </div>
                            <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                    </div> : ""
            }
            <table className ="table table-striped-columns">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((u, index) => (
                            <tr scope="row" key={index}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.phone}</td>
                                <td>{u.company?.name}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm me-2" onClick={() => onDelete(u.id)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>

                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}
export default UserList;