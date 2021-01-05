---
layout: default
title: Academic Projects
---

# Academic Projects

## [Carnegie Mellon University](#carnegie-mellon-university)

### [Computational Engineering and Robotics Laboratory](#computational-engineering-and-robotics-laboratory)
#### Control Project Group
Jan 2020 - Present

Research tethered drone controller design, simulation, and appliction. 
Develop an adaptive controller for UAVs operated under windy conditions. 
Design a drone controller development platform.

### [24-774 Advanced Control Systems Integration](#24-774-advanced-control-systems-integration)
#### Model Predictive Control Hardware Integration
Oct 2020 - Dec 2020

Wrote an MPC C++ application that achieved real time position and balance control of a two-wheeled robot. The controller hardware consisted of an Arduino Nano to receieve sensor signals and process motor commands and a Raspberry Pi 3 Model B to solve the MPC quadratic programming problem. Parameters such as the serial baud rate and the constant position reference were configured using JSON configuration files and the [nlohmann/json](https://github.com/nlohmann/json) interface.

![Application Layout](/assets/img/projects/solveMPC.png)

<p style="text-align:center"><a href="https://github.com/LukeSchmitt96/solveMPC" target="blank">GitHub Repository</a></p>

### [24-787 Machine Learning and Artificial Intelligence](#24-787-machine-learning-and-artificial-intelligence)
#### Tethered Quadcopter Reinforcement Learning
Sep 2020 - Dec 2020

Inspection systems consisting of a drone tethered to a mobile robot are an emerging technology that will be useful in cases where longevity is necessary and in environments where humans cannot safely go. This project explored methods to control a tethered drone when it is made unstable by some disturbance. The goal was to develop a controller that would return the drone to stability safely and quickly so as to not potentially damage nearby equipment. It specifically covered control policies realized through the use of reinforcement learning methods. Two different methods were successfully implemented: Deep Deterministic Policy Gradient (DDPG) and Proximal Policy Optimization (PPO). A simulation environment was set up using PyBullet and components from OpenAI gym. Both methods used the same or similar hyperparameters when learning the policies. Both methods were able to learn stabilizing policies, with the DDPG method producing much better performance. 

<table>
    <tr>
        <th style="border-bottom-width: 0px"><img src="/assets/img/projects/DDPG_flight.png" alt="DDPG Flight"></th>
        <th style="border-bottom-width: 0px"><img src="/assets/img/projects/PPO_flight.png" alt="PPO Flight"></th>
    </tr>
</table>

Below is an example of a flight using the DDPG policy.

<p style="text-align:center">
    <img src="/assets/img/projects/DDPG_best_flight.gif">
</p>

### [16-899 Adaptive Control and Reinforcement Learning](#16-899-adaptive-control-and-reinforcement-learning)
#### Improving State Estimation Through Filter Learning
Mar 2020 - May 2020

Implemented imitation learning methods on an Extended Kalman Filter (EKF) to improve the state estimation of a simulated quadrotor.
Specifically, the team sought to minimize error by learning the values within the process (Q) and measurement (R) covariance matrices within the EKF.

![Pitch Plot](/assets/img/projects/offset.png)

The plot above tracks quadcopter pitch and roll trajectories subject to a sinusoidal excitation.
The closer the curve is to the black ground truth curve, the better the estimation is.
The "Full" and "Max Jnt. Like." methods perform much better than the expert "Hand Tuned" and Diagonal methods.
The team was able to conclude that the learned methods performed as good or better than the hand tuned methods and required less knowledge of the system to implement.

### [16-868 Biomechanics and Motor Control](#16-868-biomechanics-and-motor-control)
#### Modeling Bipedal Balance Strategies
Oct 2019 - Dec 2019

Modeled a robust 2D bipedal controller using Simulink that recovers standing balance under disturbances.
Both standing balanace strategies and stepping balance strategies were implemented using the same model.
For each trial, a force was applied to the model's center of mass for 0.1s.

<!-- Embedded Video -->
<figure class="video_container" style="text-align: center;">
    <video loop="true" width="80%" autoplay controls height="auto">
        <source src="/assets/img/projects/stepping.webm">
        Your browser does not support HTML5 videos.
    </video>
</figure>

The video above shows an example of the model using its stepping balance strategy to recover from a 275N input over 0.1s.

The model's standing balance strategy is based on the those documented in the paper "Humanoid push recovery" (B. Stephens et al., 2007), while the stepping strategies were based on those documented in "Capture Point: A Step toward Humanoid Push Recovery" (Pratt et al., 2006).

---

## [The University of Akron](#the-university-of-akron)

### [Autonomous Combat Robot Senior Design Project](#autonomous-combat-robot-senior-design-project)
#### Mechanical Subteam
Jan 2018 - May 2019

Designed, built, and analyzed a platform for the development of an autonomous combat robot. Awarded first place for Health, Robotic, and Manufacturing System Design at the mechanical engineering senior design showcase day.

<p style="text-align:center">
    <img src="/assets/img/projects/uakron_combat_robot.png">
</p>

### [UAkron NASA Robotic Mining Competition Team](#uakron-nasa-robotic-mining-competition-team)
#### Locomotion Subsystem

Oct 2015 - May 2019

Lead designer, fabricator, and tester of the robot's locomotion subsystem. 

<p style="text-align:center">
    <img src="/assets/img/projects/uakron_nasa_robot.png">
</p>

### [UAkron Biomedical Engineering Design Team](#uakron-biomedical-engineering-design-team)
#### Modified Bicycle

Jun 2017 - Nov 2017

Modified a bicycle to make it rideable for a child who has spinocerebellar ataxia. Added custom foot pedals, custom seat with restraints, and motorized push-button braking system.

[Link to local Fox8 article](http://fox8.com/2017/12/06/norton-six-year-old-gets-to-ride-a-bike-thanks-to-biomed-students-engineers/).

#### [Tandem Wheelchair]()

Sep 2016 - May 2017

Designed dual wheelchair system for a family with two children who are wheelchair-bound.

[Link to local Fox8 article](http://fox8.com/2017/08/11/university-of-akron-students-design-unique-wheelchair-to-help-two-children/).