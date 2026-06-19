import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAll } from "../store/action/episodeAction"

function EpisodeList() 
{
    const dispatch = useDispatch();
    const {episodes, totalPages} = useSelector(state=>state.episodes);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => 
    {
        dispatch(getAll(currentPage));
    }, [currentPage]);
    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">
                All Episodes with Pagination
            </h1>
            <table className="table table-bordered table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Species</th>
                        <th scope="col">Origin Name</th>
                        <th scope="col">Location Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        episodes.map((e, index) => (
                            <tr key={index}>
                                <th scope="row">{e.id}</th>
                                <td>{e.name}</td>
                                <td>{e.status}</td>
                                <td>{e.species}</td>
                                <td>{e.origin?.name}</td>
                                <td>{e.location?.name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <button className="page-link" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}> Previous
                        </button>
                    </li>
                    <li className="page-item disabled">
                        <span className="page-link">
                            Page {currentPage} of {totalPages}
                        </span>
                    </li>
                    <li className="page-item">
                        <button className="page-link" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>

        </div>
    )
}

export default EpisodeList;