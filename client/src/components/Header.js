import React from 'react'
import AddNotice from './AddNotice'

export default function Header(props) {
    let lockModeLog = false
    function logout() {
        if (!lockModeLog) {
            lockModeLog = true
            fetch('/api/logout').then(() => {props.setIsLog(false)})}
        else return
    }

    return (
        <header>
            <div>
                <h1>Mural de Avisos</h1>
                <div className='logout' onClick={logout}>Logout</div>
            </div>
            {!props.admin ? <div /> :
                <AddNotice modal={props.modal} setModal={props.setModal} admin={props.admin} />
            }

        </header>
    )
}
