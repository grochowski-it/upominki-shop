# Design System Document

## 1. Overview & Creative North Star: "The Neon Industrialist"

This design system is a definitive departure from the generic, safe world of e-commerce. It is built for **UPOMINKI.SHOP** to reflect a brand that blends industrial precision with high-fashion energy. The "Creative North Star" is **The Neon Industrialist**—a philosophy that treats every personalized product not as a commodity, but as a high-contrast artifact.

The system breaks the "template" look by leaning into **Aggressive Brutalism** and **Tonal Depth**. We replace traditional thin lines and light backgrounds with a deep, obsidian foundation and vibrant, functional accents. By utilizing sharp corners (0px radius) and intentional asymmetry, the interface feels engineered rather than merely "designed." This is a high-stakes visual language that demands attention through scale and starkness.

---

## 2. Colors

The palette is a dualistic study in extreme contrast. It uses a deep black base to allow the vibrant lime-green tokens to "vibrate" on screen, creating an immediate sense of modernity and professional urgency.

### Palette Tokens
*   **Primary:** `#e4f265` (Vibrant Lime) - Used for primary actions and brand presence.
*   **Secondary:** `#fae44c` (Electric Yellow) - Used for highlights and subtle differentiation in product categories.
*   **Surface:** `#0e0e0e` (Obsidian) - The master background.
*   **Surface-Container-Highest:** `#262626` - Used for elevated interactive components.
*   **On-Surface-Variant:** `#ababab` - Used for secondary text to maintain a sophisticated hierarchy.

### Design Rules
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. To separate content, use background shifts. A section using `surface-container-low` should sit directly against the `surface` background to define its boundary.
*   **Surface Hierarchy:** Depth is created through "Nesting." Place a `surface-container-highest` card inside a `surface-container-low` section to create a physical sense of layering without using a single line.
*   **The Glass & Gradient Rule:** For hero sections or high-end product features, use a subtle linear gradient from `primary` to `primary-container`. For floating navigation or modal overlays, use `surface` at 80% opacity with a `20px backdrop-blur` to achieve a "Frosted Industrial" effect.

---

## 3. Typography

Typography is the backbone of the "Editorial" feel. We use a combination of a high-character display font and a highly legible, technical sans-serif.

*   **Display & Headlines (Space Grotesk):** This font provides the industrial, slightly "tech" feel. Use `display-lg` (3.5rem) for hero statements and `headline-lg` (2rem) for section titles. The wide apertures and geometric shapes mirror the precision of engraving.
*   **Body & Labels (Inter):** For transactional information, product descriptions, and labels, Inter provides maximum legibility at high contrast. 
*   **Hierarchy Note:** Always lead with size and weight. A `display-lg` headline should be so dominant that it requires no other visual cues to signal its importance.

---

## 4. Elevation & Depth

We reject the "Material" drop shadow in favor of **Tonal Layering**.

*   **The Layering Principle:** Hierarchy is achieved by stacking surface tokens. Higher-importance items move from `surface-dim` toward `surface-bright`.
*   **Ambient Shadows:** If a floating element (like a "Quick Buy" button) requires a shadow, it must be an "Ambient Bloom." Use a shadow color tinted with the `primary` lime green at 5% opacity with a massive 40px blur. This creates a neon glow rather than a muddy shadow.
*   **The "Ghost Border" Fallback:** In dense product grids where separation is critical, use a "Ghost Border": the `outline-variant` token at 15% opacity. It should be felt, not seen.
*   **Zero-Radius Policy:** In alignment with the provided brand assets, all containers, buttons, and inputs must use a **0px border-radius**. Sharp corners convey professional precision and a premium, custom-made feel.

---

## 5. Components

### Buttons
*   **Primary:** Background: `primary` (#e4f265); Text: `on-primary` (#525a00). Hard edges (0px radius).
*   **Secondary:** Background: `surface-container-highest`; Text: `primary`. This variant is used for less critical actions.
*   **Interaction:** On hover, primary buttons should transition to `primary_dim`. Secondary buttons should gain a 100% opaque `outline`.

### Cards & Product Grids
*   **The Product Card:** Forbid divider lines. Use a `surface-container-low` background for the image area and a `surface-container-highest` background for the metadata (Price/Title). 
*   **Asymmetric Grids:** Instead of a standard 4x4 grid, occasionally break the pattern by making a featured product span two columns, using a `display-md` headline to interrupt the flow.

### Input Fields
*   **Obsidian Inputs:** Background: `surface-container-lowest`. Bottom border only, using `primary` at 40% opacity. When focused, the bottom border becomes `primary` at 100% opacity with a subtle neon glow.

### Chips & Tags
*   **Selection Chips:** Use `surface-container-high` with `label-md` typography. Selected state swaps background to `primary` and text to `on-primary`.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use massive amounts of negative space. The high contrast of lime-on-black needs room to breathe to avoid looking "cheap."
*   **Do** lean into the "Editorial" scale. Don't be afraid of a 60px headline next to 14px body text.
*   **Do** use the `primary` color as a functional tool—only for things that are clickable or critical brand identifiers.

### Don't:
*   **Don't** use rounded corners. Everything must be 0px to maintain the "Engraved" aesthetic.
*   **Don't** use standard grey shadows. They will look "dirty" against the pure black `surface`.
*   **Don't** use 1px solid white borders. They create visual noise that distracts from the vibrant lime-green accents.