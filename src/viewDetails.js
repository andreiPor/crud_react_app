import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewDetails() {
  const { studentid } = useParams();
  const [student, setStudent] = useState({}); 

  useEffect(() => {
    fetch(`http://localhost:8000/students/${studentid}`)
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch((err) => console.log(err.message));
  }, [studentid]);

  return (
    <div className="container">
      <h2 className="students_records">🔍Student Details</h2>
      <div>
        <p><strong>ID:</strong> {student.id}</p>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Place:</strong> {student.place}</p>
        <p><strong>Phone:</strong> {student.phone}</p>
      </div>
      <Link to="/" className="btn btn-dark text-light">← Back</Link>
    </div>
  );
}
