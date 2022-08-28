import React from 'react'
import { Grid } from "@mui/material"

import {useThemeConfigContext} from "../../context/ThemeContext"
import axios from "axios";

const OnGuildComponent = ({ guild }) => {
    return <Grid item alignItems={"center"} alignContent={"center"}>
        <div style={{display:"flex",justifyContent:"center"}} onClick={()=>location.href = `/guild/${guild.id}`}>
            <div className="on_guild_fullwrap">
                <img src={guild.iconURL ? `${guild.iconURL}?size=512` : 'https://cdn.discordapp.com/embed/avatars/0.png'}/>
                <div className="on_guild_fullcap" style={{fontSize:18,fontWeight:'bold'}}>
                    <div style={{width:"94%",overflowWrap: 'break-word',hyphens:"manual"}}>
                        {guild.name}
                    </div>
                </div>
            </div>
        </div>
    </Grid>
}

const NotOnGuildComponent = ({ guild }) => {
    return <Grid item alignItems={"center"} alignContent={"center"}>
        <div style={{display:"flex",justifyContent:"center"}} onClick={()=>location.href = `/invite?guild_id=${guild.id}`}>
            <div className="not_on_guild_fullwrap">
                <img src={guild.iconURL ? `${guild.iconURL}?size=512` : 'https://cdn.discordapp.com/embed/avatars/0.png'}/>
                <div className="not_on_guild_fullcap" style={{fontSize:12}}>
                    <div style={{width:"94%",overflowWrap: 'break-word',hyphens:"manual"}}>
                        {guild.name}
                    </div>
                </div>
            </div>
        </div>
    </Grid>
}

export default function DashboardGuildsList() {
    const [guilds, setGuild] = React.useState(null)
    React.useEffect(()=>{
        axios.get('/api/guild/list').then(res=>{
            setGuild(res.data.guilds)
        })
    }, [])

    const themeConfig = useThemeConfigContext()

    return (
        guilds ?
            <div>
                <style>
                    {`
.on_guild_fullwrap {
  position: relative;
  width: 150px;
  height: 150px;
  cursor: pointer;
}
 
.on_guild_fullwrap img { 
    width: 100%;
    border-radius: 30px;
 }
 
.on_guild_fullcap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  
  border-radius: 30px;
 
  position: absolute;
  top: 0; left: 0;
  text-align: center;
  display: flex;
  
  justify-content: center;
  align-items: center;
 
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
}
 
.on_guild_fullcap {
  visibility: none; opacity: 0;
  transition: opacity 0.3s;
}

.on_guild_fullwrap:hover .on_guild_fullcap {
  visibility: visible; opacity: 1;
}




.not_on_guild_fullwrap {
  position: relative;
  width: 80px;
  height: 80px;
  cursor: pointer;
}
 
.not_on_guild_fullwrap img { 
    width: 100%;
    filter: grayscale(100%);
    border-radius: 80px;
 }
 
.not_on_guild_fullcap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  
  border-radius: 80px;
 
  position: absolute;
  top: 0; left: 0;
  text-align: center;
  display: flex;
  
  justify-content: center;
  align-items: center;
 
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
}
 
.not_on_guild_fullcap {
  visibility: none; opacity: 0;
  transition: opacity 0.3s;
}

.not_on_guild_fullwrap:hover .not_on_guild_fullcap {
  visibility: visible; opacity: 1;
}
`}
                </style>

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
                    justifyContent: "center",
                }}>
                    <div style={{width:'80%',display:'flex',flexDirection:'column'}}>
                        <Grid container
                              spacing={{ xs: 2, sm: 4, md: 4 }}
                              columns={{ xs: 1, sm: 4, md: 11 }}
                              justifyContent="center"
                              alignItems="center"
                        >
                            {guilds.filter(guild=>guild.botOnGuild).map(guild=>{
                                return <OnGuildComponent guild={guild} key={guild.id} />
                            })}
                        </Grid>
                    </div>
                </div>

                <div style={{
                    width:'100%',
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: 50,
                    paddingBottom:50
                }}>
                    <div style={{width:'100%',display:'flex',flexDirection:'column'}}>
                        <Grid container
                              spacing={{ xs: 2, sm: 4, md: 4 }}
                              columns={{ xs: 1, sm: 4, md: 11 }}
                              justifyContent="center"
                              alignItems="center"
                        >
                            {guilds.filter(guild=>!guild.botOnGuild).map(guild=>{
                                return <NotOnGuildComponent guild={guild} key={guild.id} />
                            })}
                        </Grid>
                    </div>
                </div>
            </div>
            :
            <div>
                <a>Loading...</a>
            </div>
    )
}