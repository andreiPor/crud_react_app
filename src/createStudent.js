import { useState } from "react"; 
import { Link, useNavigate } from "react-router-dom"; 

export default function CreateStudent() { 
  const [id, setId] = useState(""); 
  const [name, setName] = useState(""); 
  const [place, setPlace] = useState(""); 
  const [phone, setPhone] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id || !name || !place || !phone) {
      return;
    }
    const studentData = { 
      id: String(id), 
      name, 
      place, 
      phone 
    };

    fetch("http://localhost:8000/students", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(studentData)
    })
    .then((res) => res.json())  
    .then((data) => {
      alert("Student Data saved successfully");
      navigate("/");
      setId("");
      setName("");
      setPlace("");
      setPhone("");
    })  
    .catch((err) => console.log(err.message)); 
  };

  return ( 
    <div className="container mt-5"> 
      <h2 className="students_records">➕ Add New Student</h2> 
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        <div className="mb-3"> 
          <label htmlFor="id" className="form-label">ID:</label> 
          <input 
            type="text" 
            id="id" 
            name="id" 
            className="form-control" 
            value={id} 
            onChange={e => setId(e.target.value)} 
             required
          /> 
        </div> 

        <div className="mb-3"> 
          <label htmlFor="name" className="form-label">Name:</label> 
          <input 
            type="text" 
            id="name" 
            name="name" 
            className="form-control" 
            value={name} 
            onChange={e => setName(e.target.value)} 
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
            value={place} 
            onChange={e => setPlace(e.target.value)} 
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
             maxLength={9} 
            value={phone} 
            onChange={e => setPhone(e.target.value)} 
             required
          /> 
        </div> 
        <div className="d-flex justify-content-between"> 
          <Link to="/" className="btn btn-dark">← Back</Link> 
          <button type="submit" className="btn btn-success">💾 Save</button> 
        </div> 
      </form> 
    </div> 
  ); 
}
