from flask import Flask
from flask_cors import CORS
from flasgger import Swagger

def create_app():
    """Creates and initializes the Flask application."""
    #----- Flask + CORS
    app = Flask(__name__, static_folder='static', template_folder='templates')
    CORS(app)

    #----- Swagger
    app.config['SWAGGER'] = {
        'title': 'GPU Monitor API',
        'uiversion': 3
    }
    Swagger(app)

    #----- Register blueprints
    from app.routes import main_bp
    app.register_blueprint(main_bp)

    return app
