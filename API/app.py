from flask import Flask, jsonify
from flask_cors import CORS
from routes.scrape_routes import scrape_bp
from routes.export_routes import export_bp
from routes.notification_routes import notification_bp 

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.url_map.strict_slashes = False

    app.register_blueprint(scrape_bp, url_prefix="/api/scrape")
    app.register_blueprint(export_bp, url_prefix="/api/export")
    app.register_blueprint(notification_bp, url_prefix="/api") 

    @app.route("/", methods=['GET'])
    def index():
        return jsonify({
            "message": "Benchmarking Tool API is running.",
            "endpoints": {
                "scrape": "POST /api/scrape",
                "notify": "POST /api/notify" 
            }
        })

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=False, host='127.0.0.1', port=5000, threaded=True)