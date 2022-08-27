import React from 'react'
import {createTheme, ThemeProvider} from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import {ThemeConfigWrapper} from "../context/ThemeContext"
import PageContent from "../components/PageContent"
import CardRounded from "../components/cards/CardRounded"

import DashboardGuildsList from "../components/guilds_list/DashboardGuildsList"

export async function getServerSideProps ({ query }) {
    return {
        props: {
            user: query.user || null,
            navigation: query.navigation || [],
            guilds: query.guilds ? JSON.parse(JSON.stringify(query.guilds)) : [],
            navigationSections: query.navigationSections ? JSON.parse(JSON.stringify(query.navigationSections)) : []
        }
    }
}

export default function GuildsList({
        user,
        navigation,
        guilds,
        navigationSections,
        themeConfig={
            colors: {
               navigation: {
                   active: "white",
                   inactive: "#929292",
               },
               text: {
                   primary: "white",
                   secondary: "#929292",
               },
               background: {
                   primary: '#161D20',
                   secondary: '#1E2528'
               }
            }
       }
}) {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            text: {
                primary: themeConfig.colors.text.primary,
                secondary: themeConfig.colors.text.secondary,
            },
        },
    })

    console.log(user, guilds)

    return <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <ThemeConfigWrapper themeConfig={themeConfig}>
            <PageContent navigation={navigation} navigationSections={navigationSections}>
                <CardRounded>
                    <DashboardGuildsList guilds={guilds}/>
                </CardRounded>
            </PageContent>
        </ThemeConfigWrapper>
    </ThemeProvider>
}