#!/bin/bash

ENV=${ENV}
DIST_ZIP_NAME="dist.zip"
REMOTE_USER="root"
DEPLOY_PATH="/home/divine"
ENV_FILE="$(dirname "$0")/../.env.$ENV"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

source "$ENV_FILE"
source "$(dirname "$0")/../.env.local"

TEMP_KEY_FILE=$(mktemp)
echo "$PRIVATE_KEY" > "$TEMP_KEY_FILE"
chmod 600 "$TEMP_KEY_FILE"

ssh-keygen -R $REMOTE_HOST
ssh-keyscan -H $REMOTE_HOST >> ~/.ssh/known_hosts

log_info() {
    echo -e "${BLUE}[INFO] $1${NC}"
}

log_success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}"
}

log_error() {
    echo -e "${RED}[ERROR] $1${NC}"
}

if [ ! -f "$ENV_FILE" ]; then
    log_error "[ERROR] Environment file not found at $ENV_FILE"
    exit 1
fi

log_info "uploading $DIST_ZIP_NAME to $REMOTE_HOST..."
log_info "$$TEMP_KEY_FILE"
# sshpass -p "$REMOTE_PASS" scp $DIST_ZIP_NAME $REMOTE_USER@$REMOTE_HOST:$DEPLOY_PATH
scp -i "$TEMP_KEY_FILE" "$DIST_ZIP_NAME" "$REMOTE_USER@$REMOTE_HOST:$DEPLOY_PATH"
if [ $? -ne 0 ]; then
    log_error "upload failed"
    rm -f "$TEMP_KEY_FILE"
    exit 1
fi

log_info "unzip $DIST_ZIP_NAME..."
# sshpass -p "$REMOTE_PASS" ssh $REMOTE_USER@$REMOTE_HOST "unzip -q -o $DEPLOY_PATH/$DIST_ZIP_NAME -d $DEPLOY_PATH && rm $DEPLOY_PATH/$DIST_ZIP_NAME"
ssh -i "$TEMP_KEY_FILE" "$REMOTE_USER@$REMOTE_HOST" "unzip -q -o $DEPLOY_PATH/$DIST_ZIP_NAME -d $DEPLOY_PATH && rm $DEPLOY_PATH/$DIST_ZIP_NAME"
if [ $? -ne 0 ]; then
    log_error "remote unzip failed"
    rm -f "$TEMP_KEY_FILE"
    exit 1
fi

rm -f "$TEMP_KEY_FILE"

log_success "deployed successfully!"