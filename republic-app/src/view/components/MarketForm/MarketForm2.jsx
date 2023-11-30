import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import './MarketForm.css';

export function MarketForm(props) {
    const url = "https://republic-app.vercel.app/market/";

    const [pmarket, setPMarket] = useState("");
    const [pName, setPName] = useState("");
    const [pDescription, setPDescription] = useState("");
    const [pQuantity, setPQuantity] = useState("");
    const {state}  = useLocation();
    const navigate = useNavigate();

    function cleanData() {
        setPName("");
        setPDescription("");
        setPQuantity("");
    }

    useEffect(() => {
        console.log( "state:",  state);
        if (state.id > 0) {
            console.log("veio com parametro");
            setPName(state.productName);
            setPDescription(state.productDescription);
            setPQuantity(state.productQuantity);
        } else {
            console.log("veio sem parametro");
        }
        
    }, [])

    function saveData(event) {
        event.preventDefault();
        if (pName !== "" && pDescription !== "" && pQuantity !== "") {
            if (state.id > 0) {
                axios.put(url + state.id, {
                    productName: pName,
                    productDescription: pDescription,
                    productQuantity: (pQuantity ? pQuantity : null),
                })
                    .then((response) => {
                        console.log(response);
                        navigateToMarket();
                    })
            } else {
                axios.post(url, {
                    productName: pName,
                    productDescription: pDescription,
                    productQuantity: (pQuantity ? pQuantity : null),
                })
                    .then((response) => {
                        console.log(response);
                        navigateToMarket();
                    })
                    .catch((error) => console.log(error));
            }
        } else {
            console.log("Preencha os campos")
        }
    }

    const navigateToMarket = () => {
        navigate("/market");
    };

    return (
        <div>
            <div className='MarketForm-body'>
                <Link to="#" onClick={() => window.history.back()}>Voltar</Link>
                <form className='MarketForm'>
                    <input
                        type='text'
                        placeholder='Produto'
                        value={pName}
                        onChange={(e) => { setPName(e.target.value) }}
                    />
                    <input
                        type='text'
                        placeholder='Descrição'
                        value={pDescription}
                        onChange={(e) => { setPDescription(e.target.value) }}
                    />
                    <input
                        type='number'
                        placeholder='Quantidade'
                        value={pQuantity}
                        onChange={(e) => { setPQuantity(e.target.value) }}
                    />
                    <button type='button' onClick={saveData}>Gravar</button>
                    <button type='button' onClick={cleanData}>Limpar dados</button>
                </form>
            </div>
        </div>
    )
}
