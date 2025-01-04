FROM nvidia/cuda:12.0.1-runtime-ubuntu22.04

RUN apt-get update && apt-get install -y \
    python3 python3-pip && \
    pip3 install flask flask-cors pynvml

COPY . /app
WORKDIR /app

RUN pip3 install -r requirements.txt

EXPOSE 5000

CMD ["python3", "run.py"]
