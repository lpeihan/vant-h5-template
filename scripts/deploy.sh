#!/bin/bash

ENV=${MODE}
DIST_ZIP_NAME="dist.zip"
REMOTE_USER="ubuntu"
DEPLOY_PATH="/home/ubuntu/web"
ENV_FILE="$(dirname "$0")/../.env.$ENV"

if [ ! -f "$ENV_FILE" ]; then
    echo "[ERROR] Environment file not found at $ENV_FILE"
    exit 1
fi

source "$ENV_FILE"
source "$(dirname "$0")/../.env.local"

ssh-keygen -R $REMOTE_HOST
ssh-keyscan -H $REMOTE_HOST >> ~/.ssh/known_hosts

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[INFO] $1${NC}"
}

log_success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}"
}

log_error() {
    echo -e "${RED}[ERROR] $1${NC}"
}

log_info "uploading $DIST_ZIP_NAME to $REMOTE_HOST..."
sshpass -p "$REMOTE_PASS" scp $DIST_ZIP_NAME $REMOTE_USER@$REMOTE_HOST:$DEPLOY_PATH
if [ $? -ne 0 ]; then
    log_error "upload failed"
    exit 1
fi

log_info "unzip $DIST_ZIP_NAME..."
sshpass -p "$REMOTE_PASS" ssh $REMOTE_USER@$REMOTE_HOST "unzip -q -o $DEPLOY_PATH/$DIST_ZIP_NAME -d $DEPLOY_PATH && rm $DEPLOY_PATH/$DIST_ZIP_NAME"
if [ $? -ne 0 ]; then
    log_error "remote unzip failed"
    exit 1
fi

log_success "deployed successfully!"