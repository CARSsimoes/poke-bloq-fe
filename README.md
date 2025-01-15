## Development Setup

To run this app locally for development, follow these steps:

### Prerequisites

Ensure that you have the following installed on your machine:

- **Node.js** (version 18 or later)

## install dependencies

```sh
npm install
```

### run app

```sh
npm run dev

For mobile testing purposes use the Network: url provided

```

## Overview

Web application that allows users to explore a collection of Pokemon.

### Key Features:

- **Pokedex**: View a list of all available Pokemon
- **Lazy Loading**: Pokemon data is lazily loaded to optimize performance and reduce initial loading time.
- **My Pokemons**: Manage a collection of caught Pokemon.
- **Filter and Sort**: Filter and sort Pokemon by attributes such as name, height, types, etc.
- **Click to Catch/Uncatch**: Users can catch or uncatch Pokemon with a simple click (pokeball image)
- **Double Click to Select**: Double-clicking on a Pokemon will select it for further interaction
- **Download CSV**: Users can download their caught Pokemon data in CSV format for further use (all pokemons caught).
- **Clipboard Share**: Users can share Pokemon information via the clipboard using 🔗 (only available at My Pokemons view)
- **Responsive Design**: App allow select between card or table layout

## Interaction with the User

### Views

1. **Pokédex View** (`/`):

   - Displays all available Pokemon.
   - Pokemon are lazily loaded to improve performance.
   - Users can see when pokemon was first caught.

2. **My Pokemon View** (`/my-pokemons`):

   - Shows a collection of Pokemon that the user has caught.
   - Users can see details about their caught Pokemon.
   - Users can filter Pokemon by name, type, and other attributes.

3. **Layouts**:
   - The app allows users to switch between **List** and **Table** views for better interaction and visualization.

## Stack

Vue 3, Pinia, Vue Router, Vitest, Sass and Axios
