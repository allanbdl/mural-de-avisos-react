import React from 'react'
import { Link } from 'react-router-dom'

export default function Notice(props) {
    function editNotice(id) {
        let div = document.getElementById(id)
        let edit = div.querySelector('input').disabled
        div.querySelector('input').disabled = !edit
        div.querySelector('textarea').disabled = !edit
        document.querySelector('#edit').innerHTML = 'Save'
        if (!edit) updateNotice(div)
    }

    function updateNotice(div) {
        let id = div.id
        let title = div.querySelector('input').value
        let desc = div.querySelector('textarea').value
        let data = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, desc }),
        }
        if (title && desc) {
            fetch(`/api/edit/${id}`, data)
            document.querySelector('#edit').innerHTML = 'Edit'

        }
        else editNotice(id)
    }

    function deleteNotice(id) {
        let confirmAc = window.confirm('Ao clicar em ok deletará o o aviso')
        if (confirmAc) fetch(`/api/delete/${id}`)
    }

    return (
        <div>
            {
            props.notice.map(i =>

                    <div key={i._id || Math.random()} id={i._id} className='card'>
                        <div><input name='title' className='title' defaultValue={i.title} disabled ></input></div>
                        <div><textarea name='desc' className='desc' rows='4' defaultValue={i.desc} disabled ></textarea></div>

                        {!props.admin ? <div /> :
                            <div>
                                <button onClick={() => editNotice(i._id)} id='edit'>Edit</button>
                                <button onClick={() => deleteNotice(i._id)} id='delete'>Delete</button>
                            </div>
                        }
                    </div>
                )}

            {!props.admin ? <div /> :
                <Link className='link' to='/users'>Central de Usuários</Link>
            }
        </div>
    )
}
