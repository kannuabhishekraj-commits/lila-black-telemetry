# Level Design Insights: LILA BLACK Telemetry

## Insight 1: The "Loot Oasis" Bottleneck (Grand Rift)
* **Observation:** There is a severe imbalance between looting and survival in the center of the map, creating an unintended "meat grinder" effect early in the match.
* **Evidence:** When filtering by the "Grand Rift" map, there is a massive cluster of Loot events (gold dots) perfectly overlapping with a dense cluster of Kill/Death events (red dots) right in the center coordinates. The outer edges of the map show almost no activity.
* **Actionable Item:** Disperse high-tier loot spawn nodes to the perimeter structures rather than concentrating them entirely in the middle. 
* **Target Metric:** Increase the "Average Player Survival Time" in the first 3 minutes of the match, and increase the percentage of the map's total square footage utilized by players.
* **Value to Level Designer:** Level designers need to balance risk versus reward. If the center is too rewarding, players will ignore 80% of the carefully designed map, leading to repetitive gameplay loops and early match frustration.

## Insight 2: Choke Point Traps and Storm Fatalities (Lockdown)
* **Observation:** The map geometry is punishing players who attempt late-match extractions, resulting in a disproportionate amount of environmental deaths rather than PvP combat.
* **Evidence:** On the "Lockdown" map, timeline playback reveals a high concentration of "Storm Death" markers clustered exclusively around the southern extraction routes. Players are moving toward the exit but getting caught behind terrain or buildings.
* **Actionable Item:** Widen the southern pathways or add a piece of vertical mobility (like a zipline or vaultable wall) to bypass the main choke point. Alternatively, add a dynamic extraction point in the northeast.
* **Target Metric:** Decrease the PvE (Storm) death rate by 15%, increasing the overall successful player extraction rate to boost player retention and satisfaction.
* **Value to Level Designer:** Dying to another player feels like a fair loss; dying because you got stuck on a wall while running from the storm feels unfair. Identifying these geometric traps helps smooth out the map's flow.

## Insight 3: Bot Pathing and Pacing "Dead Zones" (Ambrose Valley)
* **Observation:** AI Bots are operating on overly restrictive patrol loops, leaving massive areas of the map feeling completely empty and devoid of action.
* **Evidence:** Filtering specifically for "Bot" activity on "Ambrose Valley" reveals strict, rigid geometric lines of movement in the northern sectors, while the entire western woods area has absolute zero bot presence. 
* **Actionable Item:** Expand the navigation mesh (navmesh) and add dynamic patrol nodes for bots into the western woods, allowing them to roam further from their spawn points.
* **Target Metric:** Increase "Time in Combat" and "Actions Per Minute (APM)" for players who choose to take the western flanking routes.
* **Value to Level Designer:** Pacing is critical in extraction shooters. If a player walks through the western woods for 5 minutes without seeing a single enemy (human or AI), they will get bored. Expanding bot territories ensures the map feels "alive" everywhere.