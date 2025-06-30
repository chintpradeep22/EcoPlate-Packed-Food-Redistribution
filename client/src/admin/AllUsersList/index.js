import React, { useEffect, useState, useContext } from "react";
import "./Users.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token, admin, url } = useContext(StoreContext);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${url}/admin/users`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            if (data.success) {
                setUsers(data.usersData || []);
            } else {
                toast.error(data.message || "Failed to fetch users.");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Server error while fetching users.");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (!admin || !token) {
            toast.error("Please login as Admin first!");
            navigate("/");
        }
    }, [token, admin, navigate]);

    useEffect(() => {

        if (admin && token) {
            fetchUsers();
        }
    }, [url, token, admin]);

    const onClickDeleteUser = async (userId) => {
        try {
            const response = await fetch(`${url}/admin/users/delete/${userId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                fetchUsers()
            } else {
                toast.error(data.message || "Failed to delete user.");
            }
        } catch (error) {
            console.error("Error Deleting users:", error);
            toast.error("Server error while deleting users.");
        }
    }

    return (
        <div className="users-container">
            <h2>All Registered Users</h2>
            <div className="users-table-wrapper">
                {loading ? (
                    <div className="loading-spinner">
                        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                    </div>
                ) : (
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length !== 0 ? (
                                <>
                                    {users.map((user, i) => (
                                        <tr key={user.userId}>
                                            <td>{i + 1}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td><MdDelete onClick={() => onClickDeleteUser(user.userId)} /></td>
                                        </tr>

                                    ))}
                                </>
                            ) : <p className="admin-list-users">No users Found</p>}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Users;
