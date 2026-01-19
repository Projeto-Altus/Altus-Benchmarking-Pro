/**
 * COMPONENTE: MODAL DE SENHA
 * =========================
 * 
 * Modal reutilizável para solicitar senha ao usuário
 * Usado para:
 * - Salvar API Key (criptografar)
 * - Carregar API Key (descriptografar)
 * 
 * Características de segurança:
 * - Senha nunca é exibida em texto
 * - Senha é passada apenas ao callback, nunca armazenada no estado
 * - Modal se fecha e limpa ao cancelar
 * - Tratamento de erros silencioso (sem revelar detalhes)
 */

import { useState } from 'react';
import './PasswordModal.css';

export default function PasswordModal({ isOpen, onConfirm, onCancel, title, loading }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleConfirm = async () => {
    if (!password.trim()) {
      setError('Senha não pode estar vazia');
      return;
    }

    try {
      setError('');
      // Passar a senha para o callback (não armazena)
      await onConfirm(password);
      // Limpar após sucesso
      setPassword('');
    } catch (err) {
      // Erro genérico - nunca revelar detalhes técnicos
      setError('Operação falhou');
    }
  };

  const handleCancel = () => {
    // Limpar ao cancelar
    setPassword('');
    setError('');
    onCancel();
  };

  const handleKeyPress = (e) => {
    // Enter para confirmar
    if (e.key === 'Enter' && !loading) {
      handleConfirm();
    }
    // Escape para cancelar
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{title}</h2>

        <div className="modal-password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            className="modal-password-input"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            autoFocus
          />
          <button
            className="btn-toggle-modal-password"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
            type="button"
            title={showPassword ? 'Ocultar' : 'Mostrar'}
          >
            {showPassword ? '◉' : '○'}
          </button>
        </div>

        {error && <p className="modal-error">{error}</p>}

        <div className="modal-buttons">
          <button
            className="btn-cancel"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className="btn-confirm"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  );
}
