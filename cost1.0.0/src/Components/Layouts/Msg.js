import {useState, useEffect} from 'react'

import style from './Msg.module.css'


export default function Msg ({type, msg_text}){

    const [visible, setVisible] = useState(false)

    useEffect(() => {
      if (!msg_text) {
        setVisible(false)
        return
      }
  
      setVisible(true)
  
      const timer = setTimeout(() => {
        setVisible(false)
      }, 3000)
  
      return () => clearTimeout(timer)
    }, [msg_text])
  
    return (
      <>
        {visible && (
          <div className={`${style.msg_style} ${style[type]}`}>{msg_text}</div>
        )}
      </>
    )
  }
  

