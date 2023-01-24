import style from './Input.module.css'

export default function Input ({type, text, name, placeholder, handleOnChange, value}){
    return(
        <div className={style.form_control}>
            <label htmlFor={name}> {text}:</label>
            <input 
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                valu={value}
            />
        </div>
    )

}
