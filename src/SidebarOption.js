import React from 'react'
import './SidebarOption.css'

export default function SidebarOption({title,Icon}) {
  return (
 <div className="sidebar-option">
     {Icon && <Icon className="sidebar-option-icon" />}
     {Icon ? <h4>{title}</h4>:<p>{title}</p>}</div>
  )
}
