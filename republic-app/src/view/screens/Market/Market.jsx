import React, { useEffect, useState } from 'react';
import './Market.css';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { Searchbar } from '../../components/SearchBar/Searchbar';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/Button/Button';
import { ProductCard } from '../../components/ProductCard/ProductCard';

export function Market() {
  const [market, setMarket] = useState([]);
  const [id, setId] = useState([]);
  const [productName, setPName] = useState("");
  const [productDescription, setPDescription] = useState("");
  const [productQuantity, setPQuantity] = useState("");
  const [query, setQuery] = useState("");
  const [filteredMarket, setFilteredMarket] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Conexão com o backend criado na pasta node-server
  // URL cadastrada na Vercel
  const url = "https://republic-app.vercel.app/market/";

  // Método GET
  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setMarket(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error))
  }, [url]);

  // Método para filtrar o objeto para a barra de busca
  function handleSearch(query) {
    const filteredResults = market.filter((item) => {
      return (
        item.productname.toLowerCase().includes(query.toLowerCase()) ||
        item.productdescription.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredMarket(filteredResults);
  }

  // Método DELETE
  function deleteData(idToDelete) {
    axios.delete(url + idToDelete)
      .then(() => setMarket(market.filter((item) => item.id !== idToDelete)))
      .catch((error) => console.log(error));
  }

  // Função para navegar para outra página ao clicar no botão
  function navigateToForm(id, productName, productDescription, productQuantity) {
    navigate("/marketform", {
      state: {
        id: id,
        productName: productName,
        productDescription: productDescription,
        productQuantity: productQuantity,
      }
    });
  };

  return (
    <div className='Market-body'>
      <Header pageTitle={"Mercado"} />
      <div className='Inputs'>
        <div className='SearchInput'>
          <Searchbar
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
          />
        </div>
        <div className='ProductInput'>
          <Button
            buttonTitle={"Adicionar novo produto"}
            // Passar função para imprimir relatório
            onClickHandler={() => navigateToForm(0, "", "", "")}
          />

        </div>
      </div>
      {isLoading ?
        <CircularProgress className='circularProgress' color="inherit" />
        : (
          <div className='Market-content'>
            <div className='Market-toShopping'>
              {/* Produtos com a quantidade igual a zero */}
              <h1>Lista de compras</h1>
              {filteredMarket.length > 0 ? (
                filteredMarket.filter((item) => item.productquantity === 0).map((item) => {
                  return (
                    <ProductCard
                      key={item.id}
                      item={item}
                      onDelete={() => deleteData(item.id)}
                      onEdit={() => navigateToForm(item.id, item.productname, item.productdescription, item.productquantity)}
                    />
                  );
                })
              ) : (
                market
                  .filter((item) => item.productquantity === 0)
                  .map((item) => {
                    return (
                      <ProductCard
                        key={item.id}
                        item={item}
                        onDelete={() => deleteData(item.id)}
                        onEdit={() => navigateToForm(item.id, item.productname, item.productdescription, item.productquantity)}
                      />
                    );
                  })
              )}
            </div>

            {/* Produtos com a quantidade maior que zero */}
            <div className='Market-inventory'>
              <h1>Inventário</h1>
              <div>
                <div>
                  {/* Mapeamento da lista de produtos, transformando em cards */}
                  {filteredMarket.length > 0 ? (
                    filteredMarket.filter((item) => item.productquantity > 0).map((item) => {
                      return (
                        <ProductCard
                          key={item.id}
                          item={item}
                          onDelete={() => deleteData(item.id)}
                          onEdit={() => navigateToForm(item.id, item.productname, item.productdescription, item.productquantity)}
                        />
                      );
                    })
                  ) : (
                    market
                      .filter((item) => item.productquantity === 0)
                      .map((item) => {
                        return (
                          <ProductCard
                            key={item.id}
                            item={item}
                            onDelete={() => deleteData(item.id)}
                            onEdit={() => navigateToForm(item.id, item.productname, item.productdescription, item.productquantity)}
                          />
                        );
                      })
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
