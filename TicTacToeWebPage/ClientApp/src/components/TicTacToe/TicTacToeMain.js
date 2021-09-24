import React from "react"
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import { colors } from "../../common/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
    Grid: {
        height: "80.4vh",
    },
    textRoot: {
        color: colors.white
    },
    ButtonRoot: {
        fontSize: 16,
        border: "5px solid",
        backgroundColor: "#FBB917",
        borderColor: "#FFFFFF",
        lineHeight: 1.5,
        height: "20vh",
        width: "50vh",
        '&:hover': {
            backgroundColor: '#FFFFFF',
            borderColor: '#FBB917',
            boxShadow: 'none',
        }
    },
}));

const TicTacToeMain = () => {
    const history = useHistory();
    const classes = useStyles();

    const renderRedirectToEasy = () => {
        let path = `/TicTacToeEasy`;
        history.push(path);
    }

    const renderRedirectToHard = () => {
        let path = `/TicTacToeHard`;
        history.push(path);
    }
    
    return (
        <Container>
            <Grid className={classes.textRoot}><h1>Choose the difficulty for your TicTacToe game:</h1></Grid>
            <Grid
                className={classes.Grid}
                item
                xs={12}
                container
                direction="column"
                justify="space-evenly"
                alignItems="center"
            > 
                    <Grid item>
                        <Button 
                            className={classes.ButtonRoot} 
                            variant="contained"
                            onClick={renderRedirectToEasy} 
                        >
                            Easy</Button>
                    </Grid>
                    <Grid item>
                        <Button className={classes.ButtonRoot} 
                                variant="contained"
                                onClick={renderRedirectToHard} 
                        >
                            Hard</Button>
                    </Grid>
                    <Grid item>
                    </Grid>
                </Grid>
        </Container>
    );
}

export default TicTacToeMain;