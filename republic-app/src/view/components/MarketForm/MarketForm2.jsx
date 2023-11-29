import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './MarketForm.css';

export function MarketForm(props) {
    const url = "https://republic-app.vercel.app/market/";

    const [pmarket, setPMarket] = useState("");
    const [pName, setPName] = useState("");
    const [pDescription, setPDescription] = useState("");
    const [pQuantity, setPQuantity] = useState("");
    const navigate = useNavigate();
    const location  = useLocation(

    );

    function cleanData() {
        setPName("");
        setPDescription("");
        setPQuantity("");
    }

    useEffect(() => {
        console.log(Object.keys(props));
        
        // Se tiver algum registro inicial em props.route.params, então são setados os conteúdos vindos de Market para edição
        // if (props.route.params) {
        //     const { product } = props.route.params;
        //     setPName(product.productname || "");
        //     setPDescription(product.productdescription || "");
        //     setPQuantity(product.productquantity || "");
        // }
    }, [])

    function saveData(event) {
        event.preventDefault();
        if (pName !== "" && pDescription !== "" && pQuantity !== "") {
            if (props.route.params) {
                axios.put(url + props.route.params.id, {
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
        // O caminho "/adicionar-produto" é um exemplo. Substitua pelo caminho desejado.
        navigate("/market");
    };

    return (
        <div>
            <div className='MarketForm-body'>
                <form className='MarketForm'>
                    <input
                        type='text'
                        value={pName}
                        onChange={(e) => { setPName(e.target.value) }}
                    />
                    <input
                        type='text'
                        value={pDescription}
                        onChange={(e) => { setPDescription(e.target.value) }}
                    />
                    <input
                        type='number'
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
