import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Ícones utilizados
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export function MarketForm() {
    const [market, setMarket] = useState([]);
    const [id, setId] = useState("");
    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState("");


    function cleanData() {
        setId("");
        setProductName("");
        setQuantity("");
    }



  return (
    <div>
        <form>
            <input
                type='text'
                value={productName}
            />
            <input
                type='text'
                value={quantity}
            />
            <input/>
            <input/>
        </form>
    </div>
  )
}
