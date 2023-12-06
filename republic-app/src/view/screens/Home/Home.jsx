import React from 'react';
import './Home.css';
import { HomepageDashboard } from '../../components/HomepageDashboard/HomepageDashboard';
import { Header } from '../../components/Header/Header';
import { Button } from '../../components/Button/Button';

export function Home() {

  return (
    <div className='Homepage-body'>
      {/* <Sidebar/> */}
      <Header pageTitle={"Página inicial"} />

      <div className="Homepage-content">
        <div className='Homepage-welcome'>
          <h1>Olá, Pedro</h1>
          <Button
            buttonTitle={"Imprimir relatório"}
            // Passar função para imprimir relatório
            onClickHandler={() => { }}
          />
        </div>

        <div className='Homepage-resume'>
          <div className='Cash-info'>
            <div className='Cash-info-card'>
              <h1>Caixa atual</h1>
              <h1>R$ 3225.62</h1>
            </div>
          </div>

          <div className='Cash-flow-info'>
            <div className='Cash-flow-card'>
              <h1>Fluxo de caixa mensal:</h1>
              <div className='Flow-info'>
                <div className='Inflow'>
                  <h3>Entrada:</h3>
                  <h2>R$ 300.00</h2>
                </div>
                <div className='Outflow'>
                  <h3>Saída</h3>
                  <h2>R$ 200.00</h2>

                </div>
              </div>
            </div>
          </div>
        </div>

        <main className='Homepage-dashboard'>
          <h1>Variação mensal de caixa:</h1>
          <HomepageDashboard />
        </main>
      </div>
    </div>
  )
}
