# Skooly
Student registration portal using Nodejs and React

The project is divided into 2 main folders, one for backend and one for frontend. 
Typically each should have its own repo but for the sake of simplicy I have made them under one repo.


To run the backend:
- Backend is developed using NestJS and Typescript. Database is MySQL
- Import the db file `skooly/skooly-backend/Skooly.sql` into MySQL
- Set up your environment variables inside `skooly/skooly-backend/env.development.sh`
- run `source env.development.sh` in the terminal inside the directory `skooly/skooly-backend/`
- run `npm install` inside the directory `skooly/skooly-backend/`
- run `npm run start:dev` inside the directory `skooly/skooly-backend/` to start the backend


To run the frontend: 
- Frontend is developed using React, Redux, and React Query
- Rename the file `.env.example` to `.env`
- Put the correct URL for the API URL inside .env
- Run `npm install` inside the directory `skooly/skooly-frontend/`
- Run `npm start` inside the directory `skooly/skooly-frontend/` to start the frontend


Demo of the final app:
https://drive.google.com/file/d/1onPG7eV4bSefbdNNWorRauCHiIvTjJOS/view?usp=sharing
