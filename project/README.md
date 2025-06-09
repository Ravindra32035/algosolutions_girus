# Algorithmic Solutions Web Application
Link:  https://comfy-pastelito-30dcda.netlify.app/
A comprehensive web application showcasing advanced algorithmic problem solutions with beautiful visualizations and interactive problem solving. Built with React TypeScript frontend and Python Flask backend.

## 🚀 Features

### Problems Included

1. **Sudoku Validator with Custom Zones** - Validate 9x9 Sudoku boards including custom zone validation
2. **Alien Dictionary** - Determine character order from sorted alien language words
3. **Knights & Portals** - Find shortest path with optional teleportation
4. **Bitwise Matching Pattern** - Find next larger integer with same number of binary 1s
5. **Matrix Islands with Diagonals** - Count islands including diagonal connections
6. **Mini Interpreter** - Evaluate let declarations and if conditions

### Key Features

- ✨ Beautiful, production-ready UI with modern design
- 🎨 Interactive visualizations for each algorithm
- 🧪 Comprehensive test cases and validation
- 📱 Responsive design for all devices
- 🔄 Real-time algorithm execution
- 📊 Detailed results and explanations

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for development and building

### Backend
- **Python Flask** for API server
- **Flask-CORS** for cross-origin requests
- **Pytest** for testing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd algorithmic-solutions-app
```

### 2. Frontend Setup
```bash
# Install frontend dependencies
npm install

# Start the frontend development server
npm run dev
```

### 3. Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start the Flask backend server
python app.py
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🧪 Running Tests

### Backend Tests
```bash
# Run all algorithm tests
python -m pytest tests/ -v

# Run specific test file
python -m pytest tests/test_algorithms.py -v
```

### Frontend Tests
```bash
# Run frontend linting
npm run lint
```

## 📁 Project Structure

```
algorithmic-solutions-app/
├── algorithms/                 # Python algorithm implementations
│   ├── __init__.py
│   ├── sudoku_validator.py
│   ├── alien_dictionary.py
│   ├── knights_portals.py
│   ├── bitwise_matching.py
│   ├── matrix_islands.py
│   └── mini_interpreter.py
├── src/                       # React frontend source
│   ├── components/           # React components
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   ├── ProblemSolver.tsx
│   │   └── solvers/         # Individual problem solvers
│   ├── App.tsx
│   └── main.tsx
├── tests/                    # Test files
│   └── test_algorithms.py
├── app.py                   # Flask backend server
├── requirements.txt         # Python dependencies
├── package.json            # Node.js dependencies
└── README.md
```

## 🔧 API Endpoints

All endpoints accept POST requests with JSON payloads:

- `POST /api/sudoku/validate` - Validate Sudoku board
- `POST /api/alien-dictionary` - Find alien character order
- `POST /api/knights-portals` - Find shortest path with teleportation
- `POST /api/bitwise-matching` - Find next larger number with same 1s
- `POST /api/matrix-islands` - Count islands with diagonal connections
- `POST /api/mini-interpreter` - Evaluate mini language code
- `GET /api/health` - Health check endpoint

## 🎯 Algorithm Details

### 1. Sudoku Validator
- Validates standard 9x9 Sudoku rules
- Supports custom zone validation
- Comprehensive error reporting

### 2. Alien Dictionary
- Uses topological sorting
- Detects invalid word sequences
- Provides detailed explanation

### 3. Knights & Portals
- Implements Dijkstra's algorithm
- Supports one-time teleportation
- Visual path representation

### 4. Bitwise Matching
- Bit manipulation algorithm
- Finds next larger number with same 1-count
- Step-by-step explanation

### 5. Matrix Islands
- DFS with 8-directional connectivity
- Includes diagonal connections
- Visual island mapping

### 6. Mini Interpreter
- Supports let declarations and if conditions
- Variable tracking and execution steps
- Boolean and arithmetic operations

## 🎨 Design Features

- **Apple-level design aesthetics** with attention to detail
- **Responsive design** for mobile, tablet, and desktop
- **Consistent color system** with 6 color ramps
- **Smooth animations** and micro-interactions
- **8px spacing system** for visual consistency
- **Accessible** with proper contrast ratios

## 🚀 Production Deployment

### Build for Production
```bash
# Build frontend
npm run build

# Preview production build
npm run preview
```

### Environment Variables
Create a `.env` file for production configuration:
```env
FLASK_ENV=production
FLASK_DEBUG=False
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Algorithm implementations based on classic computer science problems
- UI inspired by modern design systems
- Built with modern web development best practices

---

**Note**: Make sure both frontend and backend servers are running for full functionality. The frontend expects the Flask API to be available at `http://localhost:5000`.
