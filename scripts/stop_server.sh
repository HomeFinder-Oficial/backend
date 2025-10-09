#!/bin/bash
echo "🛑 Deteniendo servidor NestJS..."
pm2 stop homefinder-backend || true
