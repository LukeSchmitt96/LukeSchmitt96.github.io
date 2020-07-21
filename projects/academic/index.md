---
layout: default
title: Academic Projects
---

# Academic Projects

## [Carnegie Mellon University](#carnegie-mellon-university)

### [Computational Engineering and Robotics Laboratory](#computational-engineering-and-robotics-laboratory)

#### Control Project Group
Jan 2020 - Present

Controller optimization for UAVs operated under windy conditions.

### [16-899 Adaptive Control and Reinforcement Learning](#16-899-adaptive-control-and-reinforcement-learning)
Mar 2020 - May 2020

Implemented imitation learning methods on an Extended Kalman Filter (EKF) to improve the state estimation of a simulated quadrotor.
Specifically, the team sought to minimize error by learning the values within the process (Q) and measurement (R) covariance matrices within the EKF.

![Pitch Plot](/assets/img/projects/offset.png)

The plot above tracks quadcopter pitch and roll trajectories subject to a sinusoidal excitation.
The closer the curve is to the black ground truth curve, the better the estimation is.
The "Full" and "Max Jnt. Like." methods perform much better than the expert "Hand Tuned" and Diagonal methods.
The team was able to conclude that the learned methods performed as good or better than the hand tuned methods and required less knowledge of the system to implement.

### [16-868 Biomechanics and Motor Control](#16-868-biomechanics-and-motor-control)

#### Modeling Bipedal Balance Strategies Using Simscape Multibody
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

Designed, built, and analyzed a platform for the development of an autonomous combat robot.

### [UAkron NASA Robotic Mining Competition Team](#uakron-nasa-robotic-mining-competition-team)

#### Locomotion Subsystem

Oct 2015 - May 2019

Lead designer, fabricator, and tester of the robot's locomotion subsystem. 

### [UAkron Biomedical Engineering Design Team](#uakron-biomedical-engineering-design-team)

#### [Modified Bicycle](http://fox8.com/2017/12/06/norton-six-year-old-gets-to-ride-a-bike-thanks-to-biomed-students-engineers/)

Jun 2017 - Nov 2017

Modification of a bicycle to make it rideable for a child who has spinocerebellar ataxia.

#### [Tandem Wheelchair](http://fox8.com/2017/08/11/university-of-akron-students-design-unique-wheelchair-to-help-two-children/)

Sep 2016 - May 2017

Design system to attach two wheelchairs.