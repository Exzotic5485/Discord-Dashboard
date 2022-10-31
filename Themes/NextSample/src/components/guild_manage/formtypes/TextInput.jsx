import React, {useState, useEffect} from 'react'
import {TextField} from "@mui/material";

export default function TextInput({ category_id, option: { themeOptions, name, description, label, type, id, allowed, reason, value }, UpdateOptionValue }) {
    const [optionValue, setOptionValue] = useState(value)
    const [changesCount, setChangesCount] = useState(0)

    useEffect(()=>{
        if(changesCount > 0){
            UpdateOptionValue({category_id, option_id: id, newData: optionValue})
        }
        setChangesCount(changesCount+1)
    }, [optionValue])

    const handleChange = (e) => {
        const CSR = eval(type.clientSideValidation)(e.target.value)
        if(CSR != null)
            return alert(CSR)
        setOptionValue(e.target.value)
    }

    return (
        <div style={Object.assign(themeOptions?.customStyles?.optionContainer || { backgroundColor: 'none' }, {})}> {/* optionContainer */}
            <p>{name}</p>
            <p dangerouslySetInnerHTML={{
                __html: description
            }}/>
            <TextField fullWidth={true} helperText={allowed===false?reason:null} disabled={allowed===false} label={themeOptions?.label} value={optionValue} onChange={handleChange}/>
            {themeOptions?.emojiPicker ? <div>Seems like you want us to display emoji picker, but that's not possible as it's only Sample!</div> : null}
        </div>
    )
}
