import axios from "axios"
import { useState } from "react"

const AddUser = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [successMsg, setSuccessMsg] = useState()
    const [errMsg, setErrMsg] = useState()
    const [errMsgName, setErrMsgName] = useState()

    const postApi = 'https://jsonplaceholder.typicode.com/users'

    const addUser = async (e) => {
        e.preventDefault()
        let body =
        {
            'name': name,
            'email': email,
            'phone': phone,
            'company':
            {
                'name': companyName
            }

        }
        try {
            const response = await axios.post(postApi, body)
            console.log(response.data)
            setSuccessMsg("Added User")
            setName('')
            setEmail('')
            setPhone('')
            setCompanyName('')
        }
        catch (err) {
            setErrMsg("Failed to Post" + err)
            setSuccessMsg(undefined);
        }
    }

    return (
        <div className="container mt-4">
             {
                    successMsg!==undefined? <div className="alert alert-primary mb-4" >
                                        {successMsg}</div> :""
                }
                {
                    errMsg!==undefined? <div className="alert alert-primary mb-4" >
                                        {errMsg}</div> :""
                }
            <form onSubmit={(e)=>addUser(e)}>

                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Company Name</label>
                    <input type="text" className="form-control" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">
                    Add User
                </button>
            </form>
        </div>
    )

}
export default AddUser;