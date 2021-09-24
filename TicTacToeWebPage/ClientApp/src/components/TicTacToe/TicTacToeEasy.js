import React, { useEffect, useState } from "react";
import { calculateWinner } from "../../common/helper";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Board from "./Board";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
    Grid: {
        height: "88.9vh",
    },
    ButtonRoot: {
        fontSize: 16,
        border: "5px solid",
        backgroundColor: "#FBB917",
        borderColor: "#FFFFFF",
        lineHeight: 1.5,
        height: "10vh",
        width: "30vh",
        '&:hover': {
            backgroundColor: '#FFFFFF',
            borderColor: '#FBB917',
            boxShadow: 'none',
        }
    },
}));

const TicTacToeEasy = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [name, setName] = useState();
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisNext] = useState(true);
    const winner = calculateWinner(history[stepNumber]);
    const xo = xIsNext ? "X" : "O";
    const historyPoint = history.slice(0, stepNumber + 1)
    const current = historyPoint[stepNumber];
    const squares = [...current];
    const classes = useStyles();
    let bs = null;

    const handleClick = (i) => {
        if (winner || squares[i]) return; // return if somebody won or if the square has a value in it already
        squares[i] = xo;
        
        setHistoryAndStepNumber()
    };

    const setHistoryAndStepNumber = () => {
        setHistory([...historyPoint, squares])
        setStepNumber(historyPoint.length)
        setXisNext(!xIsNext)
    }

    const computerFunction = () => {
        bs = squares.findIndex(s => s== null)
        if (winner || squares[bs]) return; // return if somebody won or if the square has a value in it already
        squares[bs] = xo;
        setHistoryAndStepNumber()
    }
    
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

    const ResetGameState = () => {
        setHistory([Array(9).fill(null)]);
        setStepNumber(0);
        setXisNext(true);
    }
    
    return (
        <Grid className={classes.Grid}>
            <h1> {winner ? "Winner: " : stepNumber === 10 ? "Draw!" : "Next Player: "}
                <font color="#FBB917">{winner ? winner : stepNumber !== 10 ? xo : null}</font></h1>
            <table>
                <thead>
                    <tr>
                        <th>
                            <h2> {name}: <font color="red">X</font>  </h2>
                        </th>
                        <th>
                            <Board squares={history[stepNumber]} onClick={handleClick} {...xo==="O" ? computerFunction() : null} />
                        </th>
                        <th>
                            <h2> Computer: <font color="green">O</font></h2>
                            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                            {(winner !== null || stepNumber === 10) &&
                            <Button
                                className={classes.ButtonRoot}
                                variant="contained"
                                onClick={ResetGameState}
                            >
                                Play again?</Button>
                            }
                        </th>
                    </tr>
                </thead>
            </table>
        </Grid>
    );
};

export default TicTacToeEasy;