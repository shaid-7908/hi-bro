import React, { useState ,useEffect} from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import { useDataLayerValue } from './DataLayer'

export default function Footer({trackUri}) {
  const [play,setPlay]=useState();
  useEffect(()=>setPlay(true),[trackUri])
   
 
  
  const [{token}]=useDataLayerValue();
  
  if(!token) return null
  return (
    <div>
      <SpotifyPlayer 
 
      token={token}
      callback={state=>{
        if(!state.isPlaying) setPlay(false);
      }}
      play={play}
      uris={trackUri ?[trackUri]:[]}
        />
    </div>
  )
}
