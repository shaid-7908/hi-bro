import React, { useEffect } from 'react'
import './Body.css'

import { useDataLayerValue } from './DataLayer'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import Footer from './Footer';
import BodySong from './BodySong';
const spotifyApi = new SpotifyWebApi({
  clientId: "c1429f68630b43e09a58f6eafa627049",
})
export default function Body({ spotify }) {

  
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [{ discover_weekly, token,user }] = useDataLayerValue();
  const [playingTrack,setPlayingTrack]=useState()
  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch('')
  }
  console.log("bolbam", discover_weekly)
  useEffect(() => {
    spotifyApi.setAccessToken(token)
  }, [token])
  useEffect(() => {
    if (!search) return setSearchResult([])
    if (!token) return
    let cancel = false;
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResult(
        res.body.tracks.items.map(track => {
          const smallestAlbumImages = track.album.images.reduce((smallest, image) => {
            if (image.height < smallest.height) return image
            return smallest
          }, track.album.images[0])
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImages.url
          }
        })
      )
    })
    return () => { cancel = true }
  }, [search, token])

 
  return (
    <div className="body">
    
      
    <div className='header'>
        <div className="header-left">
<SearchIcon/>
<input type="search" placeholder="Search Songs/Artists" value={search} onChange={e => setSearch(e.target.value)}  />
        </div>
        <div className="header-right">
<AccountCircleIcon  />
<h4>{user?.display_name}</h4>
        </div>
       
    </div>
      
<div className='song-display'>
{searchResult.map(track=>(
<BodySong track={track} key={track.uri} chooseTrack={chooseTrack}/>
  
))}
</div>
<Footer trackUri={playingTrack?.uri}/>
    </div>
  )
}
