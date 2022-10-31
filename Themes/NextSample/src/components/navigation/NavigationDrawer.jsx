import React from 'react'
import Toolbar from "@mui/material/Toolbar"

import NavigationCategory from './NavigationCategory'
import NavigationItem from './NavigationItem'

import { useRouter } from 'next/router'

export default function NavigationDrawer ({ navigation, navigationSections }) {
    const router = useRouter()

    return <div>
        <Toolbar style={{minHeight:'120px'}} />
        <div style={{width:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            {
                navigationSections?.map((section,idx)=>{
                    const sectionItems = navigation.filter(item=>item.section == section)
                    return <NavigationCategory key={`navcat_${idx}`} title={section}>
                        {
                            sectionItems?.map((nav_item, idx) => {
                                return <NavigationItem
                                    key={`navit_${idx}`}
                                    title={nav_item.name}
                                    icon={nav_item.icon}
                                    url={nav_item.url}
                                    active={nav_item.active_match ? new RegExp(nav_item.active_match).test(router.asPath.split('?')[0]) : false}
                                />
                            })
                        }
                    </NavigationCategory>
                })
            }
        </div>
    </div>
}
