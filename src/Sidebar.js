import React from 'react'
import './Sidebar.css'
import SidebarOption from './SidebarOption'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { useDataLayerValue } from './DataLayer';
import LibraryMusicSharpIcon from '@mui/icons-material/LibraryMusicSharp';
export default function Sidebar() {
  const [{playlists}]=useDataLayerValue();
  
  return (
    <div className='sidebar'>
      <div className="sidebar-mainlogodiv">

      <img className='side-bar-logo' src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="o" />
      <div className="shahid">by Shahid</div>
      </div>
      <SidebarOption Icon={HomeIcon} title={'Home'} />
      <SidebarOption Icon={SearchIcon}title={'Search'}/>
      <SidebarOption Icon={LibraryMusicSharpIcon}title={'Library'}/>
      <br/>
      <strong className='sidebar-title'>PLAYLIST</strong>
      <hr />
      {playlists?.items?.map((playlists)=>(
        <SidebarOption title={playlists.name}/>
      ))}
      
    

    </div>
  )
}
