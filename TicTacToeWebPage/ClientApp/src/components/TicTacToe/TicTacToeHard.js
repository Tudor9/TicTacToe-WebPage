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

const TicTacToeHard = () => {
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
    let huPlayer = "X"
    let aiPlayer = "O"

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
            let boardWithKeys = [...squares];
            for (let i = 0; i < squares.length; i++) {
                if (squares[i] == null) {
                    boardWithKeys[i] = i;
                }
            }
            bs = MinMax(boardWithKeys, aiPlayer).index
        if (winner || squares[bs]) return; // return if somebody won or if the square has a value in it already
        squares[bs] = xo;
        setHistoryAndStepNumber()
    }
    
    function emptySquares(squares) {
        return squares.filter(a => typeof a == 'number')
    }
    
    function MinMax(newBoard, player) {
        let availSpots = emptySquares(newBoard);
        
        if(calculateWinner(newBoard) === huPlayer)
            return {score: -10};
        else if(calculateWinner(newBoard) === aiPlayer)
            return {score: 10};
        else if (availSpots.length === 0)
            return {score: 0};
        
        let moves = [];
        for(let i = 0; i< availSpots.length; i++){
            let move = {};
            move.index = newBoard[availSpots[i]];
            newBoard[availSpots[i]] = player;
            if(player === aiPlayer){
                let result = MinMax(newBoard, huPlayer);
                move.score = result.score;
            } else {
                let result = MinMax(newBoard, aiPlayer)
                move.score = result.score;
            }
            
            newBoard[availSpots[i]] = move.index
            
            moves.push(move)
        }
        let bestMove;
        if(player === aiPlayer){
            let bestScore = -10000;
            for(let i = 0; i < moves.length; i++){
                if(moves[i].score > bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = 10000;
            for(let i = 0; i < moves.length; i++){
                if(moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
            
        }
        return moves[bestMove]
    }
    
    useEffect(() => 
    {
        (
            async () => {
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
                            <h2> {name}: <font color="red">X</font></h2>
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

export default TicTacToeHard;