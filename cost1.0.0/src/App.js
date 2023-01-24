import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import Home from './Components/Pages/Home'
import NewProject from './Components/Pages/NewProject'
import Company from './Components/Pages/Company'
import Contacts from './Components/Pages/Contacts'
import Project from './Components/Pages/project'
import Projects from './Components/Pages/Projects'


import Container from './Components/Layouts/Container'
import NavBar from './Components/Layouts/NavBar'
import Footer from './Components/Layouts/Footer'




export default function App() {
    return (      
      <Router>
        <NavBar/>
        <Container custonClass ="min-height" > 
          <Routes >                 
            <Route path="/" element={<Home/>} />
            <Route path="/Company" element={<Company/>} />
            <Route path="/Contact" element={<Contacts/>} />
            <Route path="/Projects" element={<Projects/>} />
            <Route path="/NewProject" element={<NewProject/>} />
            <Route path="/Project/:id" element={<Project/>} />
          </Routes>
        </Container>
        <Footer/>  
      </Router>     
    );
    }
  







