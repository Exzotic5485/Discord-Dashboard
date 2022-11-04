import React from 'react'

import TextInput from './formtypes/TextInput'
import Switch from './formtypes/Switch'

export default function CategoryOptions({ category, UpdateOptionValue }) {
    return (
        <div>
            {category.options.map((option) => {
                console.log(option)
                if (option.type.name == 'TextInput') {
                    return (
                        <TextInput
                            key={option.id}
                            option={option}
                            category_id={category.id}
                            UpdateOptionValue={UpdateOptionValue}
                        />
                    )
                } else if (option.type.name == 'Switch') {
                    return (
                        <Switch
                            key={option.id}
                            option={option}
                            category_id={category.id}
                            UpdateOptionValue={UpdateOptionValue}
                        />
                    )
                }
            })}
        </div>
    )
}
