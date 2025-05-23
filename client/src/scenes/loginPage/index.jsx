import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "scenes/loginPage/Form"; // Importing the Form component for login functionality

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box width="100%" backgroundColor={theme.palette.background.alt} p="1rem 6%" textAlign={"center"}>
        <Typography
                  fontWeight="bold"
                  fontSize="32px"
                  color="primary"
                >
                  comsAlum
                </Typography>
      </Box>

      <Box
        width = {isNonMobileScreens ? "50%" : "93%"}
        p = "2rem"
        m = "2rem auto"
        borderRadius = "1.5rem"
        backgroundColor = {theme.palette.background.alt}
        >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{
            mb: "1.5rem",
          }}>
          Welcome to comsAlum, the Social Media for worthy Alumnus!
          </Typography>
        <Form /> {/* Rendering the Form component for login functionality */}
      </Box>
    </Box>
  );
}

export default LoginPage;