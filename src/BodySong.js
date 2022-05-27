import React from 'react'
import './BodySong.css'
export default function BodySong({track,chooseTrack}) {
  function handlePlay(){
    chooseTrack(track)
  }
  return (
    <div className="song-all-display" key={track.uri} onClick={handlePlay}> <img src={track.albumUrl} alt=" "/>
    <div className="song-info">
  
    <div className="song-name">{track.title}</div>
    <div className="song-artist">{track.artist}</div>
    </div>
     </div>
  )
}
