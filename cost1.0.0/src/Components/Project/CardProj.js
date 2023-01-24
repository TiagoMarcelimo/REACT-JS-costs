import style from './CardProj.module.css'
import {Link} from 'react-router-dom'
import {BsPencil, BsFillTrashFill} from  'react-icons/bs'

export default function CardProj ({id, name, budget, category, handleRemove,}){
    const remove = (e)  =>{
        e.preventDefault()
        handleRemove(id)
    }
    
    return(
        <div className={style.card}>
            <h4> {name} </h4>

            <p>
                <span> Orçamento :</span> R$ {budget}
            </p>

            <div className={style.category_text}>
                <span> Cateroria:  </span>
                <p></p>
                <span>{category}</span>
            </div>
             

            <div className={style.card_actions}>
                <Link to={`/project/${id}`}>
                    <BsPencil/>EDITAR
                </Link>

                <Link onClick={remove}>
                    <BsFillTrashFill/>EXCLUIR
                </Link>
            </div>

        </div>
    )
}