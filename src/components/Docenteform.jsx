import { useState } from 'react';

const UFS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
  'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

const maskCpf = (v) =>
  v.replace(/\D/g, '').slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

const maskTelefone = (v) =>
  v.replace(/\D/g, '').slice(0, 11)
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');

const maskCep = (v) =>
  v.replace(/\D/g, '').slice(0, 8)
    .replace(/(\d{5})(\d)/, '$1-$2');

// valida os dois dígitos verificadores do CPF
function cpfValido(valor) {
  const d = valor.replace(/\D/g, '');
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  for (let t = 9; t < 11; t++) {
    let soma = 0;
    for (let i = 0; i < t; i++) soma += Number(d[i]) * (t + 1 - i);
    if (((soma * 10) % 11) % 10 !== Number(d[t])) return false;
  }
  return true;
}

function DocenteForm({ docenteToEdit, onSave }) {
  // Dados pessoais
  const [nome, setNome] = useState(docenteToEdit ? docenteToEdit.nome : '');
  const [cpf, setCpf] = useState(docenteToEdit ? docenteToEdit.cpf : '');
  const [formacao, setFormacao] = useState(docenteToEdit ? docenteToEdit.formacao : '');
  // Contatos
  const [emailInstitucional, setEmailInstitucional] = useState(docenteToEdit ? docenteToEdit.emailInstitucional : '');
  const [emailParticular, setEmailParticular] = useState(docenteToEdit ? docenteToEdit.emailParticular : '');
  const [celular, setCelular] = useState(docenteToEdit ? docenteToEdit.celular : '');
  // Endereço
  const [endereco, setEndereco] = useState(docenteToEdit ? docenteToEdit.endereco : '');
  const [numero, setNumero] = useState(docenteToEdit ? docenteToEdit.numero : '');
  const [cidade, setCidade] = useState(docenteToEdit ? docenteToEdit.cidade : '');
  const [cep, setCep] = useState(docenteToEdit ? docenteToEdit.cep : '');
  const [uf, setUf] = useState(docenteToEdit ? docenteToEdit.uf : '');

  const [erros, setErros] = useState({});

  const validar = () => {
    const novosErros = {};

    if (nome.trim().length < 3) novosErros.nome = 'O nome deve ter no mínimo 3 caracteres.';
    if (!cpfValido(cpf)) novosErros.cpf = 'Informe um CPF válido.';
    if (!formacao.trim()) novosErros.formacao = 'Informe a formação/área de atuação.';

    if (!emailInstitucional.includes('@')) novosErros.emailInstitucional = 'O e-mail institucional deve conter "@".';
    if (emailParticular && !emailParticular.includes('@')) novosErros.emailParticular = 'O e-mail particular deve conter "@".';
    if (celular.length < 15) novosErros.celular = 'Informe o celular completo.';

    if (!endereco.trim()) novosErros.endereco = 'Informe o endereço.';
    if (!numero.trim()) novosErros.numero = 'Informe o número.';
    if (!cidade.trim()) novosErros.cidade = 'Informe a cidade.';
    if (cep.length < 9) novosErros.cep = 'Informe o CEP completo.';
    if (!uf) novosErros.uf = 'Escolha um estado.';

    return novosErros;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novosErros = validar();
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    onSave({
      nome, cpf, formacao,
      emailInstitucional, emailParticular, celular,
      endereco, numero, cidade, cep, uf,
    });
  };

  return (
    <div className="form-container">
      <h2>{docenteToEdit ? 'Alterar Docente' : 'Cadastrar Novo Docente'}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend>Dados Pessoais</legend>

          <div className="form-group">
            <label>Nome Completo</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
            {erros.nome && <span className="erro">{erros.nome}</span>}
          </div>

          <div className="form-group">
            <label>CPF</label>
            <input type="text" placeholder="000.000.000-00" value={cpf} onChange={(e) => setCpf(maskCpf(e.target.value))} />
            {erros.cpf && <span className="erro">{erros.cpf}</span>}
          </div>

          <div className="form-group">
            <label>Formação/Área de Atuação</label>
            <input type="text" value={formacao} onChange={(e) => setFormacao(e.target.value)} />
            {erros.formacao && <span className="erro">{erros.formacao}</span>}
          </div>
        </fieldset>

        <fieldset>
          <legend>Contatos</legend>

          <div className="form-group">
            <label>Email Institucional</label>
            <input type="email" value={emailInstitucional} onChange={(e) => setEmailInstitucional(e.target.value)} />
            {erros.emailInstitucional && <span className="erro">{erros.emailInstitucional}</span>}
          </div>

          <div className="form-group">
            <label>Email Particular (opcional)</label>
            <input type="email" value={emailParticular} onChange={(e) => setEmailParticular(e.target.value)} />
            {erros.emailParticular && <span className="erro">{erros.emailParticular}</span>}
          </div>

          <div className="form-group">
            <label>Telefone Celular</label>
            <input type="tel" placeholder="(00) 00000-0000" value={celular} onChange={(e) => setCelular(maskTelefone(e.target.value))} />
            {erros.celular && <span className="erro">{erros.celular}</span>}
          </div>
        </fieldset>

        <fieldset>
          <legend>Endereço</legend>

          <div className="form-group">
            <label>Endereço Residencial</label>
            <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
            {erros.endereco && <span className="erro">{erros.endereco}</span>}
          </div>

          <div className="form-group">
            <label>Número</label>
            <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} />
            {erros.numero && <span className="erro">{erros.numero}</span>}
          </div>

          <div className="form-group">
            <label>Cidade</label>
            <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />
            {erros.cidade && <span className="erro">{erros.cidade}</span>}
          </div>

          <div className="form-group">
            <label>CEP</label>
            <input type="text" placeholder="00000-000" value={cep} onChange={(e) => setCep(maskCep(e.target.value))} />
            {erros.cep && <span className="erro">{erros.cep}</span>}
          </div>

          <div className="form-group">
            <label>UF (Estado)</label>
            <select value={uf} onChange={(e) => setUf(e.target.value)}>
              <option value="">Selecione</option>
              {UFS.map((sigla) => (
                <option key={sigla} value={sigla}>{sigla}</option>
              ))}
            </select>
            {erros.uf && <span className="erro">{erros.uf}</span>}
          </div>
        </fieldset>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default DocenteForm;