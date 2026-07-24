1. Objective

The Home hero uses a procedurally generated visual composition.

Every scene is built from:

a generated grid;
a curated palette;
one primary animation system;
zero to two supporting systems;
a validated hero-content placement;
deterministic parameters generated from a seed.

The system must create variety without visual chaos.

2. What procedural means

Procedural generation does not mean unrestricted randomness.

The website must not place arbitrary elements at random pixel positions.

Instead, generation chooses between:

predefined grid ranges;
predefined palette collections;
predefined visual-system families;
bounded parameter ranges;
predefined content-placement strategies;
explicit density limits;
explicit overlap rules;
responsive constraints.

Each scene configuration must be reproducible from its seed.

3. Scene lifecycle

Default lifecycle:

mount or reveal scene;
keep the scene active for 16 seconds;
cut to the interstitial;
show [ badretded ];
keep the interstitial active for 1 second;
reveal the next generated scene;
repeat.

The next scene configuration may be prepared before or during the interstitial.

The visible scene must not pause while expensive configuration work is running.

4. Initial scene

The first server-rendered scene must use a stable predefined seed.

Suggested initial seed:

416

Do not generate the initial server HTML from unrestricted runtime randomness.

The initial server and client render must match.

After hydration, create a session seed for future scenes.

5. Random utility

Use a single seeded pseudo-random-number generator.

The generator should support operations such as:

number between bounds;
integer between bounds;
boolean with probability;
selection from a list;
weighted selection;
deterministic shuffle.

Do not call Math.random() inside visual-system components.

Do not generate values directly during every React render.

Generate one scene configuration object and pass it into renderers.

6. Grid generation

Each scene uses a responsive grid.

Suggested starting bounds:

Mobile
columns: 4–6;
rows: 6–10;
low visual density;
one primary system;
maximum one supporting system.
Tablet
columns: 6–9;
rows: 6–10;
moderate density;
one primary system;
zero to two supporting systems.
Desktop
columns: 8–14;
rows: 6–12;
moderate density;
one primary system;
zero to two supporting systems.
Wide desktop
columns: 10–16;
rows: 7–12;
composition may use additional negative space;
do not increase density merely because more screen area exists.

A generated grid configuration may include:

column count;
row count;
gap size;
outer padding;
selected occupied regions;
reserved empty regions;
hero-content region;
visual-system regions;
cropping behavior. 7. Safe areas

Every scene must reserve:

header safe area;
viewport edge padding;
hero-title region;
hero-description region;
minimum readable empty area around text.

Visual systems must not make the navigation unreadable.

Hero text must not overlap high-density animated regions.

Supporting systems may pass behind text only when contrast and readability are guaranteed.

8. Hero placement strategies

Choose hero placement from a finite registry of validated strategies.

Initial registry:

upper-left;
middle-left;
lower-left;
center-narrow;
middle-right;
lower-wide;
split-left;
split-right.

Every strategy defines:

title grid area;
description grid area;
text alignment;
maximum width;
safe margins;
mobile fallback.

Do not generate raw arbitrary coordinates for hero content.

A placement remains fixed for the duration of its scene.

9. Scene-family registry

Create multiple distinct visual-system families.

The initial implementation should contain approximately 5–8 families.

Suggested families follow.

9.1 Line field

A structured field of horizontal, vertical, or diagonal lines.

Parameters may include:

orientation;
line count;
line thickness;
spacing;
movement direction;
movement speed;
selected missing regions;
clipping region.

Avoid turning it into a generic full-screen striped background.

9.2 Modular blocks

Rectangular modules occupying selected grid cells.

Parameters may include:

occupied cells;
module size;
fill or outline mode;
movement axis;
stagger;
opacity;
edge cropping.

Modules should behave as one system, not independent random cards.

9.3 Orbital points

A limited number of points or small shapes moving around generated centers.

Parameters may include:

orbit center;
orbit radius;
point count;
angular speed;
direction;
elliptical distortion;
visible path state.

Keep point count restrained.

Do not create a generic particle field.

9.4 Scanner bands

One or more controlled bands moving across selected grid regions.

Parameters may include:

horizontal or vertical orientation;
band thickness;
speed;
pause interval;
mask;
trailing lines;
affected grid regions.

Avoid global fake CRT effects.

9.5 Wave lattice

A grid-aligned wave or displacement field.

Parameters may include:

wavelength;
amplitude;
direction;
number of paths;
phase;
clipping region;
line density.

Keep motion smooth and readable.

9.6 Pulse cells

Selected grid cells change opacity, fill, scale, or border state according to a generated rhythm.

Parameters may include:

active cells;
pulse sequence;
delay;
duration;
state count;
grouping.

The rhythm should feel designed rather than fully random.

9.7 Sliding frames

Large outlined or filled rectangular frames move through the generated grid.

Parameters may include:

frame count;
size;
axis;
offset;
speed;
clipping;
nesting.

Do not make them resemble UI cards.

9.8 Noise or grain layer

A subtle supporting texture.

It may be:

CSS-based;
SVG-based;
based on a small generated texture;
a lightweight canvas layer if justified.

It must remain subtle.

It must not be the primary scene family.

10. Primary and supporting systems

Each scene contains:

exactly one primary system;
zero to two supporting systems.

Supporting systems must have lower visual weight.

Avoid combinations that compete for attention.

Create an explicit compatibility table or rules.

Examples:

line field + subtle grain: allowed;
modular blocks + scanner band: allowed;
orbital points + subtle grid lines: allowed;
pulse cells + subtle grain: allowed;
wave lattice + orbital points: usually disallowed;
three high-density moving systems: disallowed. 11. Scene configuration

A scene configuration should contain data similar to:

scene ID;
seed;
scene-family ID;
generated palette;
grid configuration;
content-placement ID;
primary-system parameters;
supporting-system parameters;
animation intensity;
reduced-motion representation.

The configuration must remain stable for the lifetime of the scene.

12. Ordering without repetition

Use a shuffled-bag system.

Algorithm:

create a list of all scene-family IDs;
shuffle the list using the seeded random utility;
select families sequentially;
when the list is exhausted, create and shuffle a new list;
compare the new first family with the previously shown family;
if they match, swap it with another item.

This guarantees that every registered family appears before the bag repeats.

Parameters and grid layouts may still vary each time a family returns.

13. Transition

The transition is a one-second editorial interstitial.

Required content:

[ badretded ]

Suggested background:

#11110f

The interstitial should:

cover the procedural hero;
remove the previous scene completely;
display centered compact text;
last exactly one second;
reveal a fully prepared next scene.

Do not show both scenes blended together for a long period.

Do not make the transition resemble a loading state.

14. Timing ownership

Use one explicit scene-cycle controller.

Do not spread multiple unrelated timers across components.

The controller should handle:

active scene;
next scene;
scene duration;
interstitial state;
pause state;
tab visibility;
hero viewport visibility;
reduced-motion preference.

Clean up all timers and listeners on unmount.

15. Visibility behavior

Pause scene timing and expensive animation when:

document.hidden is true;
the hero is far outside the viewport.

When the user returns:

continue from a sensible state;
do not instantly skip through multiple unseen scenes;
do not queue delayed transitions. 16. Reduced motion

When reduced motion is requested:

generate one stable composition;
stop automatic scene cycling;
disable continuous primitive movement;
preserve grid, palette, and visual identity;
keep navigation and content fully functional. 17. Performance constraints

Prefer:

CSS transforms;
opacity;
SVG;
lightweight DOM structures;
small canvas use only when justified.

Avoid:

WebGL;
expensive full-screen blur;
animating layout properties every frame;
thousands of DOM nodes;
uncontrolled particle counts;
large video assets;
rerendering the entire application every animation frame.

Use requestAnimationFrame only for systems that truly require it.

GSAP timelines and animation contexts must be cleaned up.

18. Testing

The procedural system should be testable independently.

At minimum test:

deterministic generation from a seed;
valid grid bounds;
valid content placement;
no immediate scene-family repetition;
shuffled-bag exhaustion and reset;
reduced-motion state;
timer cleanup;
stable initial scene;
localization-independent scene behavior.
