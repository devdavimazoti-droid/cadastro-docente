function Menu({ onNavigate, onCreate }) {
  return (
    <nav className="menu">
      <button onClick={() => onNavigate('welcome')}>Início</button>
      <button onClick={onCreate}>Cadastrar</button>
      <button onClick={() => onNavigate('list')}>Listar</button>
    </nav>
  );
}

export default Menu;