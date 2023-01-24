import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loading from '../Layouts/loading'
import Msg from '../Layouts/Msg'
import Container from '../Layouts/Container'
import LinkButton from '../Layouts/LinkButton'
import CardProj from '../Project/CardProj'



import Style from './Projects.module.css'



export default function Projects (){
        const [projects, setProjects]=useState([])
        const [removeLoad, setRemoveLoad] = useState(false)
        const [projMsg, setProjMsg] = useState('')
        
        const location = useLocation()
        let message ='' 
        if (location.state){
                message = location.state.message
        }

        useEffect(() =>{
                setTimeout(()=>{
                        fetch('http://localhost:5000/projects',{
                                method:'GET',
                                headers:{
                                        'Constent-Type':'application/json',
                                },
                        })
                        .then(resp => resp.json())
                        . then(data =>{
                                setProjects(data)
                                setRemoveLoad(true)
                        })
                        .catch(
                                console.log()
                        ) 
                },1000)
   
        },[])

        function removeProj (id){
                fetch(`http://localhost:5000/projects/${id}`,{
                        method:'DELETE',
                        headers:{
                                'content-Type': 'application/json'
                        },     
                })
                .then((resp)=>resp.json())
                .then((data)=>{
                        setProjects(projects.filter((projects)=> projects.id !==id))
                        setProjMsg('success')
                })
                .catch((err)=> console.log(err))
        }
                


        return (
                <div className={Style.ContProj}>
                        <div className={Style.title}>
                                <h1>My Projects</h1>                        
                                <LinkButton to="/newproject" msg_text={message} text="New Project"/>
                        </div>
                        {message && <Msg type='success' msg_text={message}/>}
                        {projMsg && <Msg type='success' msg_text={projMsg}/>}
                <Container customClass="start">
                        {projects.length > 0 && 
                         projects.map((project)=>
                                <CardProj
                                id={project.id}
                                name={project.name}
                                budget={project.budget}
                                category={project.category.name}
                                key={project.id}
                                handleRemove={removeProj}                      
                                />)}
                        {!removeLoad && <Loading/> }
                        {!removeLoad && projects.length === 0 && <p>EMPETY</p> }
                </Container>
                </div>
               
        )
}