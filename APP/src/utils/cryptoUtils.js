/**
 * MÓDULO DE CRIPTOGRAFIA - ARMAZENAMENTO SEGURO DE API KEY
 * 
 * Utiliza Web Crypto API nativa do navegador
 * - AES-GCM 256-bit para criptografia simétrica
 * - PBKDF2 + SHA-256 para derivação de chave
 * - Salt e IV aleatórios para cada criptografia
 * 
 * Segurança:
 * - Chave derivada apenas da senha do usuário
 * - Nunca armazena senha ou plaintext da API key
 * - IV e salt são aleatórios (necessários para descriptografar)
 * - Nunca loga dados sensíveis
 */

const CRYPTO_CONFIG = {
  // PBKDF2 - Derivação de chave da senha
  pbkdf2: {
    iterations: 100000, // Iterações (quanto maior, mais seguro mas mais lento)
    hash: 'SHA-256',
  },
  // AES-GCM - Criptografia
  aesgcm: {
    name: 'AES-GCM',
    length: 256, // Bits
  },
  // Tamanhos em bytes
  saltSize: 16,    // 128 bits
  ivSize: 12,      // 96 bits (recomendado para GCM)
  tagLength: 128,  // Bits (autenticação)
};

// Chave para localStorage
const STORAGE_KEY = 'app_api_key_encrypted';

/**
 * Deriva uma chave criptográfica a partir da senha do usuário
 * Usando PBKDF2 com SHA-256
 * 
 * @param {string} password - Senha digitada pelo usuário
 * @param {Uint8Array} salt - Salt aleatório (16 bytes)
 * @returns {Promise<CryptoKey>} Chave derivada pronta para usar
 */
async function deriveKey(password, salt) {
  try {
    // 1. Converter a senha (string) para buffer
    const passwordBuffer = new TextEncoder().encode(password);

    // 2. Importar a senha como material criptográfico
    const passwordKey = await window.crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      { name: 'PBKDF2' },
      false, // extractable: false (não pode ser exportada)
      ['deriveKey']
    );

    // 3. Derivar a chave final usando PBKDF2
    const derivedKey = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: CRYPTO_CONFIG.pbkdf2.iterations,
        hash: CRYPTO_CONFIG.pbkdf2.hash,
      },
      passwordKey,
      {
        name: CRYPTO_CONFIG.aesgcm.name,
        length: CRYPTO_CONFIG.aesgcm.length,
      },
      false, // extractable: false (segurança)
      ['encrypt', 'decrypt']
    );

    return derivedKey;
  } catch (error) {
    console.error('Erro ao derivar chave:', error);
    throw new Error('Falha ao processar senha');
  }
}

/**
 * Criptografa a API Key com a chave derivada da senha
 * 
 * @param {string} apiKey - API Key em texto plano
 * @param {string} password - Senha do usuário
 * @returns {Promise<Object>} { ciphertext, iv, salt } (todos em base64)
 */
async function encryptApiKey(apiKey, password) {
  try {
    // 1. Gerar salt aleatório (nunca reutilizar)
    const salt = window.crypto.getRandomValues(new Uint8Array(CRYPTO_CONFIG.saltSize));

    // 2. Gerar IV aleatório (nunca reutilizar)
    const iv = window.crypto.getRandomValues(new Uint8Array(CRYPTO_CONFIG.ivSize));

    // 3. Derivar chave da senha
    const key = await deriveKey(password, salt);

    // 4. Converter API Key para buffer
    const apiKeyBuffer = new TextEncoder().encode(apiKey);

    // 5. Criptografar com AES-GCM
    const cipherBuffer = await window.crypto.subtle.encrypt(
      {
        name: CRYPTO_CONFIG.aesgcm.name,
        iv: iv,
        tagLength: CRYPTO_CONFIG.tagLength,
      },
      key,
      apiKeyBuffer
    );

    // 6. Converter para base64 para armazenar no localStorage
    return {
      ciphertext: bufferToBase64(cipherBuffer),
      iv: bufferToBase64(iv),
      salt: bufferToBase64(salt),
    };
  } catch (error) {
    console.error('Erro ao criptografar:', error);
    throw new Error('Falha ao criptografar API Key');
  }
}

/**
 * Descriptografa a API Key usando a senha
 * Retorna o plaintext apenas em memória
 * 
 * @param {Object} encryptedData - { ciphertext, iv, salt } (em base64)
 * @param {string} password - Senha do usuário
 * @returns {Promise<string>} API Key descriptografada
 * @throws {Error} Se a senha estiver incorreta
 */
async function decryptApiKey(encryptedData, password) {
  try {
    // 1. Converter base64 de volta para buffer
    const cipherBuffer = base64ToBuffer(encryptedData.ciphertext);
    const iv = base64ToBuffer(encryptedData.iv);
    const salt = base64ToBuffer(encryptedData.salt);

    // 2. Derivar chave com a mesma senha e salt
    const key = await deriveKey(password, salt);

    // 3. Descriptografar com AES-GCM
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: CRYPTO_CONFIG.aesgcm.name,
        iv: iv,
        tagLength: CRYPTO_CONFIG.tagLength,
      },
      key,
      cipherBuffer
    );

    // 4. Converter buffer de volta para string
    const apiKey = new TextDecoder().decode(decryptedBuffer);

    return apiKey;
  } catch (error) {
    console.error('Erro ao descriptografar:', error);
    // Erro genérico para não revelar detalhes
    throw new Error('Senha incorreta ou dados corrompidos');
  }
}

/**
 * Verifica se existe uma API Key criptografada no localStorage
 * 
 * @returns {boolean} true se existe, false caso contrário
 */
function hasStoredApiKey() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored !== null;
}

/**
 * Salva a API Key criptografada no localStorage
 * Armazena apenas { ciphertext, iv, salt }
 * 
 * @param {string} apiKey - API Key em texto plano
 * @param {string} password - Senha do usuário
 * @returns {Promise<void>}
 */
async function saveApiKey(apiKey, password) {
  try {
    // 1. Criptografar
    const encrypted = await encryptApiKey(apiKey, password);

    // 2. Serializar para JSON
    const jsonData = JSON.stringify(encrypted);

    // 3. Salvar no localStorage
    localStorage.setItem(STORAGE_KEY, jsonData);

    // IMPORTANTE: Não retornar nem logar a API key
  } catch (error) {
    console.error('Erro ao salvar:', error);
    throw error;
  }
}

/**
 * Carrega e descriptografa a API Key do localStorage
 * Retorna apenas em memória, nunca em DOM
 * 
 * @param {string} password - Senha do usuário
 * @returns {Promise<string>} API Key descriptografada (apenas em memória)
 * @throws {Error} Se a senha estiver incorreta ou dados não existem
 */
async function loadApiKey(password) {
  try {
    // 1. Recuperar dados do localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      throw new Error('Nenhuma API Key salva encontrada');
    }

    // 2. Desserializar JSON
    const encryptedData = JSON.parse(stored);

    // 3. Descriptografar
    const apiKey = await decryptApiKey(encryptedData, password);

    // IMPORTANTE: Retornar apenas em variável de estado, NUNCA em DOM

    return apiKey;
  } catch (error) {
    console.error('Erro ao carregar:', error);
    throw error;
  }
}

/**
 * Remove a API Key criptografada do localStorage
 * 
 * @returns {void}
 */
function removeStoredApiKey() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Converte um buffer (Uint8Array) para string base64
 * Necessário para armazenar no localStorage
 * 
 * @param {Uint8Array} buffer
 * @returns {string} String base64
 */
function bufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Converte uma string base64 de volta para buffer (Uint8Array)
 * Necessário ao ler do localStorage
 * 
 * @param {string} base64
 * @returns {Uint8Array} Buffer
 */
function base64ToBuffer(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export {
  // Funções principais
  deriveKey,
  encryptApiKey,
  decryptApiKey,
  
  // Verificação e gerenciamento
  hasStoredApiKey,
  saveApiKey,
  loadApiKey,
  removeStoredApiKey,
  
  // Auxiliares (podem ser úteis para testes)
  bufferToBase64,
  base64ToBuffer,
};
