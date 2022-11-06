import React, { useState, useEffect } from 'react'
import {
    Checkbox as CheckboxComponent,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select as SelectComponent,
} from '@mui/material'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

export default function MultipleSelect({
    category_id,
    option: {
        themeOptions,
        name,
        description,
        type,
        id,
        allowed,
        reason,
        value,
    },
    UpdateOptionValue,
}) {
    const [optionValue, setOptionValue] = useState(value) // optionValue is the value of the option (initial value = value from API endpoint [returned in option get function])
    const [changesCount, setChangesCount] = useState(0)

    useEffect(() => {
        if (changesCount > 0) {
            UpdateOptionValue({
                category_id,
                option_id: id,
                newData: optionValue,
            })
        }
        setChangesCount(changesCount + 1)
    }, [optionValue])

    const handleChange = (e) => {
        setOptionValue(e.target.value)
    }

    return (
        <div
            style={Object.assign(
                themeOptions?.customStyles?.optionContainer || {
                    backgroundColor: 'none',
                },
                {}
            )}
        >
            {' '}
            {/* optionContainer */}
            <p>{name}</p>
            <p
                dangerouslySetInnerHTML={{
                    __html: description,
                }}
            />
            <FormControl fullWidth>
                <SelectComponent
                    multiple
                    displayEmpty
                    value={optionValue}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                        selected = selected
                            .map((s) => {
                                return (
                                    type.values.find((e) => e.value == s)
                                        ?.display_name || null
                                )
                            })
                            .filter((e) => e != null)

                        if (selected.length === 0) {
                            return <em>{type.placeholder}</em>
                        }

                        return selected.join(', ')
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem disabled value="">
                        <em>{type.placeholder}</em>
                    </MenuItem>
                    {type.values.map((value) => (
                        <MenuItem key={value.value} value={value.value}>
                            {value.display_name}
                        </MenuItem>
                    ))}
                </SelectComponent>
            </FormControl>
            {allowed === false ? <p>{reason}</p> : null}
        </div>
    )
}
