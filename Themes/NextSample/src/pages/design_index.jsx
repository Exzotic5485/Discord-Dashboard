import * as React from 'react'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { ThemeConfigWrapper } from '../context/ThemeContext'

import PageContent from "../components/PageContent"
import CardRounded from "../components/cards/CardRounded"

const DesignIndex = ({
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
}) => {

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
            <PageContent>
                <CardRounded title={"Test Title"}/>
            </PageContent>
        </ThemeConfigWrapper>
    </ThemeProvider>
}

export default DesignIndex
