# 🛸 GPU Monitor API 

![monitor_gpu](https://github.com/user-attachments/assets/d7910d3b-95c9-41a5-92fe-53b54670f1e8)

This project provides a real-time monitoring dashboard for GPU metrics using Flask, NVML (NVIDIA Management Library), and Flasgger for API documentation. The information is visualized through a dynamic dashboard created with JavaScript.

## 📟 Features

- Displays real-time GPU usage, memory usage, temperature, and power draw.
- Provides detailed GPU process information.
- Interactive Swagger documentation for the API.

## 🪂 Prerequisites

Before running this project, ensure you have the following installed:

- Docker Desktop (with NVIDIA GPU support enabled)
- NVIDIA drivers compatible with your GPU
- NVIDIA Container Toolkit
- Python 3.8+ (for local development)

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/d1akon/GPU_Monitor.git
cd GPU_Monitor
```

### 2. Build and Run with Docker

To ensure the application can access your GPU, follow these steps:

1. **Build the Docker image**:
   ```bash
   docker build -t gpu-monitor .
   ```

2. **Run the container**:
   ```bash
   docker run --rm --gpus all -p 5000:5000 gpu-monitor
   ```

3. Access the application in your browser at `http://127.0.0.1:5000/`.

### 3. Local Development (Optional)

If you want to run the application locally (outside Docker):

1. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the application:
   ```bash
   python run.py
   ```

3. Access the application in your browser at `http://127.0.0.1:5000/`.

## 📃 API Documentation

The project uses **Flasgger** to provide Swagger-based documentation. After running the application, you can access the interactive API docs at:

- **Swagger UI**: [http://127.0.0.1:5000/apidocs](http://127.0.0.1:5000/apidocs)

### Endpoints

1. **GET /**
   - Description: Serves the main dashboard page.
   - Response: HTML page with GPU monitoring dashboard.

2. **GET /gpu_metrics**
   - Description: Provides real-time GPU metrics.
   - Response:
     ```json
     {
       "gpu_usage": 6,
       "memory_used": 994.35,
       "memory_total": 12884.9,
       "temperature": 56,
       "power_draw": 28.456,
       "power_limit": 400.0,
       "processes": []
     }
     ```


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

