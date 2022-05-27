import React from 'react'
import Body from './Body'

import './Player.css'
import Sidebar from './Sidebar'
function Player({spotify}) {
  return (
    <div className='player'>
      <div className="player-body">
        <Sidebar/>
      <Body spotify={spotify}/>
      </div>
     {/* <Footer/> */}
    </div>
  )
}

export default Player