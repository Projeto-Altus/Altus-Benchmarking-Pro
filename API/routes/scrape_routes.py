from flask import Blueprint, jsonify, request

scrape_bp = Blueprint("scrape", __name__)

@scrape_bp.route("/", methods=["POST"])
def scrape():
    return jsonify({"message": "Scraping route ready."})
