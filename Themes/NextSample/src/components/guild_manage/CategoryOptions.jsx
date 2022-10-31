import React from 'react'

import TextInput from './formtypes/TextInput'

export default function CategoryOptions({ category, UpdateOptionValue }) {
    return (
        <div>
            {
                category.options.map(option => {
                    if(option.type.name == 'TextInput'){
                        return <TextInput key={option.id} option={option} category_id={category.id} UpdateOptionValue={UpdateOptionValue} />
                    }
                })
            }
        </div>
    )
}
