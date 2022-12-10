import {SamplingPlanner} from sampling.js

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
            this.nodes[id_] = new GraphNode(
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
                this.nodes[id_goal] = new GraphNode(
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
