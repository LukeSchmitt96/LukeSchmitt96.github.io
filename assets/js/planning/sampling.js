const node_r = 2;
const num_obs = 10;

function random_xy(C) {
    x = Math.random() * (C[1][0] - C[0][0]) + C[0][0];
    y = Math.random() * (C[1][1] - C[0][1]) + C[0][1];
    return [x, y];
}

function random_r(rlim) {
    return Math.random() * (rlim[1] - rlim[0]) + rlim[0];
}

(function(){

class Entity {
    fill_color = "#000000";
    stroke_color = "#000000";
    r = 10;
    constructor(id_, x_, y_) {
        this.id = id_;
        this.x = x_;
        this.y = y_;
    }

    // position getter and setter
    get pos() {return [this.x, this.y]}
    set pos(pos) {this.x=pos[0]; this.y=pos[1];}

    // draw a filled circle
    draw(context) {
        // console.log(`drawing entity with id of ${this.id}`);
        context.strokeStyle='black';
        context.fillStyle=this.fill_color;
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI*2);
        context.fill();
        context.lineWidth=2;
        context.stroke();
        context.closePath();        
    }

    dist_to_point(pos) {
        return Math.sqrt((this.pos[0] - pos[0])**2 + (this.pos[1] - pos[1])**2);
    }
}


class Obstacle extends Entity {
    fill_color = "#E0E0E0";
    stroke_color = "#646464";
    constructor(id_, x_, y_, r_) {
        super(id_, x_, y_);
        this.r = r_;
    }

    is_in_collision_point(pos) {
        /** Checks if point is in collision with object
         Parameters
        ----------
        pos : float
        x,y position of point to check collision for

        Returns
        -------
        b : bool
        True if in collision
        False if not in collision
        */
        let x_pos = pos[0];
        let y_pos = pos[1];
        return Math.sqrt((this.x - x_pos)**2 + (this.y - y_pos)**2) < (this.r + 5);
    }

    is_in_collision_line(a, b) {
        /** Checks line collision between two points for obstacle
     
        Parameters
        ----------
        a, b : float 2-tuples
            points to check for collision between

        Returns
        -------
        b : bool
            True if line between two points would be invalid,
            False if line between two points would be valid
        */
        let den = Math.sqrt((b[0]-b[1])**2+(a[1]-b[1])**2+0.0000001);
        let num = Math.abs((b[0]-a[0])*self.x+(a[1]-b[1])*self.y+(a[0]-b[0])*b[1]+(b[1]-a[1])*a[0])
        return num/den < self.r;
    }
}


class Node extends Entity {
    fill_color = "#000000";
    stroke_color = "#646464";
    edge_color = "#000000";
    r = node_r;
    h;
    parent;
    neighbors = {};
    constructor(id_, x_, y_, goal_pos_, parent_={}) {
        super(id_, x_, y_);
        
        this.h = this.dist_to_point(goal_pos_);
        this.parent = parent_;
        this.neighbors = {};
    }

    set_neighbor(id_, cost) {
        /** Add a neighbor to this node */
        this.neighbors[id_] = cost;
    }

    draw_edge_from_node(pos, ctx) {
        /** Draw an edge from this node to a position */
        const orig_stroke_style = ctx.strokeStyle;
        ctx.strokeStyle = this.edge_color;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(pos[0], pos[1]);
        ctx.stroke();
        ctx.strokeStyle = orig_stroke_style;
    }
}


class SamplingPlanner {
    obs=[];
    path=[];
    constructor(ctx_, canvas_, start_, goal_, goal_tol_) {

        console.log("Building sampling planner...")

        // get canvas
        this.canvas = canvas_;

        // establish context
        this.ctx = ctx_;

        // bounds on config space
        this.C = [
            [0,0],
            [this.canvas.width, this.canvas.height]];
        
        // start and end goal position
        this.start_pos = start_;
        this.goal_pos = goal_;
        this.goal_tol = goal_tol_;
        
        this.start_node = new Node(
            (1).toString(), 
            start_[0], 
            start_[1], 
            this.goal_pos);
        this.start_node.fill_color = "#00FF00";
        this.start_node.r = 10;
        
        this.goal_node = new Node(
            (-1).toString(), 
            goal_[0], 
            goal_[1], 
            this.goal_pos);
        this.goal_node.fill_color = "#0000FF";
        this.goal_node.r = 10;

        // dictionary for nodes
        this.nodes = {"1": this.start_node};

        this.start_node.draw(this.ctx);
        this.goal_node.draw(this.ctx);

        this.path.unshift(this.goal_node.id)
    }

    setObs(o) {
        /** make planner aware of obstacles */
        this.obs=o;
        for (const o of this.obs) {
            o.draw(this.ctx);
        }
    }

    is_in_collision_point(pos) {
        /**Checks point collision for every obstacle

        Parameters
        ----------
        pos : float 2-tuple

        Returns
        -------
        b : bool
            True if in collision
            False if not in collision
        */
        for (const o of this.obs) {
            if (o.is_in_collision_point(pos)) {
                return true;
            }
        }
        return false;
    }

    is_in_collision_line(a, b) {
        /**Checks line collision between two points for every obstacle

        Parameters
        ----------
        a, b : float 2-tuples
            points to check for collision between

        Returns
        -------
        b : bool
            True if line between two points would be invalid,
            False if line between two points would be valid
        */
        for (const o of this.obs) {
            if (o.is_in_collision_line(a, b)) {
                return true;
            }
        }
        return true;
    }

    sample() {
        /**Samples from C until a valid node (not in collision with any obstacles) is created
        
        Returns
        -------
        x,y : float 2-tuple
            valid node position
        */
        while(true) {
            let x = Math.random() * (this.C[1][0] - this.C[0][0]) + this.C[0][0];
            let y = Math.random() * (this.C[1][1] - this.C[0][1]) + this.C[0][1];

            if(!this.is_in_collision_point([x,y])) {
                return [x,y];
            }
        }
    }

    dist(p1, p2) {
        /**Get euclidian distance between two points

        Parameters
        ----------
        p_1 : float 2-tuple
            x,y pos of first point
        p_2 : float 2-tuple
            x,y pos of first point

        Returns
        -------
        d : float
            euclidian distance between the given points
        */
        return Math.sqrt((p1[0] - p2[0])**2 + (p1[1] - p2[1])**2);
    }

    knn(k, pos) {
       /**  search for k closest nodes to a position */
    }

}


class RRT extends SamplingPlanner {
    constructor(ctx_, canvas_, start, goal, step, goal_tol) {
        super(ctx_, canvas_, start, goal, goal_tol);
        
        // canvas
        this.canvas = canvas_;

        // context
        this.ctx = ctx_;

        // step size parameter
        this.step = step;

        console.log("Using RRT Planner.");
        console.log(`Parameters:\n\tstart: ${start}\n\tgoal: ${goal}\n\tstep: ${step}\n\tgoal_tol: ${goal_tol}`)

        this.done = false;
    }

    rrt_step() {
        // sample a random pos in space, occasionally sampling goal pos
        let sample_pos;
        if (Math.floor(Math.random() * 5) == 0) {
            if (!this.is_in_collision_point(this.goal_pos)) {
                sample_pos = this.goal_pos;
            }
        } else {
            sample_pos = this.sample();
        }

        // get sample node position and distance from nearest node
        let near = this.nearest_node(sample_pos);
        let nearest = near[0];
        let d = near[1];
        
        // new pos after taking a step towards the sample position
        let new_node_pos = this.motion(nearest, sample_pos, d);
        
        // check if this new position is valid
        if (!this.is_in_collision_point(new_node_pos)) {

            // create new node
            let id_ = (Object.keys(this.nodes).length+1).toString();
            this.nodes[id_] = new Node(
                id_,
                new_node_pos[0],
                new_node_pos[1],
                this.goal_pos,
                nearest.id);

            // update neighbors
            let n_dist = this.dist(this.nodes[id_].pos, nearest.pos);
            this.nodes[id_].set_neighbor(nearest.id, n_dist);
            this.nodes[nearest.id].set_neighbor(id_, n_dist);
            
            // visualize update
            this.viz_update(
                nearest.pos,
                id_);
            
            // check if we are close enough to the goal position
            if (this.dist(this.nodes[id_].pos, this.goal_pos) < this.goal_tol) {

                this.done = true;
                console.log("Goal within tolerance. Setting new node at goal.")

                // if close enough, add node at goal position
                let id_goal = (Object.keys(this.nodes).length+1).toString();
                this.nodes[id_goal] = new Node(
                    id_goal,
                    this.goal_pos[0],
                    this.goal_pos[1],
                    this.goal_pos,
                    id_);

                // update neighbors
                let ngoal_dist = this.dist(
                    this.nodes[id_goal].pos,
                    this.nodes[id_].pos)
                this.nodes[id_].set_neighbor(id_goal, ngoal_dist)
                this.nodes[id_goal].set_neighbor(id_, ngoal_dist)

                // add goal to nodes array
                this.nodes[(-1).toString()] = this.goal_node;

                // visualize update
                this.viz_update(
                    this.nodes[id_].pos,
                    id_goal);

                // reconstruct path theough parents
                this.recontruct_path(this.nodes[id_goal]);

                // visualize path
                this.viz_path();
                
                // done!
                return;
            }
        }
        return;
    }

    nearest_node(pos) {
        /** search through nodes to find closest neighbor */
        let nn;
        let min_dist = 10000; // some large number

        // loop through nodes, searching for lowest eucl dist
        for (const id in this.nodes) {
            let n = this.nodes[id];
            let d = n.dist_to_point(pos)
            if (d < min_dist) {
                nn = n;
                min_dist = d;
            }
        }
        return [nn, min_dist];
    }

    motion(nearest, sample_pos, d) {
        /** get pos of nearest node plus a step towards the sample pos */

        // x,y length between sample and goal
        let length = [sample_pos[0]-nearest.pos[0], sample_pos[1]-nearest.pos[1]];

        // normalize x,y lengths
        let length_norm = length.map(function(item) { return item/d })

        // calculate x,y step length
        let length_step = [length_norm[0] * this.step, length_norm[1] * this.step]

        // return pos + step
        return [nearest.pos[0] + length_step[0], nearest.pos[1] + length_step[1]];
    }

    recontruct_path(c) {
        /** build path by looping through parents until reaching start node */

        let current = c;

        // add current node to path
        this.path.unshift(current.id);
        
        // loop until no parents exist
        while (typeof current != 'undefined') {
            
            // add node parent to beginning of path
            this.path.unshift(this.nodes[current.id].parent);
            
            // new current node as current node's parent
            current = this.nodes[current.parent];
        }

        // remove undefined element from array
        this.path.splice(0, 1);

        console.log('Path to goal found: ');
        console.log(this.path);
    }

    viz_update(pos, id) {
        /** Visualize a new step */

        // draw new node
        this.nodes[id].draw(this.ctx);
        
        // draw edge between prev and current node
        this.nodes[id].draw_edge_from_node(pos, this.ctx);
    }

    viz_path() {
        /* Visualize a path from start to goal node */

        // remove first and last two nodes from the path for better viz
        let path_to_viz = this.path;
        path_to_viz.splice(0, 1);
        path_to_viz.splice(path_to_viz.length-2, 2);

        // loop through the viz path and draw path edges
        for (const id of path_to_viz) {
            let n = this.nodes[id];
            n.r = 6
            n.fill_color = "#FF00FF";
            n.stroke_color = "#000000";
            n.edge_color = "#FF00FF";
            n.draw(this.ctx);
            n.draw_edge_from_node(
                this.nodes[n.parent].pos, this.ctx);
        }
    }
}

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
}

window.onload = function() {
    let btn_run         = document.getElementById("sampling_run");
    let btn_step        = document.getElementById("sampling_step");
    let btn_reset       = document.getElementById("reset");

    let canvas = document.getElementById("sampling");
    let ctx = canvas.getContext("2d");

    let env = new Environment(
        canvas,
        ctx);
    
    btn_run.addEventListener("click", function() { env.run(); })
    btn_step.addEventListener("click", function() { env.step_planner(); })
    btn_reset.addEventListener("click", function() { env.init(); })


    env.init();
}

})(); // end env