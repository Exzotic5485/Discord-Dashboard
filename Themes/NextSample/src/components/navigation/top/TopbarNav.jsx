import React from 'react'
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"

import { useThemeConfigContext } from "../../../context/ThemeContext"
import { useWindowSize } from "../../../hooks/useWindowsSize"

export default function TopbarNav ({ drawerWidth, handleDrawerToggle, isMobile }) {
    const themeConfig = useThemeConfigContext()

    return <AppBar
        elevation={0}
        position="fixed"
        sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
        }}
    >
        <Toolbar style={{minHeight:'120px'}}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            {!isMobile() && <div style={{display:'flex', flexDirection: 'column'}}>
                <a style={{
                    fontWeight: 700,
                    fontSize: '58px',
                    lineHeight: '87px',
                    maxHeight: '120px',
                    color: themeConfig.colors.text.primary
                }}>
                    Assistants Center
                </a>
                <a style={{
                    color: themeConfig.colors.text.secondary,
                    marginTop:'-15px'
                }}>
                    Select guild to manage
                </a>
            </div>}
        </Toolbar>
    </AppBar>
}