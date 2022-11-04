import React, { useState, useEffect } from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeConfigWrapper } from '../context/ThemeContext'
import PageContent from '../components/PageContent'
import CardRounded from '../components/cards/CardRounded'
import GuildManage from '../components/guild_manage/GuildManage'

export async function getServerSideProps({ query }) {
    return {
        props: {
            user: query.user || null,
            navigation: query.navigation || [],
            navigationSections: query.navigationSections
                ? JSON.parse(JSON.stringify(query.navigationSections))
                : [],
            guild: query.guild ? JSON.parse(JSON.stringify(query.guild)) : null,
        },
    }
}

export default function ManageGuild({
    user,
    guild,
    navigation,
    navigationSections,
    themeConfig = {
        colors: {
            navigation: {
                active: 'white',
                inactive: '#929292',
            },
            text: {
                primary: 'white',
                secondary: '#929292',
            },
            background: {
                primary: '#161D20',
                secondary: '#1E2528',
            },
        },
    },
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

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <ThemeConfigWrapper themeConfig={themeConfig}>
                <PageContent
                    navigation={navigation}
                    navigationSections={navigationSections}
                >
                    <CardRounded>
                        <GuildManage guild={guild} />
                    </CardRounded>
                </PageContent>
            </ThemeConfigWrapper>
        </ThemeProvider>
    )
}
