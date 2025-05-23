import {Box, useMediaQuery} from "@mui/material";
import Navbar from "../navbar";
import { useSelector } from "react-redux"; // Importing useSelector to access Redux store state
import {useEffect, useState} from "react"; // Importing useEffect to perform side effects in the component
import { useParams } from "react-router-dom"; // Importing useParams to access URL parameters
import FriendListWidget from "scenes/widgets/FriendListWidget"; // Importing FriendListWidget component
import UserWidget from "components/UserImage"; // Importing UserWidget component
import MyPostWidget from "scenes/widgets/MyPostWidget"; // Importing MyPostWidget component
import PostsWidget from "scenes/widgets/PostsWidget"; // Importing PostsWidget component


const ProfilePage = () => {
  const [user, setUser] = useState(null); // State to store user data
  const { userId } = useParams(); // Getting userId from URL parameters
  const token = useSelector((state) => state.token); // Getting the token from Redux store
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); // Check if the screen size is non-mobile

  const getUser = async () => { // Function to fetch user data from the server
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json(); // Parsing the response data as JSON
    setUser(data); // Setting the user data in state
  }

  useEffect(() => { // Effect to fetch user data when component mounts or userId changes
    getUser(); // Fetching user data
  }, []); // Empty dependency array means this effect runs once on mount

  if (!user) return null; // If user data is not available, return null

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"} // Use flexbox for non-mobile screens
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}> {/* Sidebar for non-mobile screens */}
          <UserWidget userId={userId} picturePath={user.picturePath} /> {/* User widget component */}
          <FriendListWidget userId={userId} picturePath={user.picturePath} /> {/* Friend list widget component */}
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt = {isNonMobileScreens ? undefined : "2rem"}
          > 
          <MyPostWidget picturePath={user.picturePath} /> {/* My post widget component */}
          <PostsWidget userId={userId} isProfile /> {/* Posts widget component */}
        </Box>
      </Box>
      <Box m="2rem 0" /> {/* Margin for spacing */}
    </Box>
  );
}

export default ProfilePage;