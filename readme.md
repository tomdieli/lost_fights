# Lost Fights

A real-time multiplayer fighting game built with Colyseus and PixiJS.

## Overview

Lost Fights is a multiplayer browser-based fighting game that uses:
- Colyseus for real-time multiplayer state synchronization
- PixiJS for 2D graphics rendering
- Node.js for the game server

## Features

- Real-time multiplayer synchronization
- Player movement and actions (walk, stand, block)
- State management using Colyseus schema system
- Sprite-based animations
- Basic combat mechanics

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/tomdieli/lost_fights.git

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Development

- Server runs on port 2567
- Client development server runs on port 5173
- Tests can be run with `npm test`

## Technology Stack

- **Server**: Node.js, Colyseus, Express
- **Client**: PixiJS, Colyseus.js
- **Testing**: Jest