import React, { useState } from 'react'
import Layout from '../../components/Layout/layout'
import Card from '../../components/UI/Card/card'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../actions/action.js'
import { Redirect } from 'react-router-dom';

/** 
 * @function Register
*/

const Register = (props) => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth);

  const registerUser = (e) => {
    e.preventDefault()
    
    const user = {
      firstName, lastName, email, password
    }
    
    dispatch(signup(user))
  }

  if(auth.authenticated){
    return <Redirect to={`/`} />
  }

  return (
    <Layout>
        <div className='register-container'>
          <Card>
            <form onSubmit={registerUser}>
              <h3>Sign up</h3>

              <input name="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name"/>
              <input name="lastName" type="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name"/>
              <input name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
              <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>

              <div>
                <button>Sign up</button>
              </div>
            </form>
          </Card>
        </div>
    </Layout>
  )
}

export default Register