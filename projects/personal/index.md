---
layout: default
title: Personal Projects
---

# Personal Projects

## [Coursera](#coursera)

### [Modern Robotics Motion Planning and Control](#modern-robotics-motion-planning-and-control)

This section details the projects I have completed in the [Modern Robotics: Robot Motion Planning and Control](https://www.coursera.org/learn/modernrobotics-course4) Coursera course.

#### A* Graph-Based Planning Algorithm

For this project, I used the [A* graph-based search algorithm](https://en.wikipedia.org/wiki/A*_search_algorithm) to find the shortest path (based on Euclidean distance) between two nodes on a graph. The code was written in Python and used object oriented programming concepts for the nodes and the planner to make the code reusable for later projects.

<p style="text-align:center">
    <img src="/assets/img/personal/a-star.png">
</p>

<p style="text-align:center"><a href="https://github.com/LukeSchmitt96/Coursera-Assignments/tree/main/Modern_Robotics_Robot_Motion_Planning_and_Control/Graph-Based_Planning_Assignment" target="blank">GitHub Repository</a></p>

#### RRT Sampling-Based Planning Algorithm

This project implements the [rapidly-exploring random tree (RRT)](https://en.wikipedia.org/wiki/Rapidly-exploring_random_tree) algorithm to find a path between two nodes in a space while avoiding obstacles. This project was written in Python, reusing the node and planner base classes from the A* project. The RRT algorithm performs the following steps:

1. Randomly sample the space (occasionally sampling the goal position). If the sample is occupied by an obstacle, skip.
2. Find the node closest to the sample. If the line between the sample and the closest node is intersected by an obstacle, skip.
3. Place a new node somewhere between the sample and the closest node.
4. Once a continuous path is built to the goal position, add parent nodes to the path working backwards from the goal node.

<!-- Embedded Video -->
<figure class="video_container" style="text-align: center; border: none">
    <video loop="true" width="80%" autoplay controls height="auto">
        <source src="/assets/img/personal/rrt.webm">
        Your browser does not support HTML5 videos.
    </video>
</figure>

<p style="text-align:center"><a href="https://github.com/LukeSchmitt96/Coursera-Assignments/tree/main/Modern_Robotics_Robot_Motion_Planning_and_Control/Sampling-Based_Planning_Assignment" target="blank">GitHub Repository</a></p>