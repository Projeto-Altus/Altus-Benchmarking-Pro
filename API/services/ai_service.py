import json
import os
import google.generativeai as genai
from typing import List, Dict

class AIService:
    @staticmethod
    def build_prompt(scraped_data: Dict[str, str], attributes: List[str]) -> str:
        prompt = (
            "Você é um assistente de inteligência de mercado. "
            "Analise os textos crus extraídos de páginas web abaixo e extraia as informações solicitadas.\n\n"
            f"ATRIBUTOS PARA EXTRAIR: {', '.join(attributes)}\n\n"
            "--- REGRAS DE RESPOSTA ---\n"
            "1. Retorne APENAS um JSON válido.\n"
            "2. O formato deve ser uma lista de objetos: [{'url_origem': '...', 'atributo': 'valor'}]\n"
            "3. Se a informação não existir, preencha com 'N/A'.\n"
            "4. Não utilize blocos de markdown (como ```json), retorne apenas o texto do JSON.\n\n"
            "--- DADOS DOS SITES ---\n"
        )

        for i, (url, content) in enumerate(scraped_data.items()):
            prompt += f"\n>>> SITE {i+1} (URL: {url}):\n{content[:12000]}\n"

        return prompt

    @staticmethod
    def get_comparison_data(prompt: str, api_key: str = None) -> List[Dict]:
        print("--- [AI Service] Conectando ao Google Gemini... ---")
        
        final_key = api_key
        
        if not final_key:
            print("ERRO: Nenhuma API Key fornecida.")
            return [{"error": "API Key do Gemini não configurada. Envie no JSON ou configure a variável de ambiente GEMINI_API_KEY."}]

        try:
            genai.configure(api_key=final_key)
            
            model = genai.GenerativeModel('gemini-2.5-flash')
            
            response = model.generate_content(prompt)
            raw_text = response.text

            clean_text = raw_text.replace("```json", "").replace("```", "").strip()
            
            data = json.loads(clean_text)
            
            if isinstance(data, dict):
                return [data]
            return data

        except json.JSONDecodeError:
            print("Erro: A resposta da IA não foi um JSON válido.")
            return [{"error": "Erro de formatação da IA", "conteudo_recebido": raw_text[:200]}]
        
        except Exception as e:
            print(f"Erro na API do Gemini: {e}")
            return [{"error": f"Erro na comunicação com a IA: {str(e)}"}]