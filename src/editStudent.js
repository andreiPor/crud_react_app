import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditStudent() {
  const { studentid } = useParams(); 
  const [student, setStudent] = useState({
    id: "",
    name: "",
    place: "",
    phone: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:8000/students/${studentid}`)
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch((err) => console.log(err.message));
  }, [studentid]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!student.name || !student.place || !student.phone) {
      return;
    }
    fetch(`http://localhost:8000/students/${studentid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Student details updated successfully");
        navigate("/"); 
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="container">
      <h2 className="students_records">📝 Edit Student</h2>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        <div className="mb-3">
          <label htmlFor="id" className="form-label">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            className="form-control"
            value={student.id}
            disabled
          />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={student.name}
            onChange={(e) => setStudent({ ...student, name: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="place" className="form-label">Place:</label>
          <input
            type="text"
            id="place"
            name="place"
            className="form-control"
            value={student.place}
            onChange={(e) => setStudent({ ...student, place: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="form-control"
            value={student.phone}
            onChange={(e) => setStudent({ ...student, phone: e.target.value })}
            required
            maxLength={9}
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" onClick={() => navigate("/")} className="btn btn-dark">← Back</button>
          <button type="submit" className="btn btn-warning">🔄Update</button>
          
        </div>
      </form>
    </div>
  );
}
