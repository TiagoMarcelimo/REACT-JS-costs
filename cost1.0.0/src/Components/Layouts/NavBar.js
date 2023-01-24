import { Link } from "react-router-dom"
import Container from "./Container"
import Styles from './NavBar.module.css'
import Logo from '../../img/costs_logo.png'

export default function NavBar (){
    return(
    <nav className={Styles.navbar}>
        <Container>
            <Link to="/"> <img src={Logo} alt="logo"/> </Link>
            <ul className={Styles.list}>
                <li className={Styles.item}> <Link to="/">Home</Link> </li>
                <li className={Styles.item}> <Link to="/Projects">Projects</Link> </li>
                <li className={Styles.item}> <Link to="/Contact">Contact</Link></li>
                <li className={Styles.item}> <Link to="/Company">Company</Link> </li>             
            </ul>      
        </Container>
    </nav>
    )
}