import React, { useEffect, useState } from 'react';

export function Searchbar({ market, query, setQuery }) {
    const [filteredMarket, setFilteredMarket] = useState([]);

    useEffect(() => {
        const filteredResults = market.filter((item) => {
            return (
                item.productname.toLowerCase().includes(query.toLowerCase()) ||
                item.productdescription.toLowerCase().includes(query.toLowerCase())
            );
        });

        setFilteredMarket(filteredResults);
        console.log(filteredResults); // Adicione logs para debugar
    }, [query, market]); // Remova 'market' da dependência do useEffect

    return (
        <div>
            <input
                className='SearchBar'
                type='text'
                placeholder='Pesquisar...'
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
        </div>
    )
}
