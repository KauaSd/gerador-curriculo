import express from 'express';
import { generatePdf } from '../services/pdfGenerator.js';

const router = express.Router();

router.post('/gerar-pdf', async (req, res) => {
  try {
    const data = req.body;
    console.log('Recebendo dados para PDF. Foto presente:', !!data.dadosPessoais?.foto);
    
    // Basic validation
    if (!data.dadosPessoais || !data.dadosPessoais.nome) {
      return res.status(400).json({ error: 'Nome é obrigatório.' });
    }
    if (!data.dadosPessoais.email) {
      return res.status(400).json({ error: 'Email é obrigatório.' });
    }

    // Optional photo validation
    if (data.dadosPessoais.foto) {
      if (!data.dadosPessoais.foto.startsWith('data:image/')) {
        return res.status(400).json({ error: 'Formato de foto inválido. Deve ser um Data URI Base64.' });
      }
    }

    const pdfBuffer = await generatePdf(data);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=curriculo.pdf',
      'Content-Length': pdfBuffer.length
    });
    
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    console.error('Erro na geração do PDF:', error);
    res.status(500).json({ error: 'Falha interna na geração do PDF.' });
  }
});

export default router;
