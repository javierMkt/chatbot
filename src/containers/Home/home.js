import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/layout.js'
import { useDispatch, useSelector } from 'react-redux'
import { getRealtimeUsers, updateMessage, getRealtimeConversations, isLoggedInUser } from '../../actions/action.js';

const User = (props) => {
  const {user, onClick} = props;

  return (
    <div onClick={() => onClick(user)} key={user.uid} className="displayName">
        <div className="displayPic">
          <img src="https://st2.depositphotos.com/1009634/7235/v/950/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg" alt="" />
        </div>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', margin: '0 10px'}}>
          <span style={{fontWeight: 500}}>{user.firstName} {user.lastName}</span>
          <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`}></span>
        </div>
    </div>
  )
}

const Home = (props) => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const user = useSelector(state => state.user)
  const [chatStarted, setChatStarted] = useState(false)
  const [chatUser, setChatUser] = useState('')
  const [message, setMessage] = useState('')
  const [userUid, setUserUid] = useState(null)
  let unsubscribe

  useEffect(() => {
    if(!auth.authenticated){
      dispatch(isLoggedInUser())
    }
  }, []);

  useEffect(() => {
    unsubscribe = dispatch(getRealtimeUsers(auth.uid))
    .then(unsubscribe => {
      return unsubscribe
    })
    .catch(error => {
      console.log(error)
    })
  }, [])
  
  useEffect(() => {
    return () => {
      unsubscribe.then(f => f()).catch(error => console.log(error))
    }
  }, [])

  const initChat = (user) => {
    setChatStarted(true)
    setChatUser(`${user.firstName} ${user.lastName}`)
    setUserUid(user.uid)
    
    dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }))
  }

  const submitMessage = (e) => {
    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message
    }
    if(message !== ""){
      dispatch(updateMessage(msgObj))
      .then(() => {
        setMessage('')
      })
    }
  }
  return (
    <Layout>
      <section className="container">
        <div className="listOfUsers">
          {
            user.users.length > 0 ?
            user.users.map(user => {
              return (
                <User 
                  onClick={initChat}
                  key={user.uid} 
                  user={user} 
                />
              )
            }) : null
          }
        </div>

        <div className="chatArea">            
            <div className="chatHeader"> 
            {
              chatStarted ? chatUser : ''
            }
            </div>
            <div className="messageSections">
                {
                  chatStarted ? 
                  user.conversations.map(con =>
                    <div style={{ textAlign: con.user_uid_1 == auth.uid ? 'right' : 'left' }}>
                      <p className="messageStyle" >{con.message}</p>
                    </div> 
                  ) : null
                }
            </div>
            {
              chatStarted ? 
              <div className="chatControls">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write Message"
                />
                <button className="btnSend" onClick={submitMessage}>
                  <label className="txtSend">Send</label>
                </button>
              </div> : null
            }            
        </div>
    </section>
  </Layout>
  );
}

export default Home