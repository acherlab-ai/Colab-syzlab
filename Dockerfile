# Stage 1: Build Frontend Assets
FROM node:20-slim AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production Python Runner (Ultra-lightweight < 150MB RAM)
FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONMALLOC=malloc \
    MALLOC_TRIM_THRESHOLD_=65536 \
    PORT=8080 \
    SUZLAB_DB_PATH=/tmp/suzlab_colab.db \
    SUZLAB_USERS_DIR=/tmp/suzlab_users

WORKDIR /app

# Install minimal base dependencies
RUN apt-get update -qq && \
    apt-get install -qq -y --no-install-recommends \
    curl \
    ca-certificates \
    procps \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code and built frontend dist from Stage 1
COPY . .
COPY --from=frontend-builder /app/dist /app/dist

# Expose service port
EXPOSE 8080

# Run single-worker Uvicorn for maximum RAM efficiency (<150MB)
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080} --workers 1 --no-access-log"]
