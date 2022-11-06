import React from 'react'

import TextInput from './formtypes/TextInput'
import Switch from './formtypes/Switch'
import TextArea from './formtypes/TextArea'
import Checkbox from './formtypes/Checkbox'
import Select from './formtypes/Select'
import MultipleSelect from './formtypes/MultipleSelect'

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
                } else if (option.type.name == 'TextArea') {
                    return (
                        <TextArea
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
                } else if (option.type.name == 'Checkbox') {
                    return (
                        <Checkbox
                            key={option.id}
                            option={option}
                            category_id={category.id}
                            UpdateOptionValue={UpdateOptionValue}
                        />
                    )
                } else if (
                    option.type.name == 'Select' ||
                    option.type.name == 'ChannelSelect' ||
                    option.type.name == 'RoleSelect'
                ) {
                    return (
                        <Select
                            key={option.id}
                            option={option}
                            category_id={category.id}
                            UpdateOptionValue={UpdateOptionValue}
                        />
                    )
                } else if (
                    option.type.name == 'MultipleSelect' ||
                    option.type.name == 'MultipleChannelSelect' ||
                    option.type.name == 'MultipleRoleSelect'
                ) {
                    return (
                        <MultipleSelect
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
