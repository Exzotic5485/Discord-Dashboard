import React from 'react'
import { Grid } from "@mui/material"

import {useThemeConfigContext} from "../../context/ThemeContext"

const OnGuildComponent = ({ guild }) => {
    return <Grid item alignItems={"center"} alignContent={"center"}>
        <div style={{display:"flex",justifyContent:"center",width:'100%'}}>
            <div style={{width:'150px',height:'150px',backgroundSize:'cover',backgroundImage: `url('${guild.iconURL ? `${guild.iconURL}?size=512` : 'https://cdn.discordapp.com/embed/avatars/0.png'}')`,borderRadius:'20px'}}>

            </div>
        </div>
    </Grid>
}

export default function DashboardGuildsList({ guilds }) {
    const themeConfig = useThemeConfigContext()

    const onGuild = guilds.filter(g=>g.onGuild==true)
    return (
        <div>
            <div style={{width:'100%',textAlign:'center',paddingBottom:25}}>
                <h1 style={{
                    fontSize: 42,
                    color: themeConfig.colors.text.primary,
                    margin: 0,
                }}>Your servers</h1>
                <p style={{
                    fontSize: 18,
                    color: themeConfig.colors.text.secondary,
                    margin: 0,
                    marginTop: -10
                }}>Select guild you want to configure</p>
            </div>

            <div style={{
                width:'100%',
                display: "flex",
                justifyContent: "center"
            }}>
                <div style={{width:'80%',display:'flex',flexDirection:'column'}}>
                    <Grid container
                          spacing={{ xs: 2, sm: 4, md: 4 }}
                          columns={{ xs: 1, sm: 4, md: 11 }}
                          justifyContent="center"
                          alignItems="center"
                    >
                        {onGuild.map(guild=>{
                            return <OnGuildComponent guild={guild} key={guild.id} />
                        })}
                    </Grid>
                </div>
            </div>
        </div>
    )
}