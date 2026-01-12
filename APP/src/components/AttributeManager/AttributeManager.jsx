import React, { useState } from 'react';
import './AttributeManager.css';

const AttributeManager = ({ attributes, setAttributes, loading, t }) => {
  const [input, setInput] = useState('');

  const addAttr = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setAttributes([...attributes, { name: trimmed, importance: 5 }]);
    setInput('');
  };

  const removeAttr = (index) => setAttributes(attributes.filter((_, i) => i !== index));
  const clearAttrs = () => setAttributes([]);

  const handleImportanceChange = (index, value) => {
    let num = parseInt(value, 10);
    if (isNaN(num) || num < 1) num = 1;
    if (num > 10) num = 10;

    const newAttrs = [...attributes];
    newAttrs[index].importance = num;
    setAttributes(newAttrs);
  };

  const escapeHtml = (text) => String(text).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);

  return (
    <div className="section">
      <label className="label">{t.attrsLabel}</label>
      <div className="input-row">
        <input 
          className="input-field" 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          disabled={loading} 
          placeholder="Ex: 'Preço', 'CPU'"
          onKeyDown={(e) => e.key === 'Enter' && addAttr()}
        />
        <button className="btn small primary-btn" onClick={addAttr} disabled={loading}>+</button>
      </div>
      <div className="muted">{attributes.length} {t.attrsCount}</div>
      <ul className="list-items">
        {attributes.map((a, i) => (
          <li className="list-item attr-item" key={i}>
            <span className="attr-name">{escapeHtml(a.name)}</span>
            <div className="importance-control-v2">
              <input 
                type="number" 
                min="1" max="10" 
                value={a.importance} 
                onChange={e => handleImportanceChange(i, e.target.value)} 
                className="importance-number-input"
                disabled={loading}
              />
            </div>
            <button className="btn small remove-btn" onClick={() => removeAttr(i)} disabled={loading}>✖</button>
          </li>
        ))}
      </ul>
      <div className="section-controls">
        <button className="btn small clear" onClick={clearAttrs} disabled={loading}>{t.clearAttrs}</button>
      </div>
    </div>
  );
};

export default AttributeManager;