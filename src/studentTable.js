import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function StudentTable() {
  const [students, setStudents] = useState(""); 
  const navigate = useNavigate();

  const DisplayDetails = (id) => {
    navigate("/student/view/" + id);
  }

  const EditStudent = (id) => {
    navigate("/student/edit/" + id);
  }

  const DeleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      // delete student
      fetch(`http://localhost:8000/students/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Student deleted successfully");
          // Update the state to remove the deleted student from the list
          setStudents(students.filter(student => student.id !== id)); 
        })
        .catch((err) => console.log(err.message));
    }
  };

  useEffect(() => {
    fetch('http://localhost:8000/students')
      .then((res) => res.json())
      .then((data) => {
        setStudents(data); 
        console.log(data); 
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []); 

  return (
    <div className="container">
      <h2 className="students_records">📚 Students Records</h2>
      <div className="table-container">
        <Link to="/student/create" className="btn btn-success text-light">New Student</Link>
        {/* Table */}
        <table className="table table-striped table-hover table-bordered mt-3">
          <thead className="table-info">
            <tr className="w-25 text-center text-truncate">
              <th>🆔 ID</th>
              <th>🧑‍🎓 Name</th>
              <th>📍 Place</th>
              <th>📞 Phone</th>
              <th>✏️ Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              students && students.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.place}</td>
                  <td>{item.phone}</td>
                  <td className="d-flex justify-content-around">
                    <button onClick={() => DisplayDetails(item.id)} className="btn btn-info text-dark btn-sm w-25 text-truncate">
                      View
                    </button>
                    <button onClick={() => EditStudent(item.id)} className="btn btn-warning text-dark btn-sm w-25 text-truncate">Edit</button>
                    <button onClick={() => DeleteStudent(item.id)} className="btn btn-danger text-dark btn-sm w-25 text-truncate">Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
