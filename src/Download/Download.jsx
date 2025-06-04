import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, useMediaQuery, AppBar, Toolbar, IconButton, Button, useTheme, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import MainIcon from "../assets/img/main_icon.png";
import BGTop from "../assets/img/Top/background.jpg";
import PayButton from "./PayButton";

const Download = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [hasPaid, setHasPaid] = useState(false);

  const handlePaymentSuccess = (details) => {
    setHasPaid(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ backgroundColor: "black", top: 0, zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 2 }} onClick={() => navigate('/')}>
            <img src={MainIcon} alt="Main Icon" style={{ width: 30, height: 30 }} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MasterLab
          </Typography>
          {isSmallScreen ? (
            <IconButton color="inherit" aria-label="download" onClick={() => navigate('/download')}>
              <DownloadIcon />
            </IconButton>
          ) : (
            <Button color="inherit" onClick={() => navigate('/download')}>Download Full Version</Button>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ position: "relative", width: "100%", height: "900px", backgroundImage: `url(${BGTop})`, backgroundSize: "cover", backgroundPosition: "center", display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(255, 0, 0, 0.4)" }} />

        {/* Componente de Pago */}
        {!hasPaid ? (
          <>
            <Box sx={{ zIndex: 2, backgroundColor: 'white', padding: 4, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>Buy the full version for 2$</Typography>
              <PayButton onPaymentSuccess={handlePaymentSuccess} />
            </Box>
            <Box sx={{ zIndex: 2, mt: 2, backgroundColor: 'white', padding: 2, borderRadius: 2, width: 'fit-content', textAlign: 'center' }}>
              <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'black' }}>
                Incase of any problem contact me at <b>alex.olguin.erpel@gmail.com</b> or send me a message through the suggestion box.
              </Typography>
            </Box>
          </>
        ) : (
          <Box sx={{ zIndex: 2, backgroundColor: 'white', padding: 4, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Thanks for your purchase:</Typography>
            <Button variant="contained" color="primary" href="/apk/MasterLab.apk" download>
              Download APK
            </Button>
          </Box>
        )}
      </Box>

      {/** PIE DE PAGINA */}
      <Box sx={{ backgroundColor: 'black', py: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'white', fontSize: '0.8rem' }}>
          webpage created by Alex Olguin E. ©2025
        </Typography>
      </Box>

    </Box>
  );
};

export default Download;