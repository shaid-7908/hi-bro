
// import './App.css';
import Login from './Login';

import {useEffect} from 'react';
import {getTokenFromResponse} from './spotify'
import SpotifyWebApi from 'spotify-web-api-js'
import { useDataLayerValue } from './DataLayer';
import Player from './Player';
const spotify=new SpotifyWebApi();
function App() {
  
  const [{ user,token,playlists },dispatch]=useDataLayerValue();
  useEffect(()=>{
    const hash=getTokenFromResponse();
    
    window.location.hash="GaoBsDk";
   const _token=hash.access_token;
   if(_token){
     dispatch({
       type:'SET_TOKEN',
       token:_token
     })
     spotify.setAccessToken(_token);
     spotify.getMe().then(user=>{
      //  console.log("**",user);
       dispatch({
         type:'SET_USER',
         user:user,
       });
     });
     spotify.getUserPlaylists().then((playlists)=>{
       dispatch({
         type:'SET_PLAYLISTS',
         playlists:playlists
       });
     })
     spotify.getPlaylist('6ehdSiG3d2TinBXr1r7ZK0').then(response=>{
       dispatch({
         type:"SET_DISCOVERWEEKLY",
         discover_weekly:response
       })
     })
   }
  },[dispatch]);
  console.log("Ho",user);
  console.log("token",token);
  console.log("play",playlists);
  return (
<div className="app">
  {token?( <Player spotify={spotify}/>):(<Login/> )}
 
</div>

 
  );
}

export default App;
