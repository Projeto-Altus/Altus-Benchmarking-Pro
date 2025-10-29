from flask import Blueprint, jsonify

export_bp = Blueprint("export", __name__)

@export_bp.route("/xlsx", methods=["GET"])
def export_xlsx():
    return jsonify({"message": "Export XLSX route ready."})
