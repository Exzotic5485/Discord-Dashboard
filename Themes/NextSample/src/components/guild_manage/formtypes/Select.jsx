import React, { useState, useEffect } from 'react'
import {
    Checkbox as CheckboxComponent,
    FormControl,
    InputLabel,
    MenuItem,
    Select as SelectComponent,
} from '@mui/material'

export default function Select({
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
                <InputLabel id={`select_${id}_label`}>{type.label}</InputLabel>
                <SelectComponent
                    labelId={`select_${id}_label`}
                    id={`select_${id}`}
                    value={optionValue}
                    label={type.label}
                    onChange={handleChange}
                >
                    {type.values.map((value) => {
                        return (
                            <MenuItem value={value.value}>
                                {value.display_name}
                            </MenuItem>
                        )
                    })}
                </SelectComponent>
            </FormControl>
            {allowed === false ? <p>{reason}</p> : null}
        </div>
    )
}
