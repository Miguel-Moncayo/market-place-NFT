# Deployment Guide

## Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nebulanft-marketplace
   ```

2. **Start the application**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: mongodb://localhost:27017

## Manual Deployment

### Backend Deployment

1. **Prepare the server**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install MongoDB
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   sudo apt update
   sudo apt install -y mongodb-org
   
   # Start MongoDB
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

2. **Deploy the backend**
   ```bash
   # Clone repository
   git clone <repository-url>
   cd nebulanft-marketplace/server
   
   # Install dependencies
   npm install
   
   # Configure environment
   cp .env.example .env
   # Edit .env with your configuration
   
   # Build and start
   npm run build
   npm start
   ```

### Frontend Deployment

1. **Build the frontend**
   ```bash
   cd client
   npm install
   npm run build
   ```

2. **Deploy with PM2**
   ```bash
   # Install PM2 globally
   npm install -g pm2
   
   # Start the application
   pm2 start npm --name "nebulanft-frontend" -- start
   
   # Save PM2 configuration
   pm2 save
   pm2 startup
   ```

## Cloud Deployment

### Vercel (Frontend)

1. **Connect to Vercel**
   - Sign up at vercel.com
   - Import your GitHub repository
   - Configure environment variables:
     - `NEXT_PUBLIC_API_URL`: Your backend URL

2. **Deploy automatically**
   - Vercel will automatically deploy on every push to main branch

### Render (Backend)

1. **Create Render account**
   - Sign up at render.com
   - Connect your GitHub repository

2. **Configure service**
   - Choose "Web Service"
   - Select the server directory
   - Set environment variables from `.env`
   - Configure start command: `npm start`
   - Choose instance type

### MongoDB Atlas

1. **Create MongoDB Atlas account**
   - Sign up at mongodb.com/cloud/atlas
   - Create a free cluster
   - Configure network access (0.0.0.0/0 for development)
   - Create database user

2. **Get connection string**
   - Go to Database → Connect → Application
   - Copy the connection string
   - Update `MONGODB_URI` in your backend configuration

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb://username:password@host:port/database
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRE=7d
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

## SSL/HTTPS Configuration

### Using Nginx (Recommended)

1. **Install Nginx**
   ```bash
   sudo apt install nginx
   ```

2. **Configure Nginx**
   ```nginx
   # /etc/nginx/sites-available/nebulanft
   server {
       listen 80;
       server_name your-domain.com;
       return 301 https://$server_name$request_uri;
   }

   server {
       listen 443 ssl;
       server_name your-domain.com;
       
       ssl_certificate /path/to/your/certificate.crt;
       ssl_certificate_key /path/to/your/private.key;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
       
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

3. **Enable the site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/nebulanft /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### Using Let's Encrypt (Free SSL)

1. **Install Certbot**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Obtain certificate**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

3. **Auto-renewal**
   ```bash
   sudo certbot renew --dry-run
   ```

## Monitoring and Logging

### Application Monitoring

1. **PM2 Monitoring**
   ```bash
   pm2 monit
   pm2 logs
   ```

2. **Health Checks**
   - Backend: `GET /api/health`
   - Frontend: Check if the page loads

### Log Management

1. **Configure logging**
   ```bash
   # Backend logs
   pm2 logs nebulanft-backend
   
   # Frontend logs
   pm2 logs nebulanft-frontend
   ```

2. **Log rotation**
   ```bash
   # Install logrotate
   sudo apt install logrotate
   
   # Configure log rotation for PM2
   sudo nano /etc/logrotate.d/pm2
   ```

## Backup Strategy

### Database Backup

1. **MongoDB Backup Script**
   ```bash
   #!/bin/bash
   # backup.sh
   
   DATE=$(date +%Y%m%d_%H%M%S)
   BACKUP_DIR="/backups"
   MONGODB_URI="mongodb://username:password@host:port/database"
   
   mongodump --uri="$MONGODB_URI" --out="$BACKUP_DIR/$DATE"
   tar -czf "$BACKUP_DIR/backup_$DATE.tar.gz" -C "$BACKUP_DIR" "$DATE"
   rm -rf "$BACKUP_DIR/$DATE"
   
   # Keep only last 7 days of backups
   find "$BACKUP_DIR" -name "backup_*.tar.gz" -mtime +7 -delete
   ```

2. **Automate with cron**
   ```bash
   # Edit crontab
   crontab -e
   
   # Add daily backup at 2 AM
   0 2 * * * /path/to/backup.sh
   ```

### File Backup

1. **Uploads Backup**
   ```bash
   # Backup uploads directory
   tar -czf uploads_backup_$(date +%Y%m%d).tar.gz server/uploads/
   ```

## Security Considerations

### Production Security Checklist

- [ ] Change default JWT secret
- [ ] Use strong MongoDB credentials
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall rules
- [ ] Set up proper CORS policies
- [ ] Implement rate limiting
- [ ] Use environment variables for sensitive data
- [ ] Regular security updates
- [ ] Monitor application logs
- [ ] Set up backup procedures

### Performance Optimization

1. **Enable Gzip Compression**
   ```nginx
   # In Nginx configuration
   gzip on;
   gzip_vary on;
   gzip_proxied any;
   gzip_comp_level 6;
   gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   ```

2. **Enable Caching**
   ```nginx
   # Static file caching
   location ~* \.(jpg|jpeg|png|gif|ico|css|js|pdf)$ {
       expires 7d;
       add_header Cache-Control "public, no-transform";
   }
   ```

3. **Database Indexing**
   - Ensure proper MongoDB indexes are created
   - Monitor query performance
   - Use database caching if needed

## Troubleshooting

### Common Issues

1. **Connection Issues**
   - Check if MongoDB is running
   - Verify database connection string
   - Check firewall settings

2. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies are installed

3. **Runtime Errors**
   - Check application logs
   - Verify environment variables
   - Ensure all services are running

### Support

For deployment issues:
1. Check the logs
2. Review the configuration
3. Consult the documentation
4. Create an issue on GitHub