import style from './loading.module.css'
import load from '../../img/loading.svg'

export default function Loading (){
    return(
        <div className={style.container}>
            <img className={style.loader} src={load} alt='loading'/>
        </div>
    )
}