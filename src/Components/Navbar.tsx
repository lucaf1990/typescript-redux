import "../App.css";
import { Link } from "react-router-dom";
import HeaderOption from "./ProfileComponent/HeaderOption";
import Logo from "../linkedin.png";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  EXPERIENCE_FETCH,
  fetchMyExperience,
  fetchMyProfile,
  ME,
} from "../Redux/ActionTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";

function Navbar() {
  const myState = useSelector((state: RootState) => state.profile.me);
  const dispatch = useDispatch();

  const profileFetch = async () => {
    if (myState._id) {
      let data = await fetchMyProfile("me");
      dispatch({
        type: ME,
        payload: data,
      });
      let data2 = await fetchMyExperience(data._id);
      dispatch({
        type: EXPERIENCE_FETCH,
        payload: data2,
      });
    }
  };

  return (
    <div className="header">
      <div className="header_left">
        <img src={Logo} alt="LinkedIn icon" />
        <div className="header_search" style={{ height: "1.8rem" }}>
          <SearchIcon />
          <input type="text" placeholder="Cerca" />
        </div>
      </div>
      <div className="header_right">
        <Link to={"/"} onClick={profileFetch}>
          <HeaderOption Icon={<HomeIcon />} title="Home" />
        </Link>
        <HeaderOption Icon={<SupervisorAccountIcon />} title="My Network" />
        <Link to={"/Jobs"}>
          <HeaderOption Icon={<BusinessCenterIcon />} title="Jobs" />{" "}
        </Link>
        <HeaderOption Icon={<ChatIcon />} title="Messaging" />
        <HeaderOption Icon={<NotificationsIcon />} title="Notifications" />
        <Link to={`/Profile/me`} onClick={profileFetch}>
          <HeaderOption Icon={<AccountCircleIcon />} title="Profile" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
