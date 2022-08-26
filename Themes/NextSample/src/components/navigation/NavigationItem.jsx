import React, { useRef } from 'react'

import Toolbar from "@mui/material/Toolbar"
import {Iconly} from "react-iconly"

import { useThemeConfigContext } from "../../context/ThemeContext"

import useHover from "../../hooks/useHover"

export default function NavigationItem ({ title, active, icon, url, idx }) {
    const themeConfig = useThemeConfigContext()

    const hoverRef = useRef(null)
    const isHover = useHover(hoverRef)

    return <div id={`navit_${idx}`} onClick={()=>location.href = url} ref={hoverRef} style={{
        cursor: isHover ? "pointer" : "default",
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        margin:"15px"
    }}>
        <Iconly
            name={icon}
            set='light'
            primaryColor={active || isHover ? themeConfig.colors.navigation.active : themeConfig.colors.navigation.inactive}
            size='xlarge'
        />
        <a style={{
            fontSize:16,
            textAlign: "center",
            color: active || isHover ? themeConfig.colors.navigation.active : themeConfig.colors.navigation.inactive
        }}>{title}</a>
    </div>
}