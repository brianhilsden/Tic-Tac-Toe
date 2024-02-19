import './styles.css'
import { useEffect, useState } from 'react'

function Square({choice,onClick,style}){
    return(
        <button onClick={onClick} className={style?"square":style===""?"default square":"square-O square"}>{choice}</button>
    )
}

export default function TicTacToe(){

    const [squares,setSquares]=useState(Array(9).fill(""));
    const[style,setStyle]=useState(Array(9).fill(""));
    const[isXTurn,setisXTurn]=useState(true);
    const[status,setStatus]=useState("")
    console.log(squares)

    function handleClick(getCurrentSquare){
        let newSquares=[...squares];
        if (getWinner(newSquares)||newSquares[getCurrentSquare])return;
        newSquares[getCurrentSquare]=isXTurn?"X":"O";
        let newStyle=[...style]
        newStyle[getCurrentSquare]=isXTurn?true:false;
        setStyle(newStyle)
        setisXTurn(!isXTurn)
        setSquares(newSquares)

    }

    function getWinner(squares){
        const winningPatterns=[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [2,5,8],
            [0,4,8],
            [2,4,6],
            [0,3,6],
            [1,4,7]
        ];
        for(let i=0;i<winningPatterns.length;i++){
            const[x,y,z]=winningPatterns[i]
            if(squares[x]&&squares[x]===squares[y]&&squares[x]===squares[z]){
                return squares[x]

            }
        }
        return null;
    }

    useEffect(()=>{
        if(!getWinner(squares) && squares.every(item=>item!=='')){
            setStatus('This is a draw.Please restart the game')
        }
        else if(getWinner(squares)){
            setStatus(`Congratulations.The winner is: ${getWinner(squares)}. Please restart game`)
        }
        else{
            setStatus(`Next player is: ${isXTurn?"X":"O"}`)
        }

    },[squares,isXTurn])

    function handleRestart(){
        setisXTurn(true);
        setSquares(Array(9).fill(""))
        setStyle(Array(9).fill(""))
    }
    return(
        <div className='main'>
            <h1 className='title'>Tic-Tac-Toe</h1>
            <div className="tic-tac-toe-container">
                <div className="row">
                    <Square onClick={()=>handleClick(0)} choice={squares[0]} style={style[0]}/>
                    <Square onClick={()=>handleClick(1)} choice={squares[1]} style={style[1]}/>
                    <Square onClick={()=>handleClick(2)} choice={squares[2]} style={style[2]}/>
                </div>
                <div className="row">
                    <Square onClick={()=>handleClick(3)} choice={squares[3]} style={style[3]}/>
                    <Square onClick={()=>handleClick(4)} choice={squares[4]} style={style[4]}/>
                    <Square onClick={()=>handleClick(5)} choice={squares[5]} style={style[5]}/>
                </div>
                <div className="row">
                    <Square onClick={()=>handleClick(6)} choice={squares[6]} style={style[6]}/>
                    <Square onClick={()=>handleClick(7)} choice={squares[7]} style={style[7]}/>
                    <Square onClick={()=>handleClick(8)} choice={squares[8]} style={style[8]}/>
                </div>
                <h1 className='status'>{status}</h1>
                <button className='restart' onClick={handleRestart}>Restart</button>

            </div>
        </div>
        
    )


}