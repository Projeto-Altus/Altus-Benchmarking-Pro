from flask import Blueprint, jsonify, request
from ..dtos.scraping_dto import ScrapeRequest
from pydantic import ValidationError        
from ..services.scraper_service import scraper_service

scrape_bp = Blueprint("scrape", __name__)

@scrape_bp.route("/", methods=["POST"])
def scrape():
    json_data = request.get_json()
    
    if json_data is None:
        return jsonify({"message": "Corpo da requisição inválido (JSON esperado)."}), 400

    try:
        validated_data = ScrapeRequest.model_validate(json_data)
        
    except ValidationError as e:
        return jsonify({
            "message": "Falha na validação dos dados de entrada.",
            "details": e.errors()
        }), 400
        
    try:
        links = [str(url) for url in validated_data.urls]
        attributes = validated_data.attributes
        
        service_response = scraper_service.scrape(
            links=links, 
            attributes=attributes
        )
        
        return jsonify(service_response), 200

    except ValueError as ve:
        return jsonify({
            "message": "Dados inválidos fornecidos.", 
            "error_detail": str(ve)
        }), 400

    except Exception as e:
        return jsonify({
            "message": "Ocorreu um erro interno durante o processamento.", 
            "error_detail": str(e)
        }), 500