# Football Squad Depth Chart

An interactive web application for creating and managing football squad depth charts with salary budget tracking.

![Football Squad Depth Chart](https://via.placeholder.com/800x400?text=Squad+Depth+Chart)

## Features

- Visual representation of football squad on a pitch layout
- Support for 4-3-3 formation (expandable to other formations)
- Up to 3 players can be stacked in each position 
- Player management with name and weekly wage attributes
- Budget calculation showing total yearly wage bill and remaining budget
- Players are loaded from a simple CSV file for easy editing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/squaddepth.git
cd squaddepth
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to http://localhost:3000

## Usage

### Adding Players

1. Click the "Add Player" button for the position where you want to add a player
2. Enter the player's name and weekly wage
3. Click "Add Player" to confirm

### Editing Players

1. Click the edit (pencil) icon on any player card
2. Update the player information
3. Click "Update Player" to save changes

### Removing Players

Click the remove (x) icon on any player card to remove that player from the squad.

### Initializing with Predefined Players

To pre-populate the app with a set of players, edit the `public/initialPlayers.csv` file. The file should follow this format:

```csv
position,name,wage
GK,Alisson,150000
GK,Kelleher,40000
...
```

## Customization

### Modifying Formations

The formation is defined in `src/data/formations.ts`. You can adjust player positions by changing the x and y coordinates.

### Styling

All components are styled using inline styles. You can customize the appearance by modifying the style objects in each component.

## Built With

- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool and development server

## License

This project is licensed under the ISC License.

## Acknowledgments

- Football pitch SVG inspired by various open-source football visualization tools
- Player management concepts based on common football manager applications