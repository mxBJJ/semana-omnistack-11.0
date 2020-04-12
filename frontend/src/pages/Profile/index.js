import React, {  useState, useEffect} from 'react'
import './styles.css'
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiPower,FiTrash2 } from 'react-icons/fi'
import api from  '../../services/api'

export default function Profile(){

    const helperName = localStorage.getItem('helperName');
    const helperId = localStorage.getItem('helperId');
    const [incidents, setIncidents] =  useState([]);
    const history = useHistory();

    async function handleDeleteDog(id){

        try{    
            await api.delete(`dogs/${id}`, {
                headers: {
                    Authorization: helperId
                }
            });

        
            setIncidents(incidents.filter(incident => incident.id !== id));

        }catch(err){
            alert('Erro ao deletar caso! Tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }


    useEffect(() => {

        api.get('profile', {
            headers: {
                Authorization: helperId
            }
        }).then(response => {
            setIncidents(response.data);
        });

    }, [helperId]);



    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be a Helper logo"></img>
                <span>Bem-vindo, {helperName}!</span>
                <Link className="button" to="/dogs/new">Cadastrar novo caso</Link>
                <button type="button" onClick={() => handleLogout()}>
                    <FiPower size={18} color="#E02041"></FiPower>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
               {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO</strong>
                    <p>{incident.title}</p>
                     <strong>DESCRIÇÃO</strong>
                    <p>{incident.description}</p>
                     <button onClick={() => handleDeleteDog(incident.id)} type="button">
                        <FiTrash2 size={16} color="#a8a8b3"></FiTrash2>
                     </button>
                </li>
               ))}
            </ul>
        </div>
    );
}