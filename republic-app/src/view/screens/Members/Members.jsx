import React from "react";
import { Header } from '../../components/Header/Header';
import './Members.css';

export function Members() {
  return (
    <div className="Members-body">
      <Header pageTitle={"Membros"}/>
      <div>
        <h1>Members</h1>
      </div>
    </div>
  );
}
