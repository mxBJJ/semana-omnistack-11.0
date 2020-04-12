import React, { useState } from 'react';
import logoImg from '../../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'
import { Link , useHistory} from 'react-router-dom'


import './styles.css';
import api from '../../services/api';

export default function NewIncident(){


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const helperId = localStorage.getItem('helperId');
    const history = useHistory();

    async function handleIncident(e){
        e.preventDefault();

        const data = {
            title,
            description
        };

        console.log(data);
        try{

            await api.post('/dogs', data, {
                headers: {
                    Authorization: helperId
                }
            });

            history.push('/profile');

        }catch(err){
            alert('Erro ao cadastrar novo caso!');
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Helpers logo"></img>
                    <h1>Cadastro de caso</h1>
                    <p>Cadastre um novo caso de animalzinho perdinho para que consiga alguém que possa ajudar.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"></FiArrowLeft>
                        Voltar para perfil
                    </Link> 
                </section>
                <form onSubmit={handleIncident}>
                    <input placeholder="Título"
                    value={title} onChange={e => setTitle(e.target.value)}
                    ></input>
                    <textarea placeholder="Descrição" type="email"
                    value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    <button className="button">Cadastrar novo caso</button>
                </form>
            </div>
        </div>
    );

}