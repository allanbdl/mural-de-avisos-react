import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import CentralUsers from './components/CentralUsers';
import Header from './components/Header';
import Login from './components/Login';
import NoticeReact from './components/NoticeReact';

function App() {
  const [modal, setModal] = useState(false)
  const [notice, setNotice] = useState([])
  const [isLog, setIsLog] = useState(null)
  const [admin, setAdmin] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/api/in').then(res => res.json())
      .then(data => {
        if (data[0] === 'ok') {
          setIsLog(true)
          fetch('/api/all').then(res => res.json())
            .then(data => setNotice(data))
        } else {
          setIsLog(false)
        }
      })
  })

  useEffect(() => {
    fetch('/api/admin').then(res => res.json())
      .then(data => {
        if (data[0] === 'admin') {
          setAdmin(true)
        }
        else setAdmin(false)
      })
  })

  if (isLog === null || admin === null) {
    return (
      <div>Loading</div>
    )
  } else {
    if (isLog) {
      return (

        <div className="container">
          <BrowserRouter>
            <Switch>
              <CentralUsers exact path='/users' isLog={isLog} setIsLog={setIsLog} users={users} setUsers={setUsers} />
              <Fragment>
                <Header
                  modal={modal} setModal={setModal} isLog={isLog} setIsLog={setIsLog}
                  admin={admin} setAdmin={setAdmin} notice={notice} setNotice={setNotice} />
                <NoticeReact
                  notice={notice} modal={modal} setModal={setModal} admin={admin} />
              </Fragment>

            </Switch>
          </BrowserRouter>
        </div>
      )
    } else {
      return (
        <div className="container">
          <Login isLog={isLog} setIsLog={setIsLog} notice={notice} setNotice={setNotice} />
        </div>
      )
    }
  }
}

export default App;
