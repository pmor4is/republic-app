import { React, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Header } from '../Header/Header';
import './InfrastructureForm.css';

import Select from 'react-select';

export function InfrastructureForm(props) {
    const url = "https://republic-app.vercel.app/infrastructure/";
    const [rName, setRName] = useState("");
    const [rDescription, setRDescription] = useState("");
    const [rLocal, setRLocal] = useState("");
    const [rPriority, setRPriority] = useState("");
    const [rObservations, setRObservations] = useState("");
    const [rLimitDate, setRLimitDate] = useState("");

    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("state:", state);
        if (state.id > 0) {
            console.log("veio com parametro");
            setRName(state.repairName);
            setRDescription(state.repairDescription);
            setRLocal(state.repairLocal);
            setRPriority(state.repairPriority);
            setRObservations(state.repairObservations);
            setRLimitDate(state.repairLimitDate);
        } else {
            console.log("veio sem parametro");
        }
    }, [])

    function saveData(event) {
        // event.preventDefault();
        if (rName !== "" && rDescription !== "" && rLocal !== "") {
            if (state.id > 0) {
                axios.put(url + state.id, {
                    repairName: rName,
                    repairDescription: rDescription,
                    repairLocal: rLocal,
                    repairPriority: rPriority,
                    repairObservations: rObservations,
                    repairLimitDate: rLimitDate,
                })
                    .then((response) => {
                        console.log(response);
                        navigateToInfrastructure();
                    })
            } else {
                axios.post(url, {
                    repairName: rName,
                    repairDescription: rDescription,
                    repairLocal: rLocal,
                    repairPriority: rPriority,
                    repairObservations: (rObservations ? rObservations : null),
                    repairLimitDate: (rLimitDate ? rLimitDate : null),
                })
                    .then((response) => {
                        console.log(response);
                        navigateToInfrastructure();
                    })
                    .catch((error) => console.log(error));
            }
        } else {
            console.log("Preencha os campos")
        }
    }

    function cleanData() {
        setRName("");
        setRDescription("");
        setRLocal("");
        setRPriority("");
        setRObservations("");
        setRLimitDate("");
    }

    const priorityOptions = [
        { value: 1, label: 'Leve' },
        { value: 2, label: 'Médio' },
        { value: 3, label: 'Alto' },
    ];

    function formLabel() {
        if (state.id > 0) {
            return "Editar reparo";
        } else return "Adicionar reparo";
    }

    const navigateToInfrastructure = () => {
        navigate("/infrastructure");
    };

    return (
        <div className='InfrastructureForm-body'>
            <Header />
            <div className='InfrastructureForm-content'>
                <h1>{formLabel()}</h1>
                <form className='InfrastructureForm'>
                    <input
                        type='text'
                        placeholder='Reparo'
                        value={rName}
                        onChange={(e) => { setRName(e.target.value) }}
                    />
                    <input
                        type='text'
                        placeholder='Descrição'
                        value={rDescription}
                        onChange={(e) => { setRDescription(e.target.value) }}
                    />
                    <input
                        type='text'
                        placeholder='Local'
                        value={rLocal}
                        onChange={(e) => { setRLocal(e.target.value) }}
                    />
                    {/* Dropdown button para seleção de prioridades e associar ao inteiro correspondente */}
                    <Select
                        className='Select'
                        options={priorityOptions}
                        value={priorityOptions.find(option => option.value === rPriority)}
                        onChange={(selectedOption) => setRPriority(selectedOption)}
                        placeholder='Selecione a prioridade'
                    />
                    {/* <select
                        className='CustomSelect'
                        value={rPriority}
                        onChange={(e) => setRPriority(e.target.value)}
                    >
                        <option value="" disabled>Selecione a prioridade</option>
                        {priorityOptions.map(option => (
                            <option
                                key={option.value}
                                value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select> */}
                    <input
                        type='text'
                        placeholder='Observações'
                        value={rObservations}
                        onChange={(e) => { setRObservations(e.target.value) }}
                    />
                    <input
                        type='date'
                        placeholder='Data limite'
                        value={rLimitDate}
                        onChange={(e) => { setRLimitDate(e.target.value) }}
                    />
                    <button
                        className='Button-style'
                        type='button'
                        onClick={saveData}
                    >Gravar</button>
                    <button
                        className='Button-style'
                        type='button'
                        onClick={cleanData}
                    >Limpar dados</button>
                </form>
            </div>
        </div>
    )
}
