import React from 'react'
import { useWindowSize } from "../hooks/useWindowsSize"
import Head from "next/head"
import Box from "@mui/material/Box"
import TopbarNav from "./navigation/top/TopbarNav"
import SidebarNav from "./navigation/side/SidebarNav"
import Toolbar from "@mui/material/Toolbar"

import {useThemeConfigContext} from "../context/ThemeContext"

export default function PageContent({ window, children, navigation, navigationSections, motd }) {
    const themeConfig = useThemeConfigContext()

    const drawerWidth = 170

    const [mobileOpen, setMobileOpen] = React.useState(false)

    const windowSize = useWindowSize().width
    const mobileBreak = 600
    const isMobile = () => windowSize<mobileBreak

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const container = window !== undefined ? () => window().document.body : undefined

    return (
        <div>
            <Head>
                <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'); 
                body { background-color: ${themeConfig.colors.background.primary} !important; font-family: 'Poppins', sans-serif; } 
                .MuiPaper-elevation { background-color: ${themeConfig.colors.background.primary} !important; background-image: none !important; } 
                .MuiDrawer-Paper { border-right: none !important; }`}
                </style>
            </Head>
            <Box sx={{ display: 'flex' }}>
                <TopbarNav
                    drawerWidth={drawerWidth}
                    handleDrawerToggle={handleDrawerToggle}
                    isMobile={isMobile}
                    motd={motd}
                />
                <SidebarNav
                    drawerWidth={drawerWidth}
                    container={container}
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                    navigation={navigation}
                    navigationSections={navigationSections}
                />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar style={{minHeight:'120px'}} />
                    {children}
                </Box>
            </Box>
        </div>
    )
}