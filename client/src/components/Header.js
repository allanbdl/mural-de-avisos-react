import React from 'react'
import AddNotice from './AddNotice'

export default function Header(props) {
    function logout() {
        fetch('/api/logout')
        props.setIsLog(false)
        props.setAdmin(null)
        props.setNotice([])
    }

    return (
        <header>
            <div>
                <h1>Mural de Avisos</h1>
                <div className='logout' onClick={logout}>Logout</div>
            </div>
            {!props.admin ? <div/>:
            <AddNotice modal={props.modal} setModal={props.setModal} admin={props.admin} />
            }
            
        </header>
    )
}
