import React from 'react'
import Toolbar from "@mui/material/Toolbar"
import {useThemeConfigContext} from "../../context/ThemeContext"

export default function NavigationCategory({ title, children, idx }) {
    const themeConfig = useThemeConfigContext()

    return <div>
        {title && <p style={{textAlign:'center',color:themeConfig.colors.text.secondary}}><b>{title}</b></p>}
        <div style={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            {children}
        </div>
    </div>
}