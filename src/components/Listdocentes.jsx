function ListDocentes({ docentes, onEdit, onDelete }) {
  return (
    <ul className="docente-list">
      {docentes.map((docente) => (
        <li key={docente.id} className="docente-item">
          <div className="docente-info">
            <span className="docente-nome">{docente.nome}</span>
            <span className="docente-formacao">{docente.formacao}</span>
            <span className="docente-email">{docente.emailInstitucional}</span>
          </div>
          <div className="docente-actions">
            <button className="edit-btn" onClick={() => onEdit(docente)}>Alterar</button>
            <button className="delete-btn" onClick={() => onDelete(docente.id)}>Remover</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ListDocentes;