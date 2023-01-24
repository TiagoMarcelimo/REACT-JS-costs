import { useState } from 'react'

import Input from '../Form/Input'
import Submit from '../Form/Submit'

import styles from '../Project/CardProj.module.css'

function ServiceForm({ handleSubmit, btnText, projectData }) {
  const [service, setService] = useState({})

  const submit = (e) => {
    e.preventDefault()
    projectData.services.push(service)
    handleSubmit(projectData)
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="name"
        name="name"
        placeholder="insert a name"
        handleOnChange={handleChange}
      />
      <Input
        type="number"
        text="cost"
        name="cost"
        placeholder="inser a value"
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="project description"
        name="description"
        placeholder="describe the service"
        handleOnChange={handleChange}
      />
      <Submit text={btnText} />
    </form>
  )
}

export default ServiceForm
