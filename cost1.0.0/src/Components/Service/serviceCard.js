import style from '../Project/CardProj.module.css'

import {BsFillTrashFill} from 'react-icons/bs'

export default function ServiceCard({id, name, cost, description, handleRemove }){
    const remove = (e) =>{
        e.preventDefault()
        handleRemove(id,cost)
    }
    return(
        <div className={style.card}>
            <h4>{name}</h4>
            <p>{description}</p>
            <div  className={style.card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill/>
                    Exclude
                </button>
            </div>
        </div>
    )
}