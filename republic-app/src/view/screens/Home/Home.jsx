import React from 'react';
import Sidebar  from "../../../components/Sidebar/Sidebar";
import HomepageDashboard from '../../../components/HomepageDashboard/HomepageDashboard';

export function Home() {
  return (
      <div className='Homepage-body'>
        <Sidebar/>
        <div className="Homepage-content">
            <HomepageDashboard/>
        </div>
    </div>
  )
}
