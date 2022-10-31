import React from 'react'
import {useThemeConfigContext} from "../../context/ThemeContext";
import OptionsManager from "./OptionsManager";

const GuildManage = ({ guild }) => {
    const themeConfig = useThemeConfigContext()
    console.log('guild is', guild)
    return <div>
        <div style={{width:'100%',textAlign:'center',paddingBottom:25}}>
            <img src={guild.iconURL ? guild.iconURL+"?size=512" : `https://cdn.discordapp.com/embed/avatars/0.png`} style={{borderRadius:'50%'}} width={200} height={200}/>
            <h1 style={{
                fontSize: 42,
                color: themeConfig.colors.text.primary,
                margin: 0,
            }}>{guild.name}</h1>
            <p style={{
                fontSize: 18,
                color: themeConfig.colors.text.secondary,
                margin: 0,
                marginTop: -10
            }}>Manage Bot Settings</p>
        </div>

        <OptionsManager guild={guild} />
    </div>
}

export default GuildManage
