import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MarketForm.css';


export function MarketForm() {
    // Controladores da API
    const [market, setMarket] = useState([]);
    const [id, setId] = useState("");
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productQuantity, setProductQuantity] = useState("");

    // Controlador da opção de cadastrar ou adicionar
    const [operation, setOperation] = useState("");
    


    // Conexão com o backend criado na pasta node-server
    // URL cadastrada na Vercel
    const url = "https://republic-app.vercel.app/market/";

    useEffect(() => {
        fetch(url)
            .then((fetchResponse) => fetchResponse.json())
            .then((jsonResponse) => setMarket(jsonResponse))
            .catch((error) => console.log(error))
    }, [url]);

    function cleanData() {
        setId("");
        setProductName("");
        setProductDescription("");
        setProductQuantity("");
    }

    function newData() {
        setOperation("createRegister");
    }

    function editMarket(idToEdit) {
        let productToEdit = market.find((item) => item.id === idToEdit);
        const { id, productName, productDescription, productQuantity } = productToEdit;
        setOperation("editRegister");
        setId(id);
        setProductName(productName);
        setProductDescription(productDescription);
        setProductQuantity(productQuantity);
    }

    function updateListWithEditProduct(response) {
        if (response.status == 202) {
            console.log(response);
            let { identifier } = response.data;
            const index = market.findIndex((item) => item.id == identifier);
            let products = market;
            products[index].productName = productName;
            products[index].productDescription = productDescription;
            products[index].productQuantity = productQuantity;
            setMarket(products);
            cleanData("");
        } else {
            console.log("Problema com edição: ", response.status);
        }
    }

    function updateListWithNewProduct(response) {
        console.log(response);
        let { id, productName, productDescription, productQuantity } = response.data;
        let object = {
            "id": id,
            "productName": productName,
            "productDescription": productDescription,
            "productQuantity": productQuantity,
        }
        let products = market;
        products.push(object);
        setMarket(products);
        cleanData("");
    }

    function deleteData(idToDelete) {
        axios.delete(url + idToDelete)
            .then(() => setMarket(market.filter((item) => item.id !== idToDelete)))
            .catch((error) => console.log(error));
    }

    function saveData() {
        if (productName !== "" && productDescription !== "" && productQuantity !== "") {
            if (operation === "createRegister") {
                axios.post(url, {
                    productName: productName,
                    productDescription: productDescription,
                    productQuantity: (productQuantity ? productQuantity : null),
                })
                    .then((response) => updateListWithNewProduct(response))
                    .catch((error) => console.log(error));
            } else if (operation == "editRegister") {
                axios.put(url + id, {
                    id: id,
                    productName: productName,
                    productDescription: productDescription,
                    productQuantity: (productQuantity ? productQuantity : null),
                })
                    .then((response) => updateListWithEditProduct(response))
                    .catch((error) => console.log(error));
            }
        } else {
            console.log("Preencha os campos")
        }
    }



    return (
        <div>
            <div className='MarketForm-body'>
                <form className='MarketForm'>
                    <input
                        type='text'
                        value={productName}
                        onChange={(e) => { setProductName(e.target.value) }}
                    />
                    <input
                        type='text'
                        value={productDescription}
                        onChange={(e) => { setProductDescription(e.target.value) }}
                    />
                    <input
                        type='number'
                        value={productQuantity}
                        onChange={(e) => { setProductQuantity(e.target.value) }}
                    />
                    <button type='button' onClick={saveData}>Gravar</button>
                    <button type='button' onClick={cleanData}>Limpar dados</button>
                </form>
            </div>
        </div>
    )
}
