import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../actions/auth.actions.js';

/** 
 * @function Header
*/

const Header = (props) => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // const logout = () => {
    //     dispatch(logout())
    // }

    return (
        <header className='header'>
            <div className='left-container'>
                <div className="logo">
                    Zenly chat
                </div>
                {
                !auth.authenticated ? 
                    <ul className='leftMenu'>
                        <li><NavLink to ={'/'}>Home</NavLink></li>
                        <li><NavLink to ={'/login'}>Login</NavLink></li>
                        <li><NavLink to ={'/singup'}>Sing up</NavLink></li>
                    </ul> : null
                }
            </div>
            
            <div style={{margin: '20px 0', color: '#fff', fontWeight: 'bold'}}>
                {auth.authenticated ? `Hi ${auth.firstName} ${auth.lastName}` : ''}
            </div>

            <ul className='menu'>
                {
                    auth.authenticated ?
                    <li>
                        <Link to={'#'} onClick={() => {
                            dispatch(logout(auth.uid))
                        }}>Logout</Link>
                    </li> : null
                }
            </ul>
        </header>
    )
}

export default Header