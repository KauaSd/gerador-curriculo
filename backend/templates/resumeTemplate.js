export const getResumeHtml = (data) => {
  const { dadosPessoais = {}, objetivo, formacoes, experiencias, habilidades } = data;

  const contactHtml = [
    dadosPessoais.email ? `<div>✉️ ${dadosPessoais.email}</div>` : '',
    dadosPessoais.telefone ? `<div>📱 ${dadosPessoais.telefone}</div>` : '',
    dadosPessoais.cidade ? `<div>📍 ${dadosPessoais.cidade}${dadosPessoais.estado ? ` - ${dadosPessoais.estado}` : ''}</div>` : '',
    dadosPessoais.linkedin ? `<div>🔗 ${dadosPessoais.linkedin}</div>` : ''
  ].join('');

  const formacoesHtml = formacoes && formacoes.length > 0 
    ? formacoes.map(f => `
        <div class="item">
          <div class="item-header">
            <strong>${f.curso || ''}</strong>
            <span class="date">${f.inicio || ''} - ${f.fim || ''}</span>
          </div>
          <div class="item-sub">${f.instituicao || ''}</div>
        </div>
      `).join('')
    : '';

  const experienciasHtml = experiencias && experiencias.length > 0 
    ? experiencias.map(e => `
        <div class="item">
          <div class="item-header">
            <strong>${e.cargo || ''}</strong>
            <span class="date">${e.inicio || ''} - ${e.fim || 'Atual'}</span>
          </div>
          <div class="item-sub">${e.empresa || ''}</div>
          <div class="item-desc">${(e.descricao || '').replace(/\n/g, '<br/>')}</div>
        </div>
      `).join('')
    : '';

  const habilidadesHtml = habilidades && habilidades.length > 0
    ? `<div class="skills">${habilidades.map(h => `<span class="skill-tag">${h}</span>`).join('')}</div>`
    : '';

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Currículo</title>
      <style>
        :root {
          --primary: #1e3a8a;
          --secondary: #3b82f6;
          --text-dark: #1e293b;
          --text-light: #64748b;
          --bg-sidebar: #f8fafc;
        }
        * { box-sizing: border-box; }
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          color: var(--text-dark);
          line-height: 1.5;
          margin: 0;
          padding: 0;
        }
        .header {
          background-color: var(--primary);
          color: white;
          padding: 30px 40px;
          display: flex;
          align-items: center;
          gap: 30px;
        }
        .header .photo {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 3px solid rgba(255,255,255,0.2);
          object-fit: cover;
        }
        .header h1 {
          margin: 0;
          font-size: 36px;
          letter-spacing: 1px;
        }
        .header h2 {
          margin: 5px 0 0 0;
          font-size: 18px;
          font-weight: 400;
          color: #bfdbfe;
        }
        
        .container {
          display: flex;
          min-height: calc(100vh - 180px);
        }
        
        .sidebar {
          width: 32%;
          background-color: var(--bg-sidebar);
          padding: 30px;
          border-right: 1px solid #e2e8f0;
        }
        
        .main-content {
          width: 68%;
          padding: 30px 40px;
        }
        
        .section-title {
          font-size: 18px;
          color: var(--primary);
          text-transform: uppercase;
          font-weight: bold;
          border-bottom: 2px solid var(--secondary);
          padding-bottom: 5px;
          margin-bottom: 15px;
          margin-top: 0;
        }
        
        .contact-list div {
          margin-bottom: 10px;
          font-size: 14px;
          word-break: break-all;
        }
        
        .item {
          margin-bottom: 20px;
        }
        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-size: 16px;
          color: var(--text-dark);
        }
        .item-header strong {
          color: var(--primary);
        }
        .date {
          font-size: 13px;
          color: var(--text-light);
          font-weight: bold;
        }
        .item-sub {
          font-weight: 500;
          color: var(--text-dark);
          margin-bottom: 5px;
        }
        .item-desc {
          font-size: 14px;
          color: #475569;
        }
        
        .skills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .skill-tag {
          background-color: #e2e8f0;
          color: var(--text-dark);
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 500;
        }
      </style>
    </head>
    <body>
      <div class="header">
        ${dadosPessoais.foto ? `<img src="${dadosPessoais.foto}" alt="Foto" class="photo" />` : ''}
        <div>
          <h1>${dadosPessoais.nome || 'Nome Completo'}</h1>
          <h2 style="display:none">Profissional</h2>
        </div>
      </div>
      
      <div class="container">
        <div class="sidebar">
          <div class="section-title" style="margin-top: 0;">Contato</div>
          <div class="contact-list">
            ${contactHtml}
          </div>
          
          ${habilidadesHtml ? `
            <div class="section-title" style="margin-top: 30px;">Habilidades</div>
            ${habilidadesHtml}
          ` : ''}
        </div>
        
        <div class="main-content">
          ${objetivo ? `
          <div style="margin-bottom: 25px;">
            <div class="section-title">Perfil</div>
            <div class="item-desc">${objetivo.replace(/\n/g, '<br/>')}</div>
          </div>
          ` : ''}
          
          ${experienciasHtml ? `
          <div style="margin-bottom: 25px;">
            <div class="section-title">Experiência Profissional</div>
            ${experienciasHtml}
          </div>
          ` : ''}
          
          ${formacoesHtml ? `
          <div style="margin-bottom: 25px;">
            <div class="section-title">Formação Acadêmica</div>
            ${formacoesHtml}
          </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
};
