// Uso de Material Icon UI

import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PersonIcon from '@mui/icons-material/Person';

export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/",
    },
    {
        title: "Administrativo financeiro",
        icon: <ShowChartIcon />,
        link: "/financial",
    },
    {
        title: "Infraestrutura",
        icon: <BuildIcon />,
        link: "/infrastructure",
    },
    {
        title: "Mercado",
        icon: <LocalGroceryStoreIcon />,
        link: "/market",
    },
    {
        title: "Tarefas",
        icon: <PlaylistAddCheckIcon />,
        link: "/tasks",
    },
    {
        title: "Membros",
        icon: <PersonIcon />,
        link: "/members",
    }
]