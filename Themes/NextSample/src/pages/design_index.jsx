import React, {useState, useEffect} from 'react'
import GuildsList from "../components/GuildsList"

import FetchOptions from "../utils/FetchOptions"
import PostOptions from "../utils/PostOptions"

import CategoryOptions from "../components/CategoryOptions"
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeConfigWrapper} from "../context/ThemeContext";
import PageContent from "../components/PageContent";
import CardRounded from "../components/cards/CardRounded";
import GuildManage from "../components/guild_manage/GuildManage";

export async function getServerSideProps ({ query }) {
    return {
        props: {
            user: query.user || null,
            navigation: query.navigation || [],
            navigationSections: query.navigationSections ? JSON.parse(JSON.stringify(query.navigationSections)) : [],
        }
    }
}

export default function ManageGuild({
    navigation,
    navigationSections,
    user,
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

    return <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <ThemeConfigWrapper themeConfig={themeConfig}>
            <PageContent navigation={navigation} navigationSections={navigationSections}>
                <CardRounded>
                </CardRounded>
            </PageContent>
        </ThemeConfigWrapper>
    </ThemeProvider>
}
