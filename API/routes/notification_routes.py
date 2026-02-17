from flask import Blueprint, jsonify
from plyer import notification
import os
import sys

notification_bp = Blueprint('notification', __name__)

@notification_bp.route('/notify', methods=['POST'])
def trigger_notification():
    try:
        if getattr(sys, 'frozen', False):
            base_path = sys._MEIPASS
        else:
            base_dir = os.path.abspath(os.path.dirname(sys.argv[0]))
            base_path = base_dir
            
        icon_path = os.path.join(base_path, 'assets', 'app.ico')
        if not os.path.exists(icon_path):
            icon_path = None

        notification.notify(
            title='Altus Benchmarking Pro',
            message='Sua análise foi concluída com sucesso! ✅',
            app_name='Altus Benchmarking Protaskkill /f /im python.exe',
            app_icon=icon_path, 
            timeout=10
        )
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "details": str(e)}), 200