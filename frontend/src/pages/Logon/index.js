/* eslint-disable jsx-a11y/alt-text */
import React, {useState} from 'react'
import logoImg from '../../assets/logo.svg'
import helpersImg from '../../assets/heroes.png'
import { FiLogIn} from 'react-icons/fi'
import { Link, useHistory }  from 'react-router-dom'

import api from '../../services/api'
import './styles.css'

export default function Logon(){

    const [id, setHelperId] = useState('');
    const history = useHistory();
    
   async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', {id});
            console.log(response.data.name);
            localStorage.setItem('helperId', id);
            localStorage.setItem('helperName', response.data.name);
            
            history.push('/profile');

        }catch(err){
            alert('Falha no login. Tente novamente.');
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Helpers logo"></img>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input placeholder="Digite seu ID de usuário"
                    value={id}
                    onChange={e => setHelperId(e.target.value)}
                    ></input>
                    <button className="button" type="submit">Entrar</button>
                    <Link to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
        <img src={helpersImg}></img>
        </div>
    );
}