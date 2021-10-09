import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CentralUsers(props) {
    
    const [error, setError] = useState(false)
    const [error02, setError02] = useState(false)


    useEffect(() => {
        fetch('/api/alluser').then(res => res.json())
            .then(data => {props.setUsers(data)})
    })

    function verfic(name, pass, passConf){
        if(name.length > 4 && pass !== '' && pass===passConf) return true 
    }

    function deleteUser(id) {
        let confirmAc = window.confirm('Ao clicar em ok deletará o usuário')
        if (confirmAc) fetch(`/api/deleteuser/${id}`)
    }

    function newUser() {
        setError(false)
        setError02(false)
        let name = document.querySelector('#newName').value
        let password = document.querySelector('#newPassword').value
        let passwordConf = document.querySelector('#newPasswordConf').value

        let data = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password,passwordConf }),
        }
        if (verfic(name, password, passwordConf)) {
            fetch(`/api/register`, data).then(res=>res.json())
            .then(data=>{
                if (data[0]!=='ok')setError(true)
                else {
                    alert('Usuário Registrado com sucesso!')
                    setError(false)
                    setError02(false)
                }
            })
            document.querySelector('#newName').value = ''
            document.querySelector('#newPassword').value = ''
            document.querySelector('#newPasswordConf').value = ''
            setError02(false)
        }else {
            setError02(false)
            setTimeout(()=>setError02(true),50)
        }
    }

    return (
        <div className='centralUsersContainer'>
            <h1>Central de Usuários</h1>
            {props.users.map(i =>
                <div key={i._id} id={i._id} className='centralUsers'>
                    <h3>{i.name}</h3>
                    <button onClick={() => deleteUser(i._id)} id='delete'>Delete</button>
                </div>
            )}

            <div className='userRegister'>
                <h2>Novo Usuário</h2>
                <div><input autoComplete='off' id='newName' name='name' placeholder='User Name' required minLength='5' maxLength='20'></input></div>
                <div><input type='password' id='newPassword' name='password' placeholder='Password'></input></div>
                <div><input type='password' id='newPasswordConf' name='passwordConf' placeholder='Confirm the Password'></input></div>
                <button onClick={newUser}>Registrar</button>
            </div>

            {error ? <div className='loginError'>Error: User Name already exists</div> :<div/>}
            {error02 ? 
            <div className='loginError'>
                <div className=''>User name must contain at least 5 characters</div> 
                <div className=''>Password confirmation must be the same as Password</div> 
                </div>:<div/>}

            <Link className='link' to='/'>Página Inicial</Link>
        </div>
    )
}   
