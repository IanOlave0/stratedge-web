import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cotizador from './pages/Cotizador';

/**
 * Componente App con Sistema de Rutas
 * * Envolvemos la app en <Router> para habilitar la navegación.
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 flex flex-col font-sans antialiased text-slate-200">
        
        {/* El menú se queda fijo en todas las páginas */}
        <Navbar />

        <main className="flex-grow">
          {/* El sistema de rutas decide qué página renderizar aquí en medio */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cotizar" element={<Cotizador />} />
          </Routes>
        </main>

        {/* El pie de página se queda fijo abajo */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;