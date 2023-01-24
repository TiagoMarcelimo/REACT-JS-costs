import style from './Submit.module.css'

export default function Submit ({ text}){
    return(
        <div >
            <button className={style.btn}> {text} </button>            
        </div>
    )

}
