import React, { useState, useEffect } from 'react'

import FetchOptions from '../../utils/FetchOptions'
import PostOptions from '../../utils/PostOptions'

import CategoryOptions from './CategoryOptions'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'

const OptionsManager = ({ guild }) => {
    const [submitCount, setSubmitCount] = useState(0)
    const [settings, setSettings] = useState([])
    const [displaySave, setDisplaySave] = useState(false) // displaySave is a boolean to show/hide the save button
    const [saving, setSaving] = useState(false) // saving is a boolean to show/hide the saving indicator

    const [tabNow, setTabNow] = React.useState(null)

    useEffect(() => {
        FetchOptions(guild.id).then((settings) => {
            setSettings(settings)
            for (let i = 0; i < settings.length; i++) {
                const category = settings[i]
                if (!category.isDisabledGlobally) {
                    setTabNow(i)
                    break
                }
            }
        })
    }, [])

    const [settingsUpdated, setSettingsUpdated] = useState([])

    const UpdateOptionValue = ({ category_id, option_id, newData }) => {
        setDisplaySave(true)
        if (!settingsUpdated.find((category) => category.id === category_id)) {
            settingsUpdated.push({ id: category_id, options: [] })
        }
        if (
            !settingsUpdated
                .find((category) => category.id === category_id)
                .options.find((option) => option.id === option_id)
        ) {
            settingsUpdated
                .find((category) => category.id === category_id)
                .options.push({ id: option_id, value: newData })
        } else {
            settingsUpdated
                .find((category) => category.id === category_id)
                .options.find((option) => option.id === option_id).value =
                newData
        }
    }

    const SaveClicked = async () => {
        setSaving(true)
        const res = await PostOptions(guild.id, settingsUpdated)
        setSaving(false)
        setSubmitCount(submitCount + 1)
        setDisplaySave(false)

        showSuccessSnack()
    }

    const tabChanged = (event, newValue) => {
        setTabNow(newValue)
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        }
    }

    const [successSnack, setSuccessSnack] = React.useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
    })

    const showSuccessSnack = () => () => {
        setSuccessSnack({ open: true, ...successSnack })
    }

    const hideSuccessSnack = () => {
        setSuccessSnack({ ...successSnack, open: false })
    }

    return (
        <div>
            {settings.length > 0 ? (
                <div>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                value={tabNow}
                                onChange={tabChanged}
                                aria-label="basic tabs example"
                                variant="scrollable"
                                scrollButtons="auto"
                            >
                                {settings.map((category, idx) => {
                                    return (
                                        <Tab
                                            disabled={
                                                category.isDisabledGlobally
                                            }
                                            wrapped
                                            label={`${category.name}${
                                                category.isDisabledGlobally
                                                    ? ' (disabled)'
                                                    : ''
                                            }`}
                                            {...a11yProps(idx)}
                                        />
                                    )
                                })}
                            </Tabs>
                        </Box>
                        {settings.map((category, idx) => {
                            return (
                                <div
                                    key={idx}
                                    style={{
                                        display:
                                            idx == tabNow ? 'block' : 'none',
                                    }}
                                >
                                    <CategoryOptions
                                        category={category}
                                        UpdateOptionValue={UpdateOptionValue}
                                    />
                                </div>
                            )
                        })}
                    </Box>
                </div>
            ) : (
                <div>
                    <Skeleton
                        highlightColor={'#484d50'}
                        baseColor={'transparent'}
                        height={50}
                    />
                    <Skeleton
                        highlightColor={'#484d50'}
                        baseColor={'transparent'}
                        height={200}
                    />
                </div>
            )}
            <Snackbar
                anchorOrigin={{
                    vertical: successSnack.vertical,
                    horizontal: successSnack.horizontal,
                }}
                open={successSnack.open}
                onClose={hideSuccessSnack}
                message="I love snacks"
                key={'i love snacks'}
            />
            {settings.length > 0 ? (
                displaySave ? (
                    <a href={'#post'} onClick={SaveClicked}>
                        Save your settings!
                    </a>
                ) : (
                    <div>Not updated yet.</div>
                )
            ) : (
                <Skeleton
                    highlightColor={'#484d50'}
                    baseColor={'transparent'}
                    height={50}
                    width={150}
                />
            )}
        </div>
    )
}

export default OptionsManager
