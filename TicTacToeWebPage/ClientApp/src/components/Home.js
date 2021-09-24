import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { colors, fonts } from "../common/styles"

const useStyle = makeStyles({
  rootPage: {
      height: "88.9vh"
  },
    textRoot: {
        textAlign: "center",
        fontSize: fonts.fontSizeTtile,
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: 1.26,
        letterSpacing: "normal",
        color: colors.white,
    }
});

function Home() {
    const [name, setName] = useState();
    const classes = useStyle();
    
    useEffect(() => {
        (async () => {
            const response = await fetch("https://localhost:5001/api/GetUser", {
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            const content = await response.json();
            setName(content.username);
        })();
    });
    
    return (
    <Container>
      <Grid container item xs={12} className={classes.rootPage}>
          <Grid className={classes.textRoot}>
              Hello, <font color="#FBB917">{name}</font>!
              <br/><br/>
              <h4>
                  <p>We welcome you inside the world of the most <font color="#FBB917">exciting</font>,
                      <font color="#FBB917"> strategic</font> and <font color="red">filled with bloodlust </font> 
                      MMORPG game of the century: <font color="green">TicTacToe!</font></p>
                  <p>Enjoy your stay while <font color="red">ruthlessly slaying your enemies</font> and climbing all
                      the way to the <font color="FBB917">top</font>, thus winning our <font color="#FBB917">amazingly 
                      awesome prize</font>:<font color="green"> nothing!</font></p>
                  <p>And remember, as the old saying goes: <font color="#FBB917">"All is fair in love, war and</font>
                      <font color="green"> TicTacToe!"</font></p>
                  <p><font color="green">TicTacToe</font> will <font color="red">NOT</font> take the blame for any
                      <font color="red"> destroyed </font><font color="#FBB917">monitors</font>, <font color="#FBB917">
                       keyboards</font>,<font color="#FBB917"> mouses</font>, <font color="#FBB917">desks</font>, 
                      <font color="#FBB917"> chairs</font>, <font color="#FBB917">emotional stability</font> or 
                      <font color="#FBB917"> the loud screams of agony and desperation</font> that your neighbours might 
                      encounter while you're playing our game.</p>
                  <p><font color="#FBB917">Thank you and have fun!</font></p>
              </h4>
          </Grid>
      </Grid>
    </Container>
    );
}

export default Home;
