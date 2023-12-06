import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '../../components/Button/Button';
import './ProductCard.css';

export function ProductCard({ item, onDelete, onEdit }) {
  return (
    <div className='ProductCard'>
      <div className='ProductInformation'>
        <div>
          <h1>{item.productname}</h1>
          <h2>{item.productdescription}</h2>
        </div>
        <div>
          <h3>Quantidade máxima</h3>
          <h3>Quantidade atual: {item.productquantity}</h3>
        </div>
      </div>
      <div className='ProductCardButton'>
        <Button buttonTitle={"Editar"} icon={<EditIcon />} onClickHandler={onEdit} />
        <Button buttonTitle={"Deletar"} icon={<DeleteIcon />} onClickHandler={onDelete} />
      </div>
    </div>
  );
}
