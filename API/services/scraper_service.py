from typing import List
from API.dtos.scraping_dto import ScrapeRequest 

class ScraperService:
    def scrape(self, links: List[str], attributes: List[str]):
        
        resultados = {}
        for url in links:
            print(f"-> URL: {url}, Atributos alvo: {attributes}")
            
            
        return {"message": "Scraping concluído com sucesso.", "data": resultados}

scraper_service = ScraperService()