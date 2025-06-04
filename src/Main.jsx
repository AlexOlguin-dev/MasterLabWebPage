import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Box, Toolbar, Typography, Button, IconButton, AppBar, useMediaQuery, useTheme, Card, CardHeader, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import MainIcon from "../src/assets/img/main_icon.png";
import BGTop from "../src/assets/img/Top/background.jpg";
import Hand from "../src/assets/img/Top/phone_app.png";
import Title from '../src/assets/img/title.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Imágenes de ejemplo (reemplaza por las tuyas)
import Pokedex from "../src/assets/img/Pokedex/pokedex.png";
import Download from "../src/assets/img/Top/download.png";
import Pokedex_1 from '../src/assets/img/Pokedex/pokedex_1.png';
import Pokedex_2 from '../src/assets/img/Pokedex/pokedex_2.png';
import Pokedex_3 from '../src/assets/img/Pokedex/pokedex_3.png';
import MoveDex from "../src/assets/img/Pokedex/move_dex.png";
import MoveDex_1 from '../src/assets/img/Pokedex/move_dex_2.png';
import MoveDex_2 from '../src/assets/img/Pokedex/move_dex_3.png';
import MoveDex_3 from '../src/assets/img/Pokedex/move_dex_4.png';
import AbilityDex from "../src/assets/img/Pokedex/hability_dex.png";
import AbilityDex_1 from "../src/assets/img/Pokedex/hability_dex_1.png";
import ItemDex from "../src/assets/img/Pokedex/item_dex.png";
import AdvacedSearch from '../src/assets/img/Tools/advanced_search.png';
import AdvacedSearch_1 from '../src/assets/img/Tools/advanced_search_1.png';
import TeamBuilder from '../src/assets/img/Tools/team_builder.png';
import TeamBuilder_1 from '../src/assets/img/Tools/team_builder_1.png';
import TeamBuilder_2 from '../src/assets/img/Tools/team_builder_2.png';
import TeamBuilder_3 from '../src/assets/img/Tools/team_builder_3.png';
import TeamBuilder_4 from '../src/assets/img/Tools/team_builder_4.png';
import TeamBuilder_5 from '../src/assets/img/Tools/team_builder_5.png';
import TeamBuilder_6 from '../src/assets/img/Tools/team_builder_6.png';
import TeamBuilder_7 from '../src/assets/img/Tools/team_builder_7.png';
import TeamBuilder_8 from '../src/assets/img/Tools/team_builder_8.png';
import TeamBuilder_9 from '../src/assets/img/Tools/team_builder_9.png';
import TeamBuilder_10 from '../src/assets/img/Tools/team_builder_10.png';
import TeamBuilder_11 from '../src/assets/img/Tools/team_builder_11.png';
import TeamBuilder_12 from '../src/assets/img/Tools/team_builder_12.png';
import TeamBuilder_13 from '../src/assets/img/Tools/team_builder_13.png';
import TeamBuilder_14 from '../src/assets/img/Tools/team_builder_14.png';
import SpeedTier from '../src/assets/img/other/speed_tiers.png';

// Firebase config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESAGER_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
if (typeof window !== "undefined") getAnalytics(app);

const Main = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [formData, setFormData] = useState({ name: "", email: "", comment: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const fadeIn = (direction = "up", delay = 0) => {
    const variants = {
      hidden: {
        opacity: 0,
        x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
        y: direction === "up" ? 50 : 0,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.8,
          delay,
        },
      },
    };
    return variants;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: dots => (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <ul style={{ margin: "0px", padding: 0, display: "flex" }}>{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "white",
          margin: "0 5px",
        }}
      />
    ),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "suggestions"), formData);
      setModalMessage("Thanks for your message, we'll work on making this App a better experience for you.");
      setFormData({ name: "", email: "", comment: "" });
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
      setModalMessage("Error sending message, please try out again later");
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  if (!isOnline) {
    return (
      <Box textAlign="center" p={4} bgcolor="#383838" minHeight="100vh">
        <img src={MainIcon} alt="Offline" style={{ width: 100, height: 100 }} />
        <Typography variant="h6" mt={2} style={{ color: "white", fontWeight: "bold" }}>
          You need to be connected to the internet to use this feature
        </Typography>
      </Box>
    );
  }

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

      {/**TITULO */}
      <Box sx={{ position: "relative", width: "100%", height: "900px", backgroundImage: `url(${BGTop})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        {/* Capa roja traslúcida */}
        <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(255, 0, 0, 0.4)" }}/>

        {/* Contenido centrado */}
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", px: 2 }}>
          <img src={Hand} alt="Phone App" style={{ maxWidth: "100%", height: "auto", marginBottom: "20px" }}/>
          {/* Icono de descarga */}
          <Typography variant="h4" sx={{ marginBottom: "20px", color: "white", textShadow: "1px 1px 3px rgba(0,0,0,0.7)", fontSize: { xs: "1.5rem", sm: "2rem" }}}>
           Download the free version here!
          </Typography>
          <a href="https://github.com/AlexOlguin-dev/MasterLabApkFreeVersion/releases/download/v1.0/MasterLab1.0Free.apk" download>
            <img src={Download} alt="Download" style={{ width: 100, height: 100, marginBottom: "20px", cursor: "pointer" }}/>
          </a>
          <Box sx={{ marginLeft: "-10px", backgroundColor: "rgba(255, 255, 255, 0.7)", padding: "5px 24px", borderRadius: 2, mb: 2, width: { xs: 250, sm: 500 }}}>
            <img src={Title} alt="title" style={{ width: "100%", height: "auto" }}/>
          </Box>
          <Typography variant="h4" sx={{ color: "white", textShadow: "1px 1px 3px rgba(0,0,0,0.7)", fontSize: { xs: "1.5rem", sm: "2rem" }}}>
            Your Pokémon laboratory with all the tools you need to play Pokémon.
          </Typography>
        </Box>        
      </Box>

      {/** POKEDEX */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "center", px: 4, py: 6, gap: 4 }}>
        <Box sx={{ width: { xs: "90%", md: "300px" }, mx: "auto" }}>
          <Slider dots arrows={false} infinite autoplay autoplaySpeed={3000} speed={500} slidesToShow={1} slidesToScroll={1}>
            {[Pokedex, Pokedex_1, Pokedex_2, Pokedex_3].map((img, index) => (
              <Box key={index} component="img" src={img} alt={`Pokedex ${index}`} sx={{ width: "100%", height: "auto" }} />
            ))}
          </Slider>
        </Box>

        <Box sx={{ maxWidth: 600 }}>
          <Typography variant="h3" component="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            Pokedex
          </Typography>
          <Typography variant="body1">
            All the information you need about your favourite Pokémon. Search them by type or name. You can check its abilities, stats, Pokédex entries, 
            moves and how it learns them, and evolution line including altered forms and variants with their evolution method. With this tool you can
            learn more basic data about your fauvorite Pokemon.
          </Typography>
        </Box>
      </Box>

      {/**MOVEDEX */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "center", px: 4, py: 6, gap: 4, backgroundColor: "#b5b5b5" }}>
        <Box sx={{ maxWidth: 600 }}>
          <Typography variant="h3" component="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            Movedex
          </Typography>
          <Typography variant="body1">
            Learn all about moves, their power, accuracy, and class, you can search moves wether it is by name, class damage (special, phisical or status), 
            by type and priority, you can also order the moves by power or accuracy according to your need to make a better search.
            You can also check more detail data with the priority of each move and how it affects in double battles, also learn what Pokémon learn the move
            and by what method. Have fun exploring the Movedex and all its data.
          </Typography>
        </Box>

        <Box sx={{ width: { xs: "90%", md: "300px" }, mx: "auto" }}>
          <Slider dots arrows={false} infinite autoplay autoplaySpeed={3000} speed={500} slidesToShow={1} slidesToScroll={1}>
            {[MoveDex,MoveDex_1,MoveDex_2,MoveDex_3].map((img, index) => (
              <Box key={index} component="img" src={img} alt={`Pokedex ${index}`} sx={{ width: "100%", height: "auto" }} />
            ))}
          </Slider>
        </Box>
      </Box>

      {/** ABILITYDEX */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "center", px: 4, py: 6, gap: 4 }}>
        <Box sx={{ width: { xs: "90%", md: "300px" }, mx: "auto" }}>
          <Slider dots arrows={false} infinite autoplay autoplaySpeed={3000} speed={500} slidesToShow={1} slidesToScroll={1}>
            {[AbilityDex,AbilityDex_1].map((img, index) => (
              <Box key={index} component="img" src={img} alt={`Pokedex ${index}`} sx={{ width: "100%", height: "auto" }} />
            ))}
          </Slider>
        </Box>

        <Box sx={{ maxWidth: 600 }}>
          <Typography variant="h3" component="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            Abilitydex
          </Typography>
          <Typography variant="body1">
            Learn more about every Pokémon's ability, how it works with an easy and short description. You can search them by name, and if you want more data you can check
            the longer description and what pokemon learn it. Check what Pokémon have access to what ability with the Abilitydex.
          </Typography>
        </Box>
      </Box>

      {/**MOVEDEX */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "center", px: 4, py: 6, gap: 4, backgroundColor: "#b5b5b5" }}>
        <Box sx={{ maxWidth: 600 }}>
          <Typography variant="h3" component="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            Itemdex
          </Typography>
          <Typography variant="body1">
            Search you fauvorite item by name in the Itemdex. Here you can also find detailed descriptions about what every item does and its effects.
          </Typography>
        </Box>

        <Box component="img" src={ItemDex} alt="Pokedex" sx={{ width: { xs: "80%", sm: "60%", md: "300px" }, height: "auto", mx: "auto" }}/>
      </Box>

      {/**TOOLS */}
      <Box sx={{ color: "#fff", px: 4, py: 6, minHeight: "100vh", backgroundColor: "black" }}>
        <Typography variant="h1" sx={{ fontWeight: "bold", mb: 4, textAlign: "center", color: "white" }}>
          TOOLS
        </Typography>

        <Card sx={{ backgroundColor: "black", p: 3, maxWidth: { xs: "100%", md: "900px" }, mx: "auto" }}>
          <CardHeader
            title="Advanced Search"
            titleTypographyProps={{
              variant: "h4", // más grande que h5
              align: "center", // centra el texto
              sx: {
                color: "#fff",
                fontSize: { xs: "1.5rem", md: "2.2rem" }, // ajuste de tamaño
                fontWeight: "bold",
              },
            }}
            sx={{
              borderBottom: "1px solid #555",
              pb: 2,
              textAlign: "center", // centra el contenedor también
            }}
          />

          <Box sx={{ mt: 3, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", gap: 3 }}>
            <Box component="img" src={AdvacedSearch} alt="Advanced Search" sx={{ width: { xs: "100%", md: "350px" }, borderRadius: 2 }}/>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn("left", 0.2)}>
              <Typography variant="body1" sx={{ color: "#fff", fontSize: { xs: "1rem", md: "30px" }}}>
                This is the advanced search, here you can search a Pokémon by very specific elements,
                like its type combinations, learns moves, ability, and 3 different stats. You can set
                the stat as more, equal or less than a specific amount.
              </Typography>
            </motion.div>
          </Box>

          <Box sx={{ mt: 5, display: "flex", flexDirection: { xs: "column", md: "row-reverse" }, alignItems: "center", gap: 3 }}>
            <Box component="img" src={AdvacedSearch_1} alt="Advanced Search 2" sx={{ width: { xs: "100%", md: "350px" }, borderRadius: 2 }}/>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn("right", 0.2)}>
              <Typography variant="body1" sx={{ color: "#fff", fontSize: { xs: "1rem", md: "30px" }}}>
                Also you can order the Pokémon you find by a specific stat to make your search easier.
              </Typography>
            </motion.div>
          </Box>
        </Card>

        <Card sx={{ color: "#fff", px: 4, py: 6, minHeight: "100vh", backgroundColor: "black" }}>
          {isMobile ? (
            <>
              <CardHeader title="Advanced Search" titleTypographyProps={{ variant: "h4", align: "center", sx: { color: "#fff", fontSize: { xs: "1.5rem", md: "2.2rem" }, fontWeight: "bold" }}} sx={{ borderBottom: "1px solid #555", pb: 2, textAlign: "center" }}/>
              {/* Imagen inicial */}
              <Box component="img" src={TeamBuilder} alt="Team Builder" sx={{ width: "100%", borderRadius: 2, mt: 3 }}/>

              {/* Primer texto con animación */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn("right", 0.2)}>
                <Typography variant="body1" sx={{ color: "#fff", fontSize: { xs: "1rem", md: "1.25rem" }, mt: 3 }}>
                  This is the Team Builder, the most important tool of MasterBall, here
                  you can create your team and analyze its efficiency in battle. As soon
                  as you enter you will be received by a list of your created teams. If
                  you want to create a new team, just press the button on top of the
                  screen and you will be immediately redirected to start building it.
                </Typography>
              </motion.div>

              {/* Segunda imagen */}
              <Box component="img" src={TeamBuilder_1} alt="Team Detail" sx={{ width: "100%", borderRadius: 2, mt: 4 }}/>

              {/* Segundo texto con animación */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn("left", 0.2)}>
                <Typography variant="body1" sx={{ color: "#fff", fontSize: { xs: "1rem", md: "1.2rem" }, mt: 3 }}>
                  In the Team Detail you have multiple useful tools to help you calibrate
                  your team. We'll describe some of them:
                  <br />
                  <ul style={{ paddingLeft: "1.5rem", marginTop: "1rem" }}>
                    <li>
                      <strong>Weaknesses:</strong> The App will make a balance
                      automatically of the weaknesses and lacked or needed coverages
                      according to the typings of every team member. With this, you can
                      properly calibrate your team typing balance to cover as much as
                      possible. This considers abilities like Levitate, Water/Volt Absorb,
                      even Flash Fire.
                    </li>
                    <li style={{ marginTop: "1rem" }}>
                      <strong>Stats:</strong> The App will calculate the total stats
                      accumulated in your team. This tool helps you know where your team
                      is charged to—Special Attack, HP, Special Defense, etc. Use this
                      feature to keep your team as balanced as possible.
                    </li>
                    <li style={{ marginTop: "1rem" }}>
                      <strong>Coverage:</strong> The App will also take all the typings of
                      your damaging moves and show what types you have already covered
                      with a percentage, and what types you still need to cover. Use this
                      to balance your coverage moves.
                    </li>
                  </ul>
                </Typography>
              </motion.div>

              {/* Carrusel de imágenes */}
              <Box sx={{ mt: 5 }}>
                <Slider {...settings}>
                  {[TeamBuilder_1, TeamBuilder_2, TeamBuilder_3].map((img, idx) => (
                    <Box key={idx} component="img" src={img} alt={`Slide ${idx + 1}`} sx={{ width: "100%", borderRadius: 2 }}/>
                  ))}
                </Slider>
              </Box>
            </>
          ) : (
            <>
              <CardHeader title="Team Builder" titleTypographyProps={{ variant: "h4", align: "center", sx: { color: "#fff", fontSize: { xs: "1.5rem", md: "2.2rem" }, fontWeight: "bold" }}} sx={{ borderBottom: "1px solid #555", pb: 2, textAlign: "center" }}/>

              {/* Primera sección */}
              <Box sx={{ mt: 3, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", gap: 3 }}>
                <Box component="img" src={TeamBuilder}  alt="Team Builder" sx={{ width: { xs: "100%", md: "300px" }, borderRadius: 2 }}/>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn("right", 0.2)}>
                  <Typography variant="body1" sx={{ color: "#fff", fontSize: { xs: "1rem", md: "30px" }}}>
                    This is the Team Builder, the most important tool of MasterBall, here
                    you can create your team and analyze its efficiency in battle. As soon
                    as you enter you will be received by a list of your created teams. If
                    you want to create a new team, just press the button on top of the
                    screen and you will be immediately redirected to start building it.
                  </Typography>
                </motion.div>
              </Box>

              {/* Segunda sección */}
              <Box sx={{ mt: 5, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", gap: 3 }}>

                <motion.div initial="hidden"whileInView="visible" viewport={{ once: true }} variants={fadeIn("left", 0.2)}>
                  <Typography variant="body1" sx={{ color: "#fff", fontSize: { xs: "1rem", md: "20px" } }}>
                    In the Team Detail you have multiple useful tools to help you calibrate
                    your team. We'll describe some of them:
                    <br />
                    <ul style={{ paddingLeft: "1.5rem", marginTop: "1rem" }}>
                      <li>
                        <strong>Weaknesses:</strong> The App will make a balance
                        automatically of the weaknesses and lacked or needed coverages
                        according to the typings of every team member. With this, you can
                        properly calibrate your team typing balance to cover as much as
                        possible. This considers abilities like Levitate, Water/Volt Absorb,
                        even Flash Fire.
                      </li>
                      <li style={{ marginTop: "1rem" }}>
                        <strong>Stats:</strong> The App will calculate the total stats
                        accumulated in your team. This tool helps you know where your team
                        is charged to—Special Attack, HP, Special Defense, etc. Use this
                        feature to keep your team as balanced as possible.
                      </li>
                      <li style={{ marginTop: "1rem" }}>
                        <strong>Coverage:</strong> The App will also take all the typings of
                        your damaging moves and show what types you have already covered
                        with a percentage, and what types you still need to cover. Use this
                        to balance your coverage moves.
                      </li>
                    </ul>
                  </Typography>
                </motion.div>
                <Box component="img" src={TeamBuilder_1} alt="Team Detail" sx={{ width: { xs: "100%", md: "300px" }, borderRadius: 2 }}/>
              </Box>

              {/* Galería final */}
              <Box sx={{ mt: 6, display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap" }}>
                <Box component="img" src={TeamBuilder_1} alt="TeamBuilder 1" sx={{ width: "250px", borderRadius: 2 }}/>
                <Box component="img" src={TeamBuilder_2} alt="TeamBuilder 2" sx={{ width: "250px", borderRadius: 2 }}/>
                <Box component="img" src={TeamBuilder_3} alt="TeamBuilder 3" sx={{ width: "250px", borderRadius: 2 }}/>
              </Box>
            </>
          )}
        </Card>

        <Card sx={{ backgroundColor: "black", p: 3, maxWidth: { xs: "100%", md: "900px" }, mx: "auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn("up", 0.2)}>
            <Typography variant="h5" align="center" gutterBottom style={{ color: "white" }}>
              But that's not all! You can also add single Pokémon to your team. You can choose any Pokémon you want, use the basic list 
              if you already know what Pokémon you want, or press the button with an Aim icon at the top right to activate the advanced 
              search system for more specific filtering.
            </Typography>
          </motion.div>

          {/* Dos imágenes lado a lado */}
          <Box sx={{ mt: 6, display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap" }}>
            <Box component="img" src={TeamBuilder_13} alt="TeamBuilder 1" sx={{ width: "250px", borderRadius: 2 }}/>
            <Box component="img" src={TeamBuilder_14} alt="TeamBuilder 2" sx={{ width: "250px", borderRadius: 2 }}/>
          </Box>

          {isMobile ? (
            <Box sx={{ mt: 3, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", gap: 3 }}>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn("left", 0.2)}>
                <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
                  You can modify the data of each Pokémon:
                </Typography>
                <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem", color: "white", fontSize: 30 }}>
                  <li>Teratype</li>
                  <li>Ability</li>
                  <li>Level</li>
                  <li>Nature</li>
                  <li>Held Item</li>
                  <li>Stats</li>
                  <li>Moves</li>
                </ul>
              </motion.div>

              <Box sx={{ width: { xs: "100%", md: "350px" }, borderRadius: 2 }}>
                <Slider {...settings}>
                  {[TeamBuilder_4, TeamBuilder_5, TeamBuilder_6, TeamBuilder_7].map((img, idx) => (
                    <Box
                      key={idx}
                      component="img"
                      src={img}
                      alt={`Slide ${idx + 1}`}
                      sx={{ width: "100%", borderRadius: 2 }}
                    />
                  ))}
                </Slider>
              </Box>
            </Box>
          ):(
            <Box sx={{ mt: 3, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", gap: 3 }}>
              <Box sx={{ width: { xs: "100%", md: "350px" }, borderRadius: 2 }}>
                <Slider {...settings}>
                  {[TeamBuilder_4, TeamBuilder_5, TeamBuilder_6, TeamBuilder_7].map((img, idx) => (
                    <Box
                      key={idx}
                      component="img"
                      src={img}
                      alt={`Slide ${idx + 1}`}
                      sx={{ width: "100%", borderRadius: 2 }}
                    />
                  ))}
                </Slider>
              </Box>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn("left", 0.2)}>
                <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
                  You can modify the data of each Pokémon:
                </Typography>
                <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem", color: "white", fontSize: 30 }}>
                  <li>Teratype</li>
                  <li>Ability</li>
                  <li>Level</li>
                  <li>Nature</li>
                  <li>Held Item</li>
                  <li>Stats</li>
                  <li>Moves</li>
                </ul>
              </motion.div>
            </Box>
          )}

          <Box sx={{ mt: 3, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", gap: 3 }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn("left", 0.2)}>
              <Typography variant="body1" sx={{ color: "#fff", fontSize: { xs: "1rem", md: "30px" }}}>
                Choose the moves you like the most, you can find all the move the chosen Pokemon can learn or you can search for the move to save time.
              </Typography>
            </motion.div>

            <Box component="img" src={TeamBuilder_8} alt="Advanced Search" sx={{ width: { xs: "100%", md: "350px" }, borderRadius: 2 }}/>
          </Box>

        </Card>

        <Card sx={{ backgroundColor: "black", p: 3, maxWidth: { xs: "100%", md: "900px" }, mx: "auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn("up", 0.2)}>
            <Typography variant="h5" align="center" gutterBottom style={{ color: "white" }}>
              You can check the data of your team created in a very easy to understand way, to avoid having you enter team members one by one
              we have prepared this final report of your team, where you can check all the data previously entered such as stat distribution, held item, ability
              and all you need to just build your team as you see it on your phone. 
            </Typography>
          </motion.div>

          {isMobile ? (
            <Box sx={{ width: { xs: "100%", md: "350px" }, borderRadius: 2 }}>
              <Slider {...settings}>
                {[TeamBuilder_10,TeamBuilder_11,TeamBuilder_12].map((img, idx) => (
                  <Box
                    key={idx}
                    component="img"
                    src={img}
                    alt={`Slide ${idx + 1}`}
                    sx={{ width: "100%", borderRadius: 2 }}
                  />
                ))}
              </Slider>
            </Box>
          ):(
          <Box sx={{ mt: 6, display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap" }}>
            <Box component="img" src={TeamBuilder_10} alt="TeamBuilder 1" sx={{ width: "250px", borderRadius: 2 }}/>
            <Box component="img" src={TeamBuilder_11} alt="TeamBuilder 2" sx={{ width: "250px", borderRadius: 2 }}/>
            <Box component="img" src={TeamBuilder_12} alt="TeamBuilder 2" sx={{ width: "250px", borderRadius: 2 }}/>
          </Box>
          )}

          <Box sx={{ mt: 3, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", gap: 3 }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn("left", 0.2)}>
              <Typography variant="body1" sx={{ color: "#fff", fontSize: { xs: "1rem", md: "30px" }}}>
                Finally, let's say you want to share your team with others, ot just take it to Pokemon Showndown to test it, worry not, we have you covered.
                Just press the button at the top of the report and automatically a PokePaste code will be generated for you to copy paste wherever you want.
                Now you can just test your team!
              </Typography>
            </motion.div>

            <Box component="img" src={TeamBuilder_9} alt="Advanced Search" sx={{ width: { xs: "100%", md: "350px" }, borderRadius: 2 }}/>
          </Box>
        </Card>
      </Box>

      {/**OTHERS */}
      <Box sx={{ color: "#fff", px: 4, py: 6, backgroundColor: "white" }}>
        <Typography variant="h1" sx={{ fontWeight: "bold", mb: 4, textAlign: "center", color: "black" }}>
          MORE
        </Typography>

        <Card sx={{ backgroundColor: "white", p: 3, maxWidth: { xs: "100%", md: "900px" }, mx: "auto" }}>
          <CardHeader
            title="Speed Tiers Training system"
            titleTypographyProps={{
              variant: "h4", // más grande que h5
              align: "center", // centra el texto
              sx: {
                color: "#000",
                fontSize: { xs: "1.5rem", md: "2.2rem" }, // ajuste de tamaño
                fontWeight: "bold",
              },
            }}
            sx={{
              borderBottom: "1px solid #555",
              pb: 2,
              textAlign: "center", // centra el contenedor también
            }}
          />

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn("up", 0.2)}>
            <Typography variant="h5" align="center" gutterBottom style={{ color: "black" }}>
              Train yourself in speed tiers by playing this minigame, try to break your last record by guessing which Pokémon is the fastest.
              You can add more dificulty to the challenge by setting more Pokémon on screen.
            </Typography>
          </motion.div>

          <Box sx={{ mt: 6, display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap" }}>
            <Box component="img" src={SpeedTier} alt="TeamBuilder 1" sx={{ width: "250px", borderRadius: 2 }}/>
          </Box>
          
        </Card>
      </Box>

      {/**SUGESTIONS */}
      <Box sx={{ color: "#fff", px: 4, py: 6, backgroundColor: "white" }}>
        <Box style={{ position: 'relative', padding: "10px", marginTop: "10px", overflowX: 'hidden' }} bgcolor="#383838">
          <Typography style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>Suggestion Box:</Typography>
          <Typography color="white" mb={2} style={{ fontWeight: "bold", fontSize: 15 }}>
            Leave us your suggestions or any new feature you'd like us to implement later, also you can use this to report any error or data mistake in the App, your ideas are welcome!
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField 
              fullWidth 
              name="name" 
              placeholder="Name" 
              value={formData.name} 
              onChange={handleChange} 
              margin="normal" 
              required 
              sx={{
                marginTop: "10px",
                backgroundColor: '#e0e0e0',
                borderRadius: 1,
                '& input': {
                  padding: '8px',
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: 14
                },
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              }}
            />
            <TextField 
              fullWidth 
              name="email" 
              type="email" 
              placeholder="Email" 
              value={formData.email} 
              onChange={handleChange} 
              margin="normal" 
              required 
              sx={{
                marginTop: "10px",
                backgroundColor: '#e0e0e0',
                borderRadius: 1,
                '& input': {
                  padding: '8px',
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: 14
                },
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              }}
            />
            <TextField 
              fullWidth 
              name="comment" 
              value={formData.comment} 
              placeholder="Comment/Suggestion" 
              onChange={handleChange} 
              multiline 
              rows={4} 
              margin="normal" 
              required 
              sx={{
                marginTop: "10px",
                backgroundColor: '#e0e0e0',
                borderRadius: 1,
                '& textarea': {
                  padding: '8px',
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: 14
                },
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              }}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2, backgroundColor: "black", color: "white", fontWeight: "bold", fontSize: 20 }} fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Box>

      {/** PIE DE PAGINA */}
      <Box sx={{ backgroundColor: 'black', py: 2, mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'white', fontSize: '0.8rem' }}>
          webpage created by Alex Olguin E. ©2025
        </Typography>
      </Box>

      {/* Modal de confirmación */}
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Mensaje</DialogTitle>
        <DialogContent>
          <Typography>{modalMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      
    </Box>
  );
}

export default Main;