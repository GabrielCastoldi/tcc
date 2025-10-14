#!/bin/bash

# Start both backend and frontend in parallel
echo "Starting backend and frontend..."

# Start backend in background
(cd backend && npm install&& npm run dev) &
BACKEND_PID=$!

# Start frontend in background  
(cd site && npm install && npm run dev) &
FRONTEND_PID=$!

echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Both services are running!"
echo "Press Ctrl+C to stop both services"

# Wait for user to stop
wait
