import React from 'react'
import {useThemeConfigContext} from "../../context/ThemeContext"

export default function CardRounded ({ title, children }) {
    const themeConfig = useThemeConfigContext()

    return <div style={{
        width: '100%',
        backgroundColor: themeConfig.colors.background.secondary,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 30,
        paddingTop: 20,
        paddingBottom: 20
    }}>
        <h1>{title}</h1>
        {children}
    </div>
}