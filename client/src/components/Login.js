import React, { useState } from 'react'

export default function Login(props) {
    const [error, setError] = useState(false)

    async function login() {
        let name = document.querySelector('#loginName').value
        let password = document.querySelector('#loginPassword').value
        let data = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password }),
        }
        if (name && password) {
            fetch('/login', data).then(res => res.json())
                .then(data => {
                    if (data[0] === 'ok') {
                        fetch('/api/all').then(res => res.json())
                            .then(data => {
                                props.setNotice(data)
                                props.setIsLog(true)
                            })
                    }
                    else {
                        setError(false)
                        setTimeout(() => {
                            setError(true)
                            document.querySelector('#loginPassword').value = ''
                        }, 50)
                    }
                })
        } else {
            setError(false)
            setTimeout(() => {
                setError(true)
                document.querySelector('#loginPassword').value = ''
            }, 50)
        }
    }

    return (
        <div className='login'>
            <div className='loginContainer'>
                <h1>Mural de Avisos</h1>
                <div>Nome de Usuário</div>
                <div><input id='loginName' type='text' required autoComplete='off'></input></div>
                <div>Senha</div>
                <div><input id='loginPassword' type='password' required></input></div>
                <button onClick={login}>Logar</button>
            </div>
            {error ? <div className='loginError'>Error: User Name or Password are incorrect</div> : <div />}
        </div>
    )
}
