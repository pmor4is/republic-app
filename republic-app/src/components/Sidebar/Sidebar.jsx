import React from 'react';
import "./Sidebar.css";
import { SidebarData } from "../../data/SidebarData";

function Sidebar() {
    return (
        <div className="Sidebar">
            <ul className='SidebarList'>
                {SidebarData.map((value, key) => {
                    return (
                        <li
                            className='SidebarListItem'
                            key={key}
                            id={window.location.pathname === value.link ? "active" : " "}
                            onClick={() => { window.location.pathname = value.link }}>
                                <div className='SidebarListIcon'>{value.icon}</div>
                                <div className='SidebarListTitle'>{value.title}</div>
                        </li>
                    );
                })}
            </ul>
        </div>

    )
}

export default Sidebar