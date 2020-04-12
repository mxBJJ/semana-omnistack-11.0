import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'
import './styles.css'

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            phone,
            city,
            uf
        };

      try{

        const response = await api.post('/helpers', data);
        alert(`Seu ID de acesso é: ${response.data.id}`);
        history.push('/');

      }catch(err){
        alert('Erro ao cadastrar! Tente novamente.')
      }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Helpers logo"></img>
                    <h1>Cadastro</h1>
                    <p>Cadastre-se na nossa plataforma e ajude um cachorrinho a encontrar um novo lar.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"></FiArrowLeft>
                        Voltar para logon
                    </Link> 
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nome completo" value={name} onChange={e => {
                        setName(e.target.value);
                    }} ></input>
                    <input placeholder="E-mail" type="email" value={email} onChange={e => {
                        setEmail(e.target.value);
                    }}></input>
                    <input placeholder="Telefone" value={phone} onChange={e =>{
                        setPhone(e.target.value);
                    }}></input>
                    <div className="input-group">
                        <input placeholder="Cidade" value={city} onChange={e => {
                            setCity(e.target.value);
                        }}></input>
                        <input placeholder="UF" style={{ width:80}} value={uf} onChange={e => {
                            setUf(e.target.value);
                        }}></input>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}