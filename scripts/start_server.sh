#!/bin/bash
cd /home/ec2-user/homefinder-backend
echo "🚀 Iniciando servidor NestJS..."
npm ci --omit=dev
npm run build
pm2 start dist/main.js --name homefinder-backend || pm2 restart homefinder-backend
