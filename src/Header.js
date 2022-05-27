import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDataLayerValue } from './DataLayer';

import BodySong from './BodySong';

import { useState ,useEffect} from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId: "c1429f68630b43e09a58f6eafa627049",
})
export default function Header({spotify}) {
  const[{user,token}]=useDataLayerValue();
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])

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
  
    <div className='header'>
        <div className="header-left">
<SearchIcon/>
<input type="search" placeholder="Search Songs/Artists" value={search} onChange={e => setSearch(e.target.value)}  />
        </div>
        <div className="header-right">
<AccountCircleIcon  />
<h4>{user?.display_name}</h4>
        </div>
        {searchResult.map(track=>(
          <BodySong track={track} key={track.uri}/>
        ))}
    </div>
  )
}
