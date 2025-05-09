import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome/Welcome';
import UserDashboard from './components/UserDashboard/UserDashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route
          path="/userdashboard"
          element={
            <ProtectedRoute
              element={<UserDashboard />}
              allowedRole="user"
            />
          }
        />

        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute
              element={<AdminDashboard />}
              allowedRole="admin"
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;



// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Welcome from './components/Welcome/Welcome';
// import UserDashboard from './components/UserDashboard/UserDashboard';
// import AdminDashboard from './components/AdminDashboard/AdminDashboard';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Welcome />} />
//         <Route path="/userdashboard" element={<UserDashboard />} />
//         <Route path="/admindashboard" element={<AdminDashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
