import React from 'react'
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer"

import NavigationDrawer from '../NavigationDrawer'

export default function SidebarNav({ drawerWidth, container, mobileOpen, handleDrawerToggle, navigation, navigationSections }) {
    return <Box
        component="nav"
        sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
            "& .MuiDrawer-paper": { borderRight: 'none !important'}
        }}
        aria-label="mailbox folders"
    >
        <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
        >
            <NavigationDrawer navigation={navigation} navigationSections={navigationSections}/>
        </Drawer>
        <Drawer
            variant="permanent"
            sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
        >
            <NavigationDrawer navigation={navigation} navigationSections={navigationSections}/>
        </Drawer>
    </Box>
}