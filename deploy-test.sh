#!/bin/bash

# Install dependencies
sudo apt update
sudo apt install -y nodejs npm mongodb

# Clone repository
git clone <your-repo-url>
cd betcompare

# Install project dependencies
npm install

# Set up environment
cp .env.test .env

# Start MongoDB
sudo systemctl start mongodb

# Start application
npm run test 