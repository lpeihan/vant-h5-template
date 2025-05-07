#!/bin/bash

DIST_ZIP_NAME="dist.zip"
REMOTE_USER="ubuntu"
REMOTE_HOST="43.199.227.22"
DEPLOY_PATH="/home/rwax/web"
PEM_FILE="./rwa.pem"

chmod 400 $PEM_FILE

# ssh-keygen -R $REMOTE_HOST
# ssh-keyscan -H $REMOTE_HOST >> ~/.ssh/known_hosts

echo "uploading $DIST_ZIP_NAME to $REMOTE_HOST:$DEPLOY_PATH..."
scp -i $PEM_FILE $DIST_ZIP_NAME $REMOTE_USER@$REMOTE_HOST:$DEPLOY_PATH
if [ $? -ne 0 ]; then
    echo "upload failed"
    exit 1
fi

echo "unzip $DIST_ZIP_NAME..."
ssh -i $PEM_FILE $REMOTE_USER@$REMOTE_HOST "unzip -o $DEPLOY_PATH/$DIST_ZIP_NAME -d $DEPLOY_PATH && rm $DEPLOY_PATH/$DIST_ZIP_NAME"
if [ $? -ne 0 ]; then
    echo "remote unzip failed"
    exit 1
fi

echo "deploy success to $REMOTE_HOST:$DEPLOY_PATH"
