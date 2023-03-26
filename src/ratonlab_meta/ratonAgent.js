const Agent = require('../core/Agent');

/**
 * Simple reflex agent. Search for an object whithin a labyrinth. 
 * If the object is found the agen take it.
 */
class CleanerAgent extends Agent {
    constructor(value) {
        super(value);
        //LEFT, UP, RIGHT, DOWN, CELL
        this.table = {
            "0,0,0,0,0": ["LEFT","UP", "RIGHT", "DOWN"],
            "0,0,0,1,0": ["LEFT","UP", "RIGHT"],
            "0,0,1,0,0": ["LEFT","UP", "DOWN"],
            "0,0,1,1,0": ["LEFT","UP"],
            "0,1,0,0,0": ["LEFT", "RIGHT", "DOWN"],
            "0,1,0,1,0": ["LEFT", "RIGHT"],
            "0,1,1,0,0": ["LEFT", "DOWN"],
            "0,1,1,1,0": ["LEFT"],
            "1,0,0,0,0": ["UP", "RIGHT", "DOWN"],
            "1,0,0,1,0": ["UP", "RIGHT"],
            "1,0,1,0,0": ["UP", "DOWN"],
            "1,0,1,1,0": ["UP"],
            "1,1,0,0,0": ["RIGHT", "DOWN"],
            "1,1,0,1,0": ["RIGHT"],
            "1,1,1,0,0": ["DOWN"],
            "default": ["TAKE"]
        };
    }

    setup(state0) {
        this.x = state0.raton.x;
        this.y = state0.raton.y;
        this.queso0 = state0.queso;
    }

    /**
     * We override the send method. 
     * In this case, the state is just obtained as the join of the perceptions
     */
    send() {
        console.log("MI PERCEPCION: ",this.perception)
        const [LEFT, UP, RIGTH, DOWN, SMELL, ratonx, ratony, qx, qy, statesHistory] = this.perception;
        console.log("aiuda", statesHistory)
        let distX = Math.abs(qx - ratonx);
        let distY = Math.abs(qy - ratony);
        if(distX === 0 && distY === 0){
            return "TAKE"
        }

            //priorizar eje x
                    if (qx < ratonx) {
                      // queso a la izquierda
            
                        if (LEFT !== 1) {
                            if(!this.positionVisited(this.nextPosition({x: ratonx,y: ratony}, "LEFT"), statesHistory))
                            return "LEFT";
                        } 
                    } else if (qx > ratonx) {
                    //queso a la derecha
                        if (RIGTH !== 1) {
                            if(!this.positionVisited(this.nextPosition({x: ratonx,y: ratony}, "RIGHT"), statesHistory))
                            return "RIGHT";
                        } 
                    }
              
            //priorizar eje y
                     if(qy < ratony){
                        // queso arriba
                        if (UP !== 1) {
                          if(!this.positionVisited(this.nextPosition({x: ratonx,y: ratony}, "UP"), statesHistory))
                            return "UP";
                        }                            
                      }else if(qy > ratony){
                        // queso abajo
                        if (DOWN !== 1) {
                          if(!this.positionVisited(this.nextPosition({x: ratonx,y: ratony}, "DOWN"), statesHistory))
                            return "DOWN";
                        }                        
                      }                
        
        let viewKey = [LEFT, UP, RIGTH, DOWN, SMELL].join();

        if (this.table[viewKey]) {
            for (const action of this.table[viewKey]) {
                if (!this.positionVisited(this.nextPosition({ x: ratonx, y: ratony }, action), statesHistory)) {
                  return action;
                }
              };
        } else {
            return this.table["default"][0];
        }

    }

    nextPosition(currentPosition, action) {
        let x = currentPosition.x;
        let y = currentPosition.y;
        switch (action) {
            case "LEFT": 
                return { x: x - 1, y: y };
            case "RIGHT":
                return { x: x + 1, y: y };
            case "UP":
                return { x: x, y: y + 1 };
            case "DOWN":
                return { x: x, y: y - 1 };
            default:
                break;
        }
    }

    positionVisited(position, statesHistory){
        console.log("CHUPENLA perros", statesHistory)

        let x = position.x;
        let y = position.y;
        for(const state of statesHistory){
            console.log("explicandole a js con plastilina", state, "posi", position)
            if(x === state.raton.x && y === state.raton.y){
                console.log("CHUPENLA")
                return true;
            }
        }
    }

}

module.exports = CleanerAgent;