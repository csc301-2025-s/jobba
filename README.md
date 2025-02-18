# Jobba
[![Watch the video](http://img.youtube.com/vi/-cOKR4JtceY/maxresdefault.jpg)](https://www.youtube.com/watch?v=-cOKR4JtceY)
🎥 Sneak Peek: https://www.youtube.com/watch?v=-cOKR4JtceY

## Introduction:
**Overview:**
**Jobba** is a web application that helps users manage their job search by simplifying tasks like tracking applications, networking, and handling email communication. 

**The problem it aims to solve.**
Job searching can be overwhelming, with hundreds of applications to track across spreadsheets, often leading to errors. Jobba simplifies the process by automatically analyzing your Gmail inbox to track job application responses. It creates a **real-time spreadsheet** with key metrics like response rates, helping you refine and optimize your job search strategy.

The key features of the application are as follows:
- Automated Tracking
- User Interface
- Data Export

## Feature Description:
### Automated Tracking:
- **How it works:**  The application connects to your Gmail account to track job applications automatically. Once linked via OAuth, the app scans all your emails for keywords like “application received” or “interview scheduled.” 
- **Real-Time Processing:** The system processes emails quickly and presents the results without requiring manual input.

### User Interface:
- **Light & Dark Mode:** Users can switch between themes for better readability and accessibility.
- **Intuitive Navigation:** The application provides a clear and structured flow:

  - _Gmail Sync Button:_ Initiates the tracking process.
  - _Google Login:_ Users authenticate securely with their Gmail account.
  - _Processing Page:_ Displays progress while scanning emails.
  - _Success Page:_ Confirms completion and provides access to results.
- **GitHub Access:** A direct link to the project’s GitHub repository is available for users interested in the source code.

### Data Export:
- It compiles the extracted data into a CSV file, providing a structured overview of your job applications.
- **Real-time updates:** The CSV file updates automatically as new relevant emails arrive, ensuring you always have the latest insights.

## How to use Jobba:
- To run this app, click on the following link: [Visit Jobba](https://jobba.onrender.com/)
- The homepage will load, displaying an overview of Jobba and its functionalities. Locate the **navigation bar** at the top of the homepage and click the **Login to Google** button to initiate the authentication.
- The website will redirect you to a Gmail page where you should enter the email credentials from which you want the analysis.
- If a security warning appears stating that the app is not verified, click **Continue** to proceed.
- If prompted, check the permission box to allow Jobba to access relevant email data.
- After authentication, you will be redirected to a processing page while the application scans your inbox.
- Once the process is complete, you will be taken to the success page.
- The success page contains the Download Job Application Data button from which you download a CSV file containing the extracted job application details.

## Demonstration:
Below is the visual demonstration of the website and what our current product is like:

[demo.webm](https://github.com/user-attachments/assets/e5072cfe-1f39-40d6-992f-40024d3e9fae)

## Testing the Features:
We are using Playwright to test the following:
  - **UI Elements & Visibility:** Check if elements (buttons, links, etc.) exist and are visible.
  - **User Interactions:** Simulate user actions like clicks.
  - **Navigation & Page Loading:** Ensure that pages load correctly and navigation works.

Once you have the app locally, follow these commands to install the package:
  - cd frontend
  - npm install --save-dev @playwright/test
  - python -m playwright install

To run the tests, run the following command:
  - npx playwright test

Playwright also provides an option to receive a .html Test Report. To use this option, run the following commands:
  - npx playwright test --reporter=html
  - npx playwright show-report

<img width="538" alt="test" src="https://github.com/user-attachments/assets/3ba944bd-4cf3-4500-82db-3c78b4b68981" />

## Developer Instructions
### Prerequisites:
- `Python 3.11 or lower`
- `Node 18+`
- [Google Cloud Account](https://cloud.google.com/)

### Google Stuff:
#### Get a Google AI API key
1. Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Click **Create and API Key**
3. Copy your **API key** and assign it to `GOOGLE_API_KEY` in the `backend/.env` file

#### Create a Google OAuth App 
1. Go to the [Google Cloud Console](https://console.cloud.google.com/) and create a new project (or use an existing one).  
2. Navigate to **APIs & Services** → **Credentials**.  
3. If this is your first time creating credentials with this project, you will have to configure the OAuth consent screen.
4. On the OAuth Consent Screen page, scroll to "Test Users" and add your gmail address.
3. Click **Create Credentials** → **OAuth 2.0 Client IDs**.  
4. Set the application type to **Web Application**.  
5. Under "Authorized redirect URIs," add:  
   - http://localhost:8000/login
6. Copy the **Client ID** and assign it to `GOOGLE_CLIENT_ID` in the `backend/.env` file
7. Download and save your credentials locally to the `backend` folder for this repo in a file named ```credentials.json```
8. In the search bar search for **Gmail API**
9. Enable the Gmail API

### Starting the app
First make sure you have cloned the repository

### Starting the backend:
1. Go into the backend folder:
   ```sh
    cd backend
   ```

3. Create and activate virtual environment:
   ```sh
   # MAC/LINUX
   python3 -m venv .venv
   source .venv/bin/activate
   ```
   ```sh
   # WINDOWS (CMD)
   python -m venv .venv
   .venv\Scripts\activate
   ```   
4. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
5. Copy `.env.example` to `.env`:
   ```sh
   cp .env.example .env
   ```
6. Edit the `.env` file with your credentials:  
   ```ini
    GOOGLE_SCOPES='["https://www.googleapis.com/auth/gmail.readonly", "openid"]'
    GOOGLE_CLIENT_ID=your-client-id-here
    COOKIE_SECRET=your-random-secret-here
    GOOGLE_API_KEY=your-api-key-here
    REDIRECT_URI=http://localhost:8000/login
    ENV=dev
    DB_PORT=5432
    DB_HOST=your-db-host-here
    DB_NAME=your-db-name-here
    DB_USER=your-db-user-here
    DB_PASSWORD=your-db-password-here
    CLIENT_SECRETS_FILE="credentials.json"
    SERVER_URL=http://localhost:8000
    APP_URL=http://localhost:3000
   ```
7. Run FastAPI Server Locally:
   ```sh
   uvicorn main:app --reload
   ```
8. The backend is now running on:
   http://127.0.0.1:8000

### Starting the frontend:
1. Go into the backend folder:
   ```sh
   cd frontend
   ```
2. Copy `.env.sample` to `.env`:
   ```sh
   cp .env.sample .env
   ```
3. Edit the `.env` file with your credentials:  
   ```ini
    ENV_TYPE=dev
    NEXT_PUBLIC_API_URL=http://localhost:8000
    NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
4. Install dependencies:
   ```sh
   npm install
   ```
5. Run the development server:
   ```sh
   npm run dev
   ```
6. The frontend is now running on:
   http://localhost:3000


## Deployment Instructions:
Our app is currently deployed on [Render](https://render.com/) as 2 web services:
1. Frontend app (jobba)
2. Backend server (jobba-server)

### Deploying frontend app (jobba)
1. Build & Deploy Commands (Refer to the screenshot below for example)
   - Root Directory: `frontend`
   - Build Command: `npm install; npm run build`
   - Start Command: `npm run start`
![Screenshot 2025-02-17 at 7 13 49 PM](https://github.com/user-attachments/assets/09240aa4-2f83-44b2-a35c-cbd9c2494929)

2. Environment Variables:
Set the following environmental variable keys with the values listed below:
   - `ENV_TYPE`: prod
   - `NEXT_PUBLIC_API_URL`: https://jobba-server.onrender.com (Url of deployed backend server)
   - `NEXT_PUBLIC_APP_URL`: https://jobba.onrender.com (Url of deployed app)

### Deploying backend server (jobba-server)
1. Build & Deploy Commands (Refer to the screenshot below for example)
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
![Screenshot 2025-02-17 at 7 17 04 PM](https://github.com/user-attachments/assets/d0ccd296-229e-4927-b20e-9c2ad8e52e8e)

2. Environment Variables:
Set the following environmental variable keys with the values listed below:
(The **bold values** indicate that you will need to enter info unique to you)

  (These values should be the same as your local `.env` file with the exception of the URLS)
   - `APP_URL`: https://jobba.onrender.com
   - `CLIENT_SECRETS_FILE`: credentials.json
   - `COOKIE_SECRET`: **your-random-secret-here**
   - `DB_HOST`: **your-db-info**
   - `DB_NAME`: **your-db-info**
   - `DB_PASSWORD`: **your-db-info**
   - `DB_PORT`: 5432
   - `DB_USER`: **your-db-info**
   - `ENV`: prod
   - `GOOGLE_API_KEY`: **your-api-key** (from: https://aistudio.google.com/app/apikey)
   - `GOOGLE_CLIENT_ID`: **your-id** (from: [Google Cloud OAuth 2.0 Client IDs](https://cloud.google.com/))
       - ![Screenshot 2025-02-17 at 7 40 22 PM](https://github.com/user-attachments/assets/bd64658a-c4e6-4f6e-a38b-e2762ef2d650)
   - `GOOGLE_SCOPES`: '["https://www.googleapis.com/auth/gmail.readonly", "openid"]'
   - `REDIRECT_URI`: https://jobba-server.onrender.com/login
   - `SERVER_URL`: https://jobba-server.onrender.com

4. Secret Files:
Add the following secret file with the content as listed below
   - `credentials.json`: Your downloaded [Google Cloud OAuth 2.0 Client IDs](https://cloud.google.com/) json file.
   - ![Screenshot 2025-02-17 at 7 38 44 PM](https://github.com/user-attachments/assets/65c3244c-fa1d-43e2-a499-cf904fd774fe)

