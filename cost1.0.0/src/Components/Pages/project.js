import style from './project.module.css'
import ProjectForm from '../Project/ProjectForm'

import ServiceForm from '../Service/serviceForm'
import ServiceCard from '../Service/serviceCard'

import Loading from '../Layouts/loading'
import Msg from '../Layouts/Msg'
import Container from '../Layouts/Container'

import { json, useParams,} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { parse, v4 as uuidv4 } from 'uuid'

export default function Project (){
    const {id} = useParams()
    
    const [project, setProject]=useState([])
    const [showPF, setShowPF]=useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [services, setServices] = useState([])
    const [message, setMessage] = useState('')
    const [msgType, setMsgType] = useState('sucess')
    
    useEffect(()=>{
        setTimeout(
            ()=>{
            fetch(`http://localhost:5000/projects/${id}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            })
            .then(resp=>resp.json())
            .then((data)=>{
                setProject(data)
                setShowPF(data.services)

            })
            .catch((err)=>console.log(err)
        )},500)
   
    },[id])


//---------------------------------------------------------------------------
    function editPost(project){
        if( project.budget < project.cost){
            setMessage('the budget cannot be less than the cost of the project')
            setMsgType('error')
            return false
        }
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(project,)
        })
        .then( resp=> resp.json())
        .then((data) =>{
            setProject(data)
            setShowPF(!showPF)
            setMessage('updated')
            setMsgType('success')

        })
        .catch((err)=>console.log(err))
    }

//----------------------------------------------------------------------------------------
    function createServie (project){
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastService)

        if(newCost > parseFloat(project.budget)){
            setMessage ('Orçamento ultrapassado')
            setMsgType('err')
            project.services.pop()
            return false
        }

        project.cost= newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
          })
            .then((resp) => resp.json())
            .then((data) => {
              setServices(data.services)
              setShowServiceForm(!showServiceForm)
              setMessage('Serviço adicionado!')
              setMsgType('success')
            })
    }


//----------------------------------------------------------------------------------------
        function removeService (id, cost) {
            const serviceUpdated = project.services.filter(
                (service) => service.id !==id               
            )
            const projectUpdated = project
   
            projectUpdated.services = serviceUpdated
            projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)        
            
            fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
                method:'PATCH',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(projectUpdated)
            })
                .then((resp) => resp.json())
                .then((data)=>{
                    setProject(projectUpdated)
                    setServices(serviceUpdated)
                    setMessage('remove success')
                })
        }

//----------------------------------------------------------------------------------------
    function TPForm(){
        setShowPF(!showPF)
    }


//----------------------------------------------------------------------------------------
    function toggleServiceForm() {
        setShowServiceForm (!showServiceForm)
    }    

    return (
        <> 
            { project.name ?(
                <div className={style.det}>
                    {message && <Msg type={msgType} msg_text={message}/>}
                        <div className={style.header}>
                            <h1>{project.name}</h1>
                            <button className={style.btn} onClick={TPForm}>
                               <p> {!showPF ? 'EDIT': 'CLOSE'}</p>
                            </button>


                        </div>

                        <div className={style.line}>
                            {!showPF ? (
                                    <div className={style.form}>
                                        <p>
                                            <span>category:</span> {project.category.name}
                                        </p>
                                                                      
                                        <p>
                                            <span>total:</span> R$ {project.budget}
                                        </p>
                                                                       
                                        <p>
                                            <span>limit:</span> R$ {project.budget}
                                        </p>
                                    </div>
                                
                                ):(
                                    <div className={style.form}>
                                        <ProjectForm 
                                        handleSubmit={editPost} 
                                        btnText='conclude'
                                        projectData={project}/>
                                    </div>
                                )}
                        </div>

                    <div className={style.serv_container}>
                        <div className={style.serv_container_header}>
                            <h2>add services:</h2>
                            
                            <button className={style.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Add Service' : 'Close'}
                            </button>
                        </div>

                        <div className={style.project_info}>
                            {showServiceForm && (
                                <ServiceForm
                                    handleSubmit={createServie}
                                    btnText="conclude"
                                    projectData={project}
                                />                            
                            )}
                        </div>
                        <div>
                            <h2>SERVICES</h2>
                            <Container custonClass='start'>
                                {services.length > 0 &&
                                    services.map ((service)=>(
                                        <ServiceCard 
                                            id={service.name}
                                            name={service.cost}
                                            description={service.description}
                                            key={service.id}
                                            handleRemove={removeService}
                                        />
                                    ))}
                                    {services.lenght === 0 && <p> no services</p>}
                   
                            </Container>
                        </div>                             
                    </div>

                </div>):
            
            <Loading/>}
        
        </>
        
    )
}


