import RRT from rrt.js

class Environment {
    obs = [];
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }
    
    init() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        /** Initialize environment */
        let start_node_pos = [20, 20];
        let end_node_pos = [480, 480];
        let step = 20;
        let tol = 20;
        
        this.planner = new RRT(
            this.ctx,
            this.canvas, 
            start_node_pos, 
            end_node_pos,
            step,
            tol);
            
        this.planner.setObs(this.generateObs());            
    }

    step_planner() {
        /** Take a planner step */
        if (!this.planner.done) {
            this.planner.rrt_step();
        } else {
            console.log("already done!");
        }

    }

    run() {
        /** Run planner until solved */
        if (!this.planner.done)
        {
            while (!this.planner.done)
            {
                this.planner.rrt_step();
            }
        }
        else
        {
            console.log("already done!");
        }
    }

    generateObs() {
        /** Generate an array of obstacles based on x,y,r contraints */
        let C = [
            [this.canvas.width*0.1, this.canvas.width*0.1], 
            [this.canvas.width*0.9, this.canvas.height*0.9]];
        let rlim = [10, 50];
        let obs = [];
        for (let i=0; i<num_obs; i++) {
            let xy = random_xy(C)
            obs.push(new Obstacle("obs_"+i, xy[0], xy[1], random_r(rlim)));
        }
        return obs;
    }
} // Environment
