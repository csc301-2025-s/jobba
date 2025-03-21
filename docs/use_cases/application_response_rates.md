# Product Spec: Application Response Rates
- Authors: [@AxisShine](https://www.github.com/AxisShine) 
- Spec Template Author: [Alex Chiou](https://www.linkedin.com/in/alexander-chiou/), Co-Founder @ Taro, Ex-Robinhood, Ex-Meta Tech Lead


## Timeline
**02/11** Finish Figma prototype of Statistics page

**02/17** Database Setup

**02/24** Backend Code for Statistics Calculations

**03/01** Front End page 

**03/08** Dockerizing

**03/15** Deployment / Beta drop

## Context
jobba.help has been seeking to implement a cold response rate calculator feature, along with a page with various other statistics, since the beginning of the project. Determining the effectiveness of ones application strategy and resume is a helpful and motivating metric for Jobseekers, and we hope to be able to provide helpful job seeking tips.

### What Do We Have Now?
- The app uses Gmail API integration and data processing techniques to capture a CSV download of email records with rejections and initial applications.

## Jobs To Be Done
At a high-level, here’s how statistics calculation can add value to the lives of jobba.help users and jobba.help overall:

**Cold Response Rate** - Users can determine the base effectiveness of their application strategy and compare with other users. It is a simple way of gamifying job applications, and providing a concrete metric for job seekers.

**Timeline Stats** - Statistics over a timeline, with number of applications, number of responses, and number of interviews listed. This would allow a user to decide whether they are working fast enough, and keeping a consistent effort towards their job search. It would also demonstrate abstractly the effectiveness of different strategies at different times.

**Community Baseline** - Some sort of community average to determine how much better or worse than other job seekers your strategy is performing (could be listed alongside the above stats). This would allow job seekers to identify whether they are meeting a minimum standard they wish to achieve, and perhaps seek suggestions or alter their strategy based on this knowledge.

**Tips to improve Cold response rate** - A checklist of job seeking aids such as resume improvement guides, networking tips, 

## Requirements

### Use Cases

**User is able to open the Stats page and view Cold Response rate**
- Pi chart for visual.
- Different Time Period Settings (All Time, Last week, 1 Month, 3 Months).

**User is able to open the Stats page and view the frequency of their applications, responses (acceptances / rejections), and interviews**
- Graph with time on x-axis and frequency on y.
- Different Time Period Settings (All Time, Last week, 1 Month, 3 Months).

**User is able to click on a section of a graph and view the data that makes up that graph.**
- Have a pop up that lists previous applications, interviews, or responses counted towards a given statistic.
- Compiled when a request to the database for the given user’s statistics is made (i.e. on page opening).

**Users are able to open Stats page and view checklists for cold response rate improvement.**
- Checklist with weekly tasks such as attending a hiring event, attending a networking event, applying to 20 jobs, updating friends and family.
- Updates every week.
- Can be checked manually, or does so automatically (depending on whether the data is known to the app).

**Users can open the Stats page and see the community average statistic (or some estimate) to give context to the data.**
- Next to each graph (or overlaid on it) display an average statistic graph.

### Edge Cases

**User can scroll through listed applications**
- Popup Has set size and ability to scroll 
- Popup can be smaller for not many applications to list 

**User can scroll through time graph or scaling large periods of time.**
- Ensuring that time graph size is independent on volume of data and time

**No data to display**
- List the checklist and average statistics, but simply display “No Data to Display” in lieu of the graphs


## Data Model
We will use PostgreSQL for the database, and store user data there, such that when a user is logged in and would like to see their statistics a simple request can be made that returns only the required data.

**User History**
In order to display a user’s statistics we will retrieve their History.

**Fields**

All fields are required.

“id” (String) - Unique ID and primary key of the user 

“name” (String) - The name of the user, shown in a title style

“applications” (Array<String>) - An array of previous applications 

“acceptances” (Array<String>) - An array of previous acceptances the user received

“rejections” (Array<String>) - An array of previous rejections the user received

“interviews” (Array<String>) - An array of previous interviews the user scheduled

**Application**
In order to display a single application we will use this data type.

**Fields**

All fields are required.

“id” (String) - Unique ID and primary key of the application 

“name” (String) - The name of the user who applied.

“company” (String) - The name of the company that was applied to.

“detailsID” (Long) - The ID of the details of the application, were the user to want to read more.

“title” (String) - Position the user was applying for.

“time” (Long) - Date/time the application was submitted.

## Overall Approach
- The goal is to display useful information in an easily digestible, meaningful way.
- This requires distinct colours, and clear sizing and spacing.
- We also want these statistics to be available in a short amount of time so processing time should be minimized as well as overhead.

### Trade-offs
An alternative would be to ignore any need for history viewing on the user’s end displaying only number totals which could be stored and rapidly displayed for each set time length. 
This would be even faster if only set timelines were allowed to be displayed. 

There is a big tradeoff between user flexibility / customizability and efficiency here.

With that as the comparison, we can talk pros and cons of our chosen approach:
### Pros
- Allows peace of mind in searching through previous job applications and time periods with ease

### Cons
- More efficient / fast

## How Can This Really Break?

This feature is relatively safe, assuming we handle gaps in information with care, so as not to create any system errors.

**Poor Data collected**
- Inaccurate graphs and statistics due to faulty data scraping or data processing. 
- Missing information in email.
- Attenuate by filling in gaps in data with “Unreported” or something, and testing for accuracy

**No data for a specific time period or at all**
- If the client requests their data from the past three months but they’ve only been on the app, an error might occur. 
- Need to ensure that out of bounds database requests are properly handled, and ignore non-existent data.


## Potential Future Improvements
These will be ordered in terms of likelihood/priority descending (i.e. iterations we are most likely to do come first).

- Sharing the Statistics (By link or email)
- Other kinds of statistics (networking based, event based, etc)
- User ability to edit checklist suggestions (add or remove them)

## Questions
1. How many statistics are relevant to the user?
2. What’s the best way to display the data?



