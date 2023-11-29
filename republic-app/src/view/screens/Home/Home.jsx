import React from 'react';
import './Home.css';
import { HomepageDashboard } from '../../components/HomepageDashboard/HomepageDashboard';
import { Header } from '../../components/Header/Header';

export function Home() {
  return (
      <div className='Homepage-body'>
        {/* <Sidebar/> */}
        <Header />

        <h1>lalala</h1>
        <div className="Homepage-content">
            <h1>Olá, Pedro</h1>
            <HomepageDashboard />
        </div>
    </div>
  )
}
