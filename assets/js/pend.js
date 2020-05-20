'use strict';

(function(){
    
    // physics constants
    const SimStepsPerFrame = 1000;
    const FrameDelayMillis = 10;
    const gravity = -9.8;

    // animation constants
    const simCenterX = 400;
    const simCenterY = 250;

    let sim;

    // anchorClass describes anchors
    class AnchorClass {
        name;                       // anchor name
        x;                          // x center location of the anchor
        y;                          // y center location of the anchor
        width  = 40;                // drawn width of the pendulum
        height = 40;                // drawn height of the pendulum
        style  = "#F44336";         // color of the pendulum

        constructor(name, x, y) {
            this.name = name;       
            this.x    = x;          
            this.y    = y;          
        }

        /*  This function draws the anchor in the canvas
            INPUT:  context     - context within the canvas
        */  
        draw(context){
            context.fillStyle=this.style;       // set style of the anchor

            // draw a rectangle representing the anchor
            context.fillRect(this.x-this.width/2,   // starting location x (x-w/2)
                            this.y-this.height/2,   // starting location y (y-h/2)
                            this.width,             // width of the anchor
                            this.height);           // height of the anchor                                        
        }
    }

    class PendulumClass {
        /*  This function initializes the parameters of the pendulum
            INPUT:  x0          - starting joint x coord
                    y0          - starting joint y coord
                    l           - length of the pendulum
                    angle       - angle of the pendulum
                    m           - mass of the pendulum
        
    */
        constructor(name, x0, y0, l, theta, m){
            this.name   = name;             // pendulum name
            this.x0     = x0;               // first joint x coord
            this.y0     = y0;               // first joint y coord
            this.l      = 1;                // length of pendulum
            this.theta  = 0;            // angle of pendulum relative to world
            this.m      = 1;                // mass of pendulum

            this.b      = 10;               // damping ratio of pendulum
            this.angVel = 0;                // angular velocity of the the pendulum
            this.dtheta = 0;                // angular velocity of pendulum
            
            this.width  = 10;               // drawn width of pendulum
            this.length = 200;              // drawn length of pendulum
        }            

        // calculate the second joint x coord
        get x1(){return this.x0 + this.length*Math.cos(this.theta);}

        // calculate the second joint y coord
        get y1(){return this.y0 + this.length*Math.sin(this.theta);}    

        // get slider value as theta
        // get theta(){return slider.value*Math.PI/180;}

        /*  This function draws the pendulum in the canvas.
            The drawing starts at [x0,y0] and ends at [x1,y1].
            INPUT:  context     - context within the canvas
        */
        draw(context){
            context.fillStyle="#607D8B";    // assign pendulum link color
            context.lineWidth=this.width;   // assign pendulum drawn width
            context.lineCap='round';        // assign cap style
            context.beginPath();            // start path

            // move draw cursor to [x0, y0]
            context.moveTo(this.x0,this.y0);

            // draw a line from [x0, y0] to [x1, y1]
            context.lineTo(this.x1,this.y1)
            
            context.stroke();               // draw line
            context.closePath();            // end path

            context.fillStyle="#03A9F4";
            context.beginPath();
            context.arc(this.x1,this.y1,20,0,Math.PI*2)
            context.fill();
            context.lineWidth=2;
            context.stroke();
            context.closePath();
        };
    }

    class Simulation {
        constructor() {
            // list of simulation objects
            this.anchorList = [];
            this.pendList = [];

            // initialize gravity vector: 9.8 m/s^2 down
            this.gravity = -9.8;
        }

        // method to add anchor object to simulation
        AddAnchor(anchor) {
            this.anchorList.push(anchor);
            return anchor;
        }

        // method to add pendulum object to simulation
        AddPend(pend) {
            this.pendList.push(pend);
            return pend;
        }

        // method used to update the simulation given a time increment 
        // based on the  physical dynamics of the system
        Update(dt) {
            for (pend of this.pendList) {
                // Calculate the force acting on the pendulum

                //  Dynamics of a simple pendulum:
                //  Derive using Lagrangian Mechanics
                //  m*l^2*ddtheta(t) + m*g*l*sin(theta(t)) = Q
                //  where Q = -b*dtheta(t) + u(t)
                //  and where theta is measured ccw from 6 o'clock

                //  Consider the case of a constant control input
                //  m*l^2*ddtheta + b*dtheta + m*g*l*sin(theta) = u

                //  The state space realization looks like:

                //  For now, we will assume that b = 0 and u = 0
                //  ==>     m*l^2*ddtheta + m*g*l*sin(theta) = 0

                //  Solving for ddtheta gives
                //  ==>     ddtheta = -g/l*sin(theta)
                
                // ddtheta = dtheta/dt 
                //  ==>     dtheta = dt * ddtheta 
                //                 = dt * tau
                //                 = dt * ( u - g/l*sin(theta) )
                
                //pend.dtheta = dt * ( sim.u - pend.m*sim.gravity*pend.l/Math.cos(pend.theta) );
                //console.log(dt * ( sim.u - pend.m*sim.gravity*pend.l/Math.cos(pend.theta) ))

                // update position using the ang velocity in this increment
                //pend.theta += dt * pend.dtheta;
                //console.log(dt * pend.theta)
            }
        }
    }

    // method to make the simulation world - will create one anchor at [scX,scY] and a 
    // pendulum with its first joint at the anchor with specified initial angle
    function MakeWorld(sim) {
        let anchor = sim.AddAnchor(new AnchorClass('Base Anchor', simCenterX, simCenterY));
        let pend = sim.AddPend(new PendulumClass('Pendulum', anchor.x, anchor.y, 1, 0, 1));
    }

    // method to create a new simulation object and call the  
    // MakeWorld method. returns the completed simulation object
    function InitWorld() {
        let sim = new Simulation();
        MakeWorld(sim);
        return sim;
    }

    // method used to render the simulation. gets the canvas and context, 
    // changes the position and orientation of the canvas to get the center of the object 
    function Render(sim) {
        const canvas = document.getElementById('pend');
        const context = canvas.getContext('2d');
        
        sim.u = document.getElementById("control_slider").value;

        // clear
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

        // draw anchor, pendulum
        for (let a of sim.anchorList) {
            a.draw(context);
        }
        for (let p of sim.pendList) {
            p.draw(context);
        }
    }

    function AnimationFrame() {

        // check to see if the user wants to pause the simulation
        if (document.getElementById("sim_run_check").checked) {
            const dt = (0.001 * FrameDelayMillis) / SimStepsPerFrame;
            console.log(`dt = ${dt}`);
            for (let i=0; i < SimStepsPerFrame; ++i) {
                sim.Update(dt);
            }
            Render(sim);
            
        };
        window.setTimeout(AnimationFrame, FrameDelayMillis);
    }

    window.onload = function() {
        sim = InitWorld();
        AnimationFrame();
    }
})();