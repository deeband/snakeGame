import React,{Component} from 'react'; 
// import { throwStatement } from '@babel/types';

class App extends Component{
  constructor(){
    super();
    const grid =[];
    for (let row = 0; row < 20; row++) {
      const cols =[];
      for (let col = 0; col < 20; col++) {
        cols.push({
            row,col
        }); 
        
      }
      grid.push(cols);
      
    }
    this.state={
      grid,
      // gameOver : false,
      apple:this.getRandomApple(),
      snake:{
        head: {
          row : 9,
          col:  9   
         },
         velocity:{
          x:1,
          y:0
        },
        tail :[]
      }
     
    }
  }

  componentDidMount =()=>{
    document.addEventListener('keydown',(e)=>{
      this.setVelocity(e);
    });
    setTimeout(() => {
      this.gameLoop()
    },150);// this.state.snake.tail.length? ( 400/ this.state.snake.tail.length)+100:400);
    // window.requestAnimationFrame(this.gameLoop)
  }

  getRandomApple=()=>({ 
      row:Math.floor(Math.random()*20),
      col:Math.floor(Math.random()*20 )
  })

gameLoop=()=>{
  if(this.state.gameOver) return;
  this.setState(({snake,apple})=>{
    const collidesWithApple = this.collidesWithApple();
    const nextState = {
      snake:{
        ...snake,
        head:{
          row: snake.head.row + snake.velocity.y,
          col: snake.head.col + snake.velocity.x
        },
        tail: [snake.head,...snake.tail]
      },
      apple: collidesWithApple ? this.getRandomApple(): apple
    };  
    if(!collidesWithApple) nextState.snake.tail.pop();


    return nextState;

  } , ()=>{
    const {snake} = this.state;
    if(this.ifOffEdge()|| this.isTail(snake.head)){
      this.setState({
        gameOver : true
      });
      return;
    }

    setTimeout(() => {
      this.gameLoop()
    },150);// snake.tail.length? ( 400/ snake.tail.length)+100:400);
    // window.requestAnimationFrame(this.gameLoop)


  });

  // if(this.collidesWithApple()){
  //   this.setState(({snake})=>{
  //     snake.tail.pop();
  //     return{
  //       snake:{
  //         ...snake,
  //         tail:[snake.head,...snake.tail],
  //       },
  //       apple:{
  //         row:Math.floor(Math.random()*20),
  //         col:Math.floor(Math.random()*20)
  //       }

  //     }
  //   }); 
  // }
  // this.snake.head.col += this.snake.velocity.x ;
  // this.snake.head.row += this.snake.velocity.y ;





}

collidesWithApple = ()=>{
  const{apple,snake}= this.state;
  return apple.row===snake.head.row && apple.col === snake.head.col;
}

ifOffEdge=()=>{
  const {snake} = this.state;

  if(snake.head.col>19||
    snake.head.row<0 ||
    snake.head.row>19 ||
    snake.head.row<0 ){
    return true;
    }
}

  isApple=(cell)=>{
    const{apple}= this.state;
    return apple.row===cell.row && apple.col === cell.col;
  }

  isHead=(cell)=>{
    const{snake}= this.state;
    return snake.head.row===cell.row && snake.head.col === cell.col;
  }

  
  isTail=(cell)=>{
    const{snake}= this.state;
    return snake.tail.find(inTail=> inTail.row ===cell.row && inTail.col === cell.col);
  }
  
  setVelocity=(event)=>{
    const{snake} = this.state;
    if(event.keyCode===38){//up
      this.setState(({snake})=>({
        snake: {
          ...snake,
          velocity:{
            x:0,
            y:-1,
          }
        }
      }))
    }

    else if(event.keyCode===40){//down
      this.setState(({snake})=>({
        snake: {
          ...snake,
          velocity:{
            x:0,
            y:1,
          }
        }
      }))
    }

    else if(event.keyCode===39){//right
      this.setState(({snake})=>({
        snake: {
          ...snake,

          velocity:{
            x:1,
            y:0,
          }
        }
      }))
    }

    else if(event.keyCode===37){//left
      this.setState(({snake})=>({
        snake: {
          ...snake,

          velocity:{
            x:-1,
            y:0,
          }
        }
      }))
    }
  }



  render(){
    const {grid,gameOver,snake}=this.state;
    return(
      <div className="App">
      {
        gameOver
        ? <h1>Game Over! You scored {snake.tail.length+1}!</h1>
      
      :    <section className="grid">
      {
        grid.map((row,i)=>(
          row.map(cell =>(
            <div key={`${cell.row} ${cell.col}`} className={`cell ${
              this.isHead(cell) || this.isTail(cell)? 'head':
            this.isApple(cell)? 'apple' :
               ''
          }`}></div>
          ))
    ))
      }
    </section>       
      }
   
      </div>


    );
  }
}
// function App() {
//   return (
//   );
// }

export default App;
