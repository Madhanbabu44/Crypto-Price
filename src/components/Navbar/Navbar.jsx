import React, { useContext } from 'react'
import './Navbar.css'
import { Coincontext } from '../../context/Coincontext'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const {setcurrency}=useContext(Coincontext)
  const currencyHandle=(event)=>{
    switch(event.target.value){
      case "usd":{
        setcurrency({name:"usd",symbol:"$"});
        break;
      }
      case "eur":{
        setcurrency({name:"eur",symbol:"€"});
        break;
      }
      case "inr":{
        setcurrency({name:"inr",symbol:"₹"});
        break;
      }
      default:{
        setcurrency({name:"usd",symbol:"$"});
        break;
      }
    }
  }
  return (
    <div className='navbar'>
        <ul>
            <Link to={'/'}><li>Home</li></Link>
            <li>Features</li>
            <li>Pricing</li>
            <li>Blog</li>
        </ul>
        <div className="nav-right">
            <select onChange={currencyHandle}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="inr">INR</option>
            </select>
            <button>Sign Up</button>
        </div>
    </div>
  )
}

export default Navbar