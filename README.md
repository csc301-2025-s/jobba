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

## Developer Instructions:
1. Clone the repository from this GitHub link: [Jobba-Github-link](https://github.com/csc301-2025-s/jobba)
2. Open the terminal and cd into the project.
3. Open the develop-render branch by the command:
  - **git checkout render-deploy**
4. Write the following commands after to install the necessary packages:
  - **cd backend**
  - Set up the virtual environment.
    - FOR MAC/LINUX:
        - python3 -m venv venv
        - source venv/bin/activate
    - FOR WINDOWS (CMD):
        - python -m venv venv
        - venv\Scripts\activate
  - To install all the required packages:
    - **pip install -r requirements.txt**
  - Run the FastAPI Server using
    - **uvicorn main:app --reload**
5. To run the application:
    - **cd frontend**
    - **npm install .**
    - **npm run dev**
6. A link will be shown and you should click on the first one to access the website.

## Deployment Instructions:



