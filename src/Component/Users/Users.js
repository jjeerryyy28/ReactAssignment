import React, { useState } from "react";
import axios from 'axios'

function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState([]);

  const getUsers = () => {
    axios.get("https://randomuser.me/api/?results=50")
    .then((res) => {
      console.log(res.data.results);
      setUsers(res.data.results);
      setFilter(res.data.results)
    }).catch((error)=>{
      alert("Error while getting data")
    })
    // fetch("https://randomuser.me/api/?results=50")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data.results);
    //     setUsers(data.results);
    //   })
    //   .catch(() => {});

  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    if (filter === "male") {
      return user.gender === "male";
    } else if (filter === "female") {
      return user.gender === "female";
    } else {
      return true;
    }
  });

  return (
    <div style={{ padding: "30px" }}>
      <h2>User Information</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo autem
        non deserunt consectetur, natus itaque maiores nobis quaerat illum
        maxime architecto officiis quos vero quam quasi libero minima possimus
        provident. Et dolore aut distinctio dolores, dolorem impedit cumque
        doloremque aspernatur!
      </p>
      <button onClick={getUsers}>Get Users</button>

      {users.length > 0 && (
        <div style={{ margin: "20px 0" }}>
          <label>
            <input
              type="radio"
              name="gender"
              value="all"
              checked={filter === "all"}
              onChange={handleFilterChange}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={filter === "male"}
              onChange={handleFilterChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={filter === "female"}
              onChange={handleFilterChange}
            />
            Female
          </label>
        </div>
      )}

      {filteredUsers.length > 0 && (
        <table width="100%" frame="box" rules="all">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody align="center">
            {filteredUsers.map((ele, index) => (
              <tr key={index}>
                <td>
                  <img src={ele.picture.medium} alt="User" width="100" height="100" />
                </td>
                <td>
                  {ele.name.first} {ele.name.last}
                </td>
                <td>{ele.gender}</td>
                <td>{ele.email}</td>
                <td>{ele.location.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;
