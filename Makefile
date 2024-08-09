#!make
include .env

# TODO: DEST_DIR=/volume1/www/frontend-dev/public/ekskursii

.PHONY: synology-deploy-rsync
synology-deploy-rsync:
	sshpass -p ${SSH_PASS_SYNOLOGY} rsync -avz ${DRY_RUN} --exclude='.*' --exclude='devfront' -e "ssh -o StrictHostKeyChecking=no -p ${SSH_PORT_SYNOLOGY}" ${SOURCE_DIR} ${SSH_USER_SYNOLOGY}@${SSH_HOST_SYNOLOGY}:${DEST_DIR}
synology-deploy:
	$(MAKE) synology-deploy-rsync SOURCE_DIR=./dist/ DEST_DIR=/volume1/www/frontend-dev/public/test