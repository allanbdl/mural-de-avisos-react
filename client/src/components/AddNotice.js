import React from 'react'
import Modal from './Modal'

export default function AddNotice(props) {
    function modalFun(e) {
        if (props.modal) {
            if (e.target.id === 'modal') props.setModal(false)
        } else props.setModal(true)
    }
    return (
        <div>
            <button onClick={modalFun} className="addButton">+</button>
            <Modal modal={props.modal} setModal={props.setModal} modalFun={modalFun} />
        </div>
    )
}
