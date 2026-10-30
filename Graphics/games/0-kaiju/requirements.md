# KAIJU LAB
### Create. Destroy. Defend.

**Genre:** 3D Sandbox / Creature Creation / City Destruction / Action / Military Simulation

**Platform:** PC (Steam)

**Game Modes:** Single-player sandbox, with potential multiplayer support in the future

**Development Approach:** Indie development with AI-assisted coding

**Status:** Concept / Pre-production

---

## 1. Game Overview

**Kaiju Lab** is an ambitious 3D sandbox game that combines monster creation, genetic fusion, large-scale urban destruction, and military combat in a world inspired by classic Japanese kaiju and tokusatsu fiction.

Players can design their own giant monsters, customize their physical appearance and supernatural abilities, and deploy them into cities inspired by real-world locations.

Unlike traditional monster destruction games, Kaiju Lab also allows players to experience the conflict from humanity's perspective.

Players can join a military defense force, pilot fighter jets, operate armored vehicles, and engage in large-scale battles against giant monsters — including monsters they have created themselves.

The long-term vision is to create a dynamic sandbox where monsters, military forces, and destructible cities interact within the same simulated environment.

**Core Fantasy:**

*Create your own giant monster, unleash it upon a real-world-inspired city, and then take to the skies in a fighter jet to fight your own creation.*

---

## 2. Core Gameplay Pillars

### Pillar 1: Monster Creation

Players can create unique monsters using a modular creature customization system.

Customization options may include:

- Body shape, proportions, and overall size
- Heads, horns, claws, limbs, wings, and tails
- Biological, mechanical, and alien body parts
- Skin textures, armor, colors, and visual effects
- Movement types, including walking, flying, and crawling
- Offensive and defensive abilities
- Elemental attributes and special powers

Rather than relying entirely on predefined monsters, the game will allow players to assemble their own creatures from interchangeable components.

Each component can contribute to a monster's appearance, statistics, and combat capabilities.

For example, a monster with massive wings may gain flight capabilities, while one equipped with an energy-generating organ may unlock powerful beam attacks.

The initial implementation will focus on modular customization, with more advanced procedural body modification considered for future development.

### Pillar 2: Monster Abilities and Combat

Monsters can possess a wide variety of supernatural abilities inspired by giant-monster fiction.

Potential abilities include:

**Offensive Abilities**
- Atomic or plasma breath
- Laser and energy beams
- Fire and lightning attacks
- Explosive projectiles
- Shockwaves and area-of-effect attacks
- Physical attacks such as stomping, clawing, and tail strikes

**Defensive Abilities**
- Energy shields
- Regeneration
- Heavy biological armor
- Damage resistance
- Energy absorption

**Special Abilities**
- Flight
- Teleportation
- Invisibility
- Electromagnetic interference
- Environmental manipulation

Abilities will be implemented through a reusable, data-driven system.

This will allow players to combine different abilities without requiring a unique implementation for every monster.

### Pillar 3: Monster Fusion and Evolution

One of the game's defining features will be its monster fusion system.

Players can combine two or more monsters to create new hybrid creatures.

Fusion may involve:

- Inheriting physical characteristics from parent monsters
- Combining biological and mechanical components
- Transferring or merging supernatural abilities
- Generating new elemental combinations
- Unlocking mutations and rare traits
- Creating entirely new monster variants

**Example:**

Monster A: A heavily armored reptilian monster with fire breath.

Monster B: A flying insectoid monster with electrical attacks.

Fusion Result: A hybrid creature with volcanic armor, electric wings, and a new lightning-fire attack.

The initial fusion system will be rule-based and deterministic, rather than relying on AI-generated 3D models at runtime.

This approach provides greater control over animation compatibility, gameplay balance, and performance.

### Pillar 4: Real-World-Inspired City Generation

Players will be able to choose locations based on real-world geography.

Instead of manually designing every city, the game will use geographic datasets to procedurally generate urban environments.

Potential locations include:

- Melbourne
- Tokyo
- New York
- London
- Other cities supported by available geographic data

The intended geographic data sources include OpenStreetMap, with optional supplementary building and terrain datasets.

The city generation system will use real-world information such as:

- Road layouts
- Building footprints
- Building heights, where available
- Urban block structures
- Waterways and terrain
- Land-use information

The game will then generate its own 3D buildings, materials, collision geometry, and destructible structures.

This approach is intended to provide recognizable city layouts without relying on proprietary Google Maps 3D building models.

The long-term objective is to allow players to select geographic coordinates and generate playable urban environments.

However, the initial release will focus on a limited number of supported locations.

### Pillar 5: Large-Scale Urban Destruction

City destruction will be a central gameplay mechanic.

Monsters will be able to damage buildings through physical attacks, energy weapons, explosions, and environmental interactions.

The destruction system will support multiple levels of damage:

**Level 1 — Visual Damage**

Buildings display cracks, damaged facades, smoke, and fire.

**Level 2 — Structural Damage**

Sections of buildings break apart, and debris falls under simulated physics.

**Level 3 — Building Collapse**

Severely damaged buildings collapse into rubble, potentially damaging nearby structures.

To maintain performance, the game will use a hybrid destruction system.

Most buildings will remain static until damaged. Physics simulation will be activated selectively, with simplified destruction effects used for distant structures.

The goal is to make destruction visually satisfying while supporting large urban environments.

### Pillar 6: Human Defense Force

A major feature distinguishing Kaiju Lab from traditional monster games is the ability to fight monsters from humanity's perspective.

Players will be able to join a military defense force responsible for protecting cities from giant-monster threats.

Potential playable units include:

- Fighter jets
- Attack helicopters
- Main battle tanks
- Armored vehicles
- Anti-aircraft systems
- Experimental military vehicles
- Giant combat mechs

The initial focus will be on fighter jet combat.

Players will be able to take off from military bases, fly toward monster attack zones, acquire targets, and engage giant monsters using missiles and other weapons.

The flight model will initially prioritize accessible, arcade-style controls rather than highly realistic flight simulation.

**Example Scenario:**

A giant monster appears in central Melbourne.

The defense force receives an emergency alert.

The player launches from an airbase, approaches the city, and identifies the monster through radar and visual targeting.

The monster possesses a powerful energy shield and can fire destructive beams at aircraft.

The player must maneuver around incoming attacks, identify vulnerable body parts, and coordinate with allied forces to defeat the monster.

### Pillar 7: Dynamic Monster Weaknesses

A particularly important design principle is that monster customization should directly influence combat.

Individual monster components may function as destructible subsystems.

For example:

- Destroying a monster's wings may disable flight.
- Damaging its energy organ may weaken or disable its beam attacks.
- Destroying a shield generator may expose vulnerable body parts.
- Damaging its legs may reduce movement speed.
- Destroying sensory organs may reduce its ability to track aircraft.

This creates a direct connection between the monster creation system and the defense force gameplay.

**Every design choice made in the monster editor can become a tactical challenge during combat.**

---

## 3. Gameplay Modes

### Monster Sandbox Mode

Players create and control their monsters, deploy them into cities, and experiment with their abilities.

Activities include city destruction, monster combat, and testing different creature configurations.

### Defense Force Mode

Players fight AI-controlled monsters using military vehicles and weapons.

The emphasis is on tactical targeting, mobility, survival, and coordination with allied forces.

### Monster vs. Monster Mode

Players pit their creations against other monsters in destructible environments.

### Scenario Editor

Players configure custom monster invasion scenarios.

Potential options include:

- City and spawn location
- Monster selection
- Monster behavior and aggression
- Number and type of defending military units
- Environmental conditions
- Victory and defeat conditions

A future community-sharing system could allow players to exchange monsters and invasion scenarios.

---

## 4. Technical Architecture

### Initial Web Prototype

The first prototype may use a web-based technology stack to accelerate development.

**Frontend and Rendering**
- TypeScript
- React
- Three.js
- React Three Fiber
- Drei

**Physics and Game Systems**
- Rapier Physics
- Zustand
- Custom game-loop architecture
- Finite-state machines for AI

**Geographic Data**
- OpenStreetMap
- GeoJSON
- Python
- OSMnx
- Shapely
- PyProj

**Asset Creation**
- Blender
- glTF / GLB

The web prototype will validate the core gameplay mechanics before committing to a larger production pipeline.

### Potential Production Engine

For a full-scale PC release, Unreal Engine 5 is currently the preferred option.

Its relevant technologies include:

- C++ and Blueprint
- Chaos Physics and Destruction
- World Partition
- Procedural Content Generation (PCG)
- Gameplay Ability System
- StateTree / Behavior Trees
- Niagara visual effects

Unreal Engine 5 may be better suited to the long-term requirements of large cities, advanced destruction, high-quality graphics, and complex vehicle combat.

The final engine decision will depend on prototype performance and development experience.

A migration from Three.js to Unreal would require substantial rewriting of engine-specific code, so the initial prototype should keep gameplay data and rules as engine-independent as practical.

---

## 5. Development Roadmap

### Phase 1 — Core Gameplay Prototype

**Objective:** Validate the basic monster destruction experience.

Features:

- Small 3D city environment
- Basic monster controller
- Third-person camera
- Walking and stomping
- Energy beam attack
- Simple destructible buildings
- Basic damage and collision systems

### Phase 2 — Procedural City Generation

**Objective:** Generate playable urban environments from real geographic data.

Features:

- OpenStreetMap data import
- Building footprint extraction
- Procedural building generation
- Road generation
- Building collision
- City chunk management

Initial target: a 500 m × 500 m section of Melbourne CBD.

### Phase 3 — Monster Creator

**Objective:** Allow players to design their own monsters.

Features:

- Modular body parts
- Adjustable size and proportions
- Custom colors and materials
- Configurable abilities
- Monster statistics
- Save and load functionality

### Phase 4 — Defense Force Prototype

**Objective:** Introduce the human perspective.

Features:

- Playable fighter jet
- Arcade flight controls
- Radar and targeting
- Guided missiles
- AI-controlled monster
- Monster weak points
- Switching between monster and defense force modes

### Phase 5 — Monster Fusion

**Objective:** Expand the creation system.

Features:

- Fusion interface
- Genetic inheritance rules
- Hybrid body configurations
- Ability combinations
- Mutation system
- New unlockable abilities

### Phase 6 — Advanced Sandbox Systems

Potential additions:

- Larger cities
- Advanced destruction
- Multiple monster encounters
- Additional military vehicles
- Military AI coordination
- Scenario editor
- Community monster sharing
- Expanded geographic coverage

---

## 6. Minimum Viable Product (MVP)

The first major milestone should demonstrate the game's core identity without attempting to implement every planned feature.

**MVP Feature Set**

- One playable city based on Melbourne CBD
- One modular monster with limited customization
- Three monster abilities
- Several destructible building types
- One playable fighter jet
- Basic missile targeting
- One AI-controlled monster
- Basic monster weak points
- A simple monster/defense force mode switch

**Primary Gameplay Loop**

1. Create or customize a monster.
2. Deploy the monster into the city.
3. Control the monster and destroy buildings.
4. Switch to the defense force.
5. Pilot a fighter jet into the combat zone.
6. Attack the monster and exploit its weaknesses.
7. Review the destruction and battle results.

The MVP should prioritize responsiveness, visual feedback, and gameplay enjoyment over realism.

---

## 7. Target Audience

Kaiju Lab aims to appeal to several overlapping player communities:

**Kaiju and Tokusatsu Fans**

Players who enjoy giant monsters, Japanese special-effects fiction, and large-scale battles.

**Sandbox and Simulation Players**

Players who enjoy experimentation, emergent gameplay, and destructible environments.

**Creature Creation Fans**

Players who enjoy designing, customizing, and evolving unique creatures.

**Military Action Players**

Players interested in fighter jets, armored vehicles, targeting systems, and battles against unconventional enemies.

**Content Creators**

Players who enjoy producing entertaining scenarios, unusual creature designs, and large-scale destruction videos.

The game's potential for user-generated monsters and scenarios could provide strong opportunities for organic community engagement.

---

## 8. Commercial Strategy

**Primary Platform:** Steam (Windows PC)

**Business Model:** Premium single-player game

**Potential Initial Price:** US$19.99, subject to market testing

**Potential Distribution Channels:**
- Steam
- itch.io for early prototypes
- Official project website

The initial marketing strategy should emphasize visually distinctive gameplay moments:

- Creating bizarre giant monsters
- Deploying monsters into recognizable cities
- Destroying skyscrapers with energy beams
- Piloting fighter jets against giant creatures
- Discovering and exploiting monster weaknesses
- Creating unusual hybrid monsters

The game's strongest potential marketing message is:

**"Create a monster. Unleash it on a city. Then become the pilot sent to stop it."**

---

## 9. Key Development Risks

### Scope and Complexity

Combining creature creation, city generation, destruction physics, and military combat introduces significant engineering complexity.

The project should prioritize a playable vertical slice before expanding into advanced systems.

### Performance

Large urban environments, complex monsters, AI units, and physical destruction can be computationally expensive.

Optimization will require instancing, level-of-detail systems, selective physics activation, and efficient scene management.

### Modular Animation

Supporting interchangeable body parts creates challenges for skeletal animation, inverse kinematics, and collision detection.

The initial creature creator should use standardized skeletons and compatible body-part slots.

### Geographic Data Quality

OpenStreetMap data varies by location.

Building heights, geometry, and road information may be incomplete.

The city generator must support fallback rules and procedural estimation.

### Licensing

Geographic data, third-party assets, and software dependencies must be used in accordance with their respective licenses.

The project should use original creature designs and avoid directly reproducing protected characters or distinctive designs from existing franchises.

### Solo Development

The full vision is too broad to implement simultaneously as a small independent project.

The development process should use incremental milestones, automated tests, reusable systems, and AI-assisted coding.

---

## 10. Long-Term Vision

The ultimate goal of Kaiju Lab is to become a flexible giant-monster sandbox where players can create, experiment, destroy, defend, and share.

Players should eventually be able to:

- Design highly customized giant monsters.
- Fuse monsters to create new species.
- Deploy monsters into procedurally generated real-world-inspired cities.
- Experience large-scale urban destruction.
- Fight against AI-controlled monsters.
- Pilot fighter jets and other military vehicles.
- Command coordinated defense operations.
- Create custom invasion scenarios.
- Share monsters and scenarios with other players.

The long-term ambition is not simply to create another monster destruction game.

It is to build a **giant-monster simulation platform** where players can experience both sides of a kaiju disaster.

---

## 11. Project Identity

**Working Title:** KAIJU LAB

**Tagline:** Create. Destroy. Defend.

**Elevator Pitch:**

Kaiju Lab is a 3D sandbox game where players design and fuse giant monsters, unleash them upon destructible cities generated from real-world geographic data, and fight back as humanity's defense force. From devastating skyscrapers with supernatural abilities to piloting fighter jets against your own creations, Kaiju Lab lets players experience every side of a giant-monster disaster.

**Unique Selling Proposition:**

*The monster you create becomes the enemy you must defeat.*
