import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '../../components/Button/Button';
import './InfrastructureCard.css';

export function InfrastructureCard({ item, onDelete, onEdit }) {

    // Função para formatar a data no padrão brasileiro sem horário
    function formatDate(dataString) {
        // Verifica se for cadastrada data, para poder formatar
        if (dataString) {
            const data = new Date(dataString);
            return data.toLocaleDateString('pt-BR');
        }
        // Se não existir data definida, retorna essa mensagem
        return "Sem data definida";
    }

    // Função para associar a cada int, sua prioridade específica.
    function getPriorityLabel(repairPriority) {
        if (repairPriority === 1) {
            return "Leve";
        } else if (repairPriority === 2) {
            return "Média";
        } else if (repairPriority === 3) {
            return "Alta";
        }
        return "";
    }

    return (
        <div className='InfrastructureCard'>
            <div key={item.id} className='item-container'>
                <h1>{item.repairname}</h1>
                <h2>Descrição: {item.repairdescription}</h2>
                <h3>Local: {item.repairlocal}</h3>
                <h4>Prioridade: {getPriorityLabel(item.repairpriority)}</h4>
                <h4>Observações: {item.repairobservations}</h4>
                <h4>Data limite: {formatDate(item.repairlimitdate)}</h4>
            </div>
            <div className='ProductCardButton'>
                <Button buttonTitle={"Editar"} icon={<EditIcon />} onClickHandler={onEdit} />
                <Button buttonTitle={"Deletar"} icon={<DeleteIcon />} onClickHandler={onDelete} />
            </div>
        </div>

    );
}
