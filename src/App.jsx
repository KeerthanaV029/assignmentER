import { Link, Route, Routes } from "react-router-dom";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EpisodeList from "./components/EpisodeList";

const App = () => {
  return (
    <div className="container">
      <nav className="mb-4 d-flex justify-content-end gap-3">
        <Link to="/users" className="btn btn-primary me-2">   User List
        </Link>
        <Link to="/add-user" className="btn btn-success">
          Add User
       </Link>
        <Link to="/getEpisodes" className="btn btn-primary me-2 justify ">  View Episodes
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/getEpisodes" element={<EpisodeList />}/> 
      </Routes>
    </div>
  )
}
export default App;