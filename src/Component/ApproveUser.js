import { useEffect, useState } from "react";
import axios from "axios";
import "./ApproveUser.css";

function ApproveUser() {
  const [user, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("https://leave-management-backend-6nqt.onrender.com/admin/allUser")
      .then((res) => {
        setUsers(res.data);
        console.log(user);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const changeStatus = (id) => {
    axios.patch("https://leave-management-backend-6nqt.onrender.com/admin/changeStatus/"+id).then(data=>{
      alert(data.data)
      window.location.reload();
    }).catch(err=>{
      console.log(err);
    })
  };
  return (
    <>
      <table  className="alluser" border={"1px solid black"} width={"100%"} cellPadding={"0"}>
        <tr>
          <th>SlNo</th>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Phone</th>
          <th>Role</th>
          <th>Max Leave</th>
          <th>Status</th>
        </tr>
        {user.map((item, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.gender}</td>
              <td>{item.phone}</td>
              <td>{item.role}</td>
              <td>{item.maxLeave}</td>
              <td>
                <button onClick={() => changeStatus(item._id)}>
                  {item.status}
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </>
  );
}
export default ApproveUser;
