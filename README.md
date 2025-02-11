## What is Jobba?

Jobba is a web application designed to aid users in their job seeking process and streamline various tasks such as application tracking, networking, and email communication.

This application implements application tracking through email, a cold response rate calculator, and a spreadsheet display of your current job search.

## _"um... what's so special about another job tracker spreadsheet?"_

What's special is that the spreadsheet is automatically updated.

You do not have to update the spreadsheet.

You login with Google, and bam! The spreadsheet is generated for you.

## Want to beta test? 

- To beta test, [send me an email](mailto:help@jobba.help?subject=Jobseeker%20Analytics%20Free%20Trial&body=my%20google%20gmail%20address%20is).
    1. Mention how you heard about the app (which community, friend’s name)
    2. I’ll respond as soon as I can to give you access (depends on Google’s beta testing user limits)

Once you are approved, simply click on the link provided in the email that was sent to you, then login using your email used for job seeking. 

The email scanning will then begin, and may take a couple minutes.

You should then be redirected to your exported spreadsheet with all your job seeking information to date!

## Your export will look something like this:

![Screenshot 2024-12-29 at 7 41 17_PM (1) (1)](https://github.com/user-attachments/assets/951ae900-c875-4745-9d4b-ac77d313d281)

## Do you code and want to volunteer?
- Take a look at the issues [list](https://github.com/lnovitz/jobseeker-analytics/issues) and comment on the issue you're interested in fixing.
- _Note_: beginners are welcome!
- I hope to create a safe space for new open source contributors.
- No question is dumb

## Running the Application Locally (Developers)

The backend and frontend of the app must be run separately.

Begin by cloning the repo onto your local machine.

The instructions to run the backend are listed in CONTRIBUTING.md, and are as follows:



The instructions to run the frontend are simple:

Begin by ensuring npm, nvm and node are all installed on your machine.

1. Open a terminal
2. cd into jobba/frontend (“cd frontend”)
3. Run “npm i”
4. Run “npm run dev”
5. Navigate to localhost:3000 in your browser of choice

## Vision

As a job seeker with a gmail account, I want to be able to calculate  my initial application response rate with the touch of a button

## Example

Below is an example of a typical email you'd receive after applying for a role.

> From: noreply-hr@flyingunicornsarefake.com
>
> Date: January 1
> 
> Subject: We received your application
> 
> Body: Thanks for applying to FlyingUnicorns! We'll reach out if there's a fit.


<details>
<summary>Let's imagine I sent a total of 10 applications on January 1, including the 1 above for FlyingUnicorns.
</summary>

> From: noreply-hr@company1isfake.com
>
> Date: January 1
> 
> Subject: We received your application
> 
> Body: Thanks for applying to Company 1! We'll reach out if there's a fit.

> From: noreply-hr@company2isfake.com
>
> Date: January 1
> 
> Subject: We received your application
> 
> Body: Thanks for applying to Company 2! We'll reach out if there's a fit.

> From: noreply-hr@company3isfake.com
>
> Date: January 1
> 
> Subject: We received your application
> 
> Body: Thanks for applying to Company 3! We'll reach out if there's a fit.

> From: noreply-hr@company4isfake.com
>
> Date: January 1
> 
> Subject: We received your application
> 
> Body: Thanks for applying to Company 4! We'll reach out if there's a fit.

> From: noreply-hr@company5isfake.com
>
> Date: January 1
> 
> Subject: We received your application
> 
> Body: Thanks for applying to Company 5! We'll reach out if there's a fit.

> From: noreply-hr@company6isfake.com
>
> Date: January 1
> 
> Subject: We received your application
> 
> Body: Thanks for applying to Company 6! We'll reach out if there's a fit.

> From: noreply-hr@company7isfake.com
>
> Date: January 1
> 
> Subject: We received your application
> 
> Body: Thanks for applying to Company 7! We'll reach out if there's a fit.

> From: noreply-hr@company8isfake.com
>
> Date: January 1
> 
> Subject: We received your application
> 
> Body: Thanks for applying to Company 8! We'll reach out if there's a fit.

> From: noreply-hr@company9isfake.com
>
> Date: January 1
> 
> Subject: We received your application
> 
> Body: Thanks for applying to Company 9! We'll reach out if there's a fit.

> From: noreply-hr@flyingunicornsarefake.com
>
> Date: January 1
> 
> Subject: We received your application
> 
> Body: Thanks for applying to FlyingUnicorns! We'll reach out if there's a fit.
</details>

<br>
Now let's imagine on January 14, 2 weeks later, the only response I've gotten is from the FlyingUnicorns company.

<br>

>
>
> From: noreply-hr@flyingunicornsarefake.com
>
> Date: January 14
> 
> Subject: Update from FlyingUnicorns
> 
> Body: In your application we noticed you said you live in outer space. We only hire on Earth, sorry! We'll keep in touch if our borders open up though.

While that's a response, it's not the response we're looking for. 
<br>So we're batting 0% response rate so far.

But wait, there's hope!

On January 28, Company 6 responded.
> From: fakeperson@company6isfake.com
>
> Date: January 28
> 
> Subject: Interview Availability for Company 6
> 
> Body: Thanks for applying to Company 6! We'd like to schedule a short call to discuss the engineering role you applied for.

So at this point, our response rate is `10%` 

But most people are not simply sending 10 applications and tracking their numbers, at least not these days. You might be casting a wide net, sending hundreds of applications and not bothering to check on your response rate. 10% is a great response rate. But what if your response rate was only 1%? That's an indicator that your resume needs changing. 

## Thoughts for Later Iterations

Imagine if you could check your response rates against different industries... you could make your job search more targeted and effective. 

Imagine if you had a tool to save the resume you used when applying for roles - and could check the response rates against the resume version you used against a specific industry.

Imagine if you could track your success rates with referrals, or you could see at what stage you're getting stuck. 

## Resources
[Gmail Messages API Doc](https://developers.google.com/gmail/api/reference/rest/v1/users.messages/list)

[Google Console](https://console.cloud.google.com/apis/credentials)

[Never Search Alone - phyl.org - Free Support Group for Job Seekers](https://www.phyl.org/)

