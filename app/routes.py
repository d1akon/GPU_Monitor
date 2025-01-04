from flask import Blueprint, jsonify, render_template
from app.services.gpu_service import get_gpu_metrics

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    """
    Main page.
    ---
    responses:
        200:
            description: Returns the HTML page of the GPU monitor.
    """
    return render_template('index.html')

@main_bp.route('/gpu_metrics')
def gpu_metrics():
    """
    Get GPU metrics.
    ---
    responses:
        200:
            description: Returns the current GPU metrics.
            schema:
                type: object
                properties:
                    gpu_usage:
                        type: integer
                        description: GPU usage in percentage.
                    memory_used:
                        type: number
                        description: Memory used in MB.
                    memory_total:
                        type: number
                        description: Total memory in MB.
                    temperature:
                        type: integer
                        description: GPU temperature in degrees Celsius.
                    power_draw:
                        type: number
                        description: Power consumption in watts.
                    power_limit:
                        type: number
                        description: Power consumption limit in watts.
                    processes:
                        type: array
                        items:
                            type: object
                            properties:
                                PID:
                                    type: integer
                                    description: Process ID.
                                Name:
                                    type: string
                                    description: Process name.
                                Memory Used (MB):
                                    type: number
                                    description: Memory used by the process in MB.
    """
    return jsonify(get_gpu_metrics())
