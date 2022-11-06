import React, { useState, useEffect } from 'react'
import { Checkbox as CheckboxComponent } from '@mui/material'

export default function Checkbox({
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
        setOptionValue(e.target.checked)
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
            <CheckboxComponent
                disabled={allowed === false}
                name={name}
                id={id}
                checked={optionValue}
                onChange={handleChange}
            />
            {allowed === false ? <p>{reason}</p> : null}
        </div>
    )
}
