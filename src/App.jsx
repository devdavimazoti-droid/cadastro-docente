import { useState } from 'react';
import Login from './components/Login';
import Menu from './components/Menu';
import Welcome from './components/Welcome';
import DocenteForm from './components/DocenteForm';
import ListDocentes from './components/ListDocentes';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeScreen, setActiveScreen] = useState('welcome');
  const [docentes, setDocentes] = useState([
    {
      id: 1,
      nome: 'Ana Paula Lima',
      cpf: '529.982.247-25',
      formacao: 'Engenharia de Software',
      emailInstitucional: 'ana.lima@escola.edu.br',
      emailParticular: '',
      celular: '(16) 98888-1111',
      endereco: 'Rua das Flores',
      numero: '120',
      cidade: 'São Carlos',
      cep: '13560-000',
      uf: 'SP',
    },
    {
      id: 2,
      nome: 'Carlos Eduardo Souza',
      cpf: '111.444.777-35',
      formacao: 'Redes de Computadores',
      emailInstitucional: 'carlos.souza@escola.edu.br',
      emailParticular: 'carlos@email.com',
      celular: '(16) 97777-2222',
      endereco: 'Av. Brasil',
      numero: '455',
      cidade: 'Araraquara',
      cep: '14800-000',
      uf: 'SP',
    },
  ]);
  const [docenteToEdit, setDocenteToEdit] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleNavigate = (screen) => {
    setDocenteToEdit(null);
    setActiveScreen(screen);
  };

  const showCreateForm = () => {
    setDocenteToEdit(null);
    setActiveScreen('form');
  };

  const startEdit = (docente) => {
    setDocenteToEdit(docente);
    setActiveScreen('form');
  };

  // Create (sem docenteToEdit) ou Update (com docenteToEdit)
  const handleSaveDocente = (dados) => {
    if (docenteToEdit) {
      setDocentes(
        docentes.map((d) =>
          d.id === docenteToEdit.id ? { ...dados, id: docenteToEdit.id } : d
        )
      );
    } else {
      setDocentes([...docentes, { ...dados, id: Date.now() }]);
    }
    setDocenteToEdit(null);
    setActiveScreen('list');
  };

  const handleDeleteDocente = (id) => {
    setDocentes(docentes.filter((d) => d.id !== id));
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <Menu onNavigate={handleNavigate} onCreate={showCreateForm} />
      <main className="content">
        {activeScreen === 'welcome' && <Welcome />}
        {activeScreen === 'list' && (
          <ListDocentes
            docentes={docentes}
            onEdit={startEdit}
            onDelete={handleDeleteDocente}
          />
        )}
        {activeScreen === 'form' && (
          <DocenteForm
            key={docenteToEdit ? docenteToEdit.id : 'novo'}
            docenteToEdit={docenteToEdit}
            onSave={handleSaveDocente}
          />
        )}
      </main>
    </div>
  );
}

export default App;