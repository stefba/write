import React, { useContext} from "react";
import { NavLink }  from "react-router-dom";
import { WriteContext } from "../controller/write";
//import Clear from '@material-ui/icons/ClearSharp';
import OnlineIcon from '@material-ui/icons/WifiSharp';
import OfflineIcon from '@material-ui/icons/WifiOffSharp';
import ColorModeIcon from '@material-ui/icons/WbSunnySharp';

const OfflineCheckbox = () => {
  const { offline, toggleOffline } = useContext(WriteContext);
  return (
    <button onClick={toggleOffline}>{offline
      ? (<OfflineIcon />)
      : (<OnlineIcon />)}</button>
  )
  /*
    <>
      <input
        className="offline"
        type="checkbox"
        onChange={toggleOffline}
        checked={offline}
        />
    </>
    */
}

const DarkThemeCheckbox = () => {
  const { toggleDarkTheme } = useContext(WriteContext);
  return (
    <button onClick={toggleDarkTheme}><ColorModeIcon /></button>
  )
  /*
    <>
      <input
        className="offline"
        type="checkbox"
        onChange={toggleDarkTheme}
        checked={darkTheme}
        />
    </>
    */
}

const Top = () => {
  const { offline } = useContext(WriteContext);
  return (
    <nav id="nav">
      <NavLink to="/" exact={true}>Write</NavLink>
      <NavLink to="/texts/">Texts</NavLink>
      { offline && <NavLink to="/queue/">Local</NavLink> }
      <nav className="options">
        <OfflineCheckbox />
        <DarkThemeCheckbox />
      </nav>
    </nav>
  );
}


export default Top
