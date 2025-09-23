import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import StudentTable from './studentTable'; 
import CreateStudent from './createStudent';
import EditStudent from './editStudent';
import ViewDetails from './viewDetails';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentTable />} />
        <Route path="/student/create" element={<CreateStudent />} />
        <Route path="/student/edit/:studentid" element={<EditStudent />} />
           <Route path="/student/view/:studentid" element={<ViewDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
