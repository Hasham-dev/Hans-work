import React, { useState } from "react";
import { AppBar, Box, CardMedia, Typography, Drawer } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import logo from "../../assets/logo.png";

const pages = ["Home", "StakeNiFTi", "Contact US"];
const link = [
  "mint.NiFTigram.io",
  "https://stake.NiFTigram.io",
  "mailto:niftigram@gmail.com",
];

const handleLinkSite = (link) => {
  window.open(link, "_self");
};
const NavBar = () => {
  const [open, setOpen] = useState(false);

  const handleOpenNavMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "hsl(0, 0%, 100%)",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            padding: 0,
            margin: "5px auto",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            className="navbar_wrapper"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              alt="logo"
              sx={{
                display: "flex",
                width: "50px",
                height: "auto",
                justifyContent: "center",
              }}
              image={logo}
            />
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                color: "hsl(269, 93%, 58%)",
                display: { xs: "flex", sm: "none" },
              }}
            >
              <MenuIcon fontSize="20px" />
            </IconButton>
            <Drawer
              open={open}
              anchor={"left"}
              PaperProps={{
                sx: {
                  backgroundColor: "hsla(0, 0%, 100%, 0.829)",
                  width: "90%",
                  color: "hsl(269, 93%, 58%)",
                  maxWidth: "425px",
                  paddingTop: "87px",
                  gap: "10px",
                },
              }}
              sx={{
                background: "transparent",
                color: "hsl(269, 93%, 58%)",
                display: { xs: "flex", sm: "none" },
                padding: "20px 0",
              }}
              onClose={() => setOpen(false)}
            >
              {pages.map((page, index) => (
                <Typography
                  key={index}
                  onClose={handleCloseNavMenu}
                  onClick={() => handleLinkSite(link[index])}
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    padding: "5px",
                    fontWeight: "600",
                    display: "flex",
                    textTransform: "capitalize",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    color: "hsl(269, 93%, 58%)",
                    margin: "5px auto",
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  {page}
                </Typography>
              ))}
            </Drawer>
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              gap: "34px",
              display: { xs: "none", sm: "flex" },
            }}
          >
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={() => handleLinkSite(link[index])}
                sx={{
                  fontWeight: 600,
                  fontSize: "18px",
                  textTransform: "capitalize",
                  width: "max-content",
                  color: "hsl(269, 93%, 58%)",
                  fontFamily: "'Roboto', sans-serif;",
                  lineHeight: "24px",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
