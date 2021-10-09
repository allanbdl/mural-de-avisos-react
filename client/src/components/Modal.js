import React from 'react'

export default function Modal(props) {
    function newNotice() {
        let title = document.querySelector('#titleModal').value
        let desc = document.querySelector('#descModal').value
        let data = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, desc }),
        }
        if (title && desc) {
            fetch(`/api/new`, data)
            document.querySelector('#titleModal').value = ''
            document.querySelector('#descModal').value = ''
            props.setModal(false)
        }
    }

    return (
        <div onClick={props.modalFun} id='modal' className={props.modal ? 'modal' : 'modal hide'}>
            <div className='modalContainer'>
                <h2>Novo Aviso</h2>
                <input autoComplete='off' id='titleModal' name='title' placeholder='Título'></input>
                <textarea name='desc' id='descModal' placeholder='Descrição....' rows='10'></textarea>
                <button onClick={newNotice}>Salvar</button>
            </div>
        </div>
    )
}
