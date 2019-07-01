<h1>Alt_Work</h1>

<p>Check this out 👉 >> https://alt-working.herokuapp.com

<p>This project was first and foremost born out of a personal frustration when trying to find alternative places to work as a student studing remotely. </p>
<p>After speaking to other students, freelanceers and side-hustlers I found that the problem was a universal one. We all know theres only so long that you can work in your front room, kitchen, bedroom, before you feel the inevitable cabin fever creeping in. </p>
<p>The soloution, on the surface, is simple - find a cafe, a library, or sunny park to work in for the day. Or rent a space in a co-working space, and mingle with likeminded people working toward the same thing as you. </p>
<p>There are two problems with this, however. The first, with the aforementioned cafes and restaurants, is that you may spend the best part of an hour travelling into town, only to find there are no plug sockets for you laptop, the wifi is either slow at best, or paid for, and the background noise means you cant hear yourself think let alone take a call. You're absoloutely starving but you cant really take out the homemade sandwich you bought in with you, so you fork out another £8 for a coffee and a panini. 😡 </p>
<p>And it seems like a minor thing, but you have to limit the amount of times you go to the loo. Sounds trivial, but a big problem. If you've set up in a cafe or the local library in a central London there is no way you're getting up and leaving thousands of pounds in the form of hardware, but more importantly, thousands of hours of blood sweat and (many!) tears in the form of work just sitting on a table for someone to walk off with.</p> 
<p>And theres also no way that you're going to lose the only seat with the solitary plug socket to be taken by everyone else also facing the same problem. </p>
<p>So what about co-working spaces? They are fantastic - you get to network, you can go to the loo as many times as you possibly can dream, drink gallons of decent coffee and get a few insta-worthy shots of the #digitalnomad dream*. </p>
<p>*For a small fee of £350-500 per month. Which lets be honest, just isnt an option for the majority of students, new freelancers and contractors.</p>
<p>So what if you could find out what you need to about a place- before you make all the effort of going there? All the stuff that matters to us? Like wifi, plugs, can I bring in my own food, or does it offer it at a reasonable price? Is it quiet, or if I need a place for a group sesssion, is there lots of space and people who wont mind us getting excited and a bit loud? </p>

<p>Enter Alt_Work. The resource made by a student/freelancer, for students and freelancers. A collborative space where you can not only look up a location and what it offers, but also add a record for a location, so that others can benefit from what others have experienced, and put those precious hours and £'s to the best use you can.</p>



<h1>UX</h1>

<p>The following Use Cases summarise the four main groups of users that would use this app (names changed and stock photos used for anonymity puropses)</p> 

<img src="readme_static/Use_Stories_Cropped.jpg">

<p>The functional specifications driven by these use cases are as follows:<p>

- Search for locations by category

- Search for locations by location

- Search for locations by best_for

- Display information of each location :
	* Address
	* Category
	* Ammenities (wifi etc)
    * Reviews from other users

- Users can upload a new location record

- Location owners can identify themselves as the owner of that location, and maintain business record information:
    * Business Name
    * Address
    * Email/Contact details
    * Profile/Display photo
    * Offers and sales available for users (BYGOF etc)
    

- Users can edit exising location records by way of adding a review

- If information on a location is incorrect users can edit and update

- To make changes or upload new records users must login - this will provide a means of tracking changes. 

In particular, as part of this section we recommend that you provide a list of User Stories, with the following general structure:

As a user type, I want to perform an action, so that I can achieve a goal.
This section is also where you would share links to any wireframes, mockups, diagrams etc. that you created as part of the design process. These files should themselves either be included in the project itself (in an separate directory), or just hosted elsewhere online and can be in any format that is viewable inside the browser.

<h6>Wireframes and Functional flows:</h6>

<img src="readme_static/Layout.png">

<img src="readme_static/Layout_Mobile.png">

<h1>Features</h1>

In this section, you should go over the different parts of your project, and describe each in a sentence or so.

<h2>Existing Features</h2>

Feature 1 - allows users X to achieve Y, by having them fill out Z
...
For some/all of your features, you may choose to reference the specific project files that implement them, although this is entirely optional.

In addition, you may also use this section to discuss plans for additional features to be implemented in the future:

<h2>Features Left to Implement</h2>

Another feature idea
<h1>Technologies Used</h1>

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

<h6>Technologies used in this application:</h6>
As a Flask application app logic has be written in Python 3. 

HTML, CSS, and JavaScript have be used to enhance the look and feel in the following ways.

Rendering of pages was acheived using a combintation of HTML5 and CSS. The Bootstrap 4 framework has been employed to acheive a consistent look and feel across the app and device sizes. 

Javascript, and the JQuery  and ajax frameworks have been used to capture on-click events and modal popups, to enhance user experience and guide usage (prevent accidental deletion of records)

The Alt_Work app is data-driven and relies on a mix of structured and unstructured data. CRUD operations are carried out using NoSQL databse - specifically MongoDB.


<h1>Testing</h1>

In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

Whenever it is feasible, prefer to automate your tests, and if you've done so, provide a brief explanation of your approach, link to the test file(s) and explain how to run them.
<h3>Maunal Testing with Users</h3>
For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

Contact form:
Go to the "Contact Us" page
Try to submit the empty form and verify that an error message about the required fields appears
Try to submit the form with an invalid email address and verify that a relevant error message appears
Try to submit the form with all inputs valid and verify that a success message appears.
<h3>Look and feel</h3>
In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.
<h3>Bugs and Problems</h3>
You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

<h1>Deployment<h1>

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).
<h3>Use of GitHUb</h3>
In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:
<h3>Deploying to Heroku</h3>
Different values for environment variables (Heroku Config Vars)?
Different configuration files?
Separate git branch?
In addition, if it is not obvious, you should also describe how to run your code locally.

Credits

Content

The text for section Y was copied from the Wikipedia article Z
Media

The photos used in this site were obtained from ...
Acknowledgements

I received inspiration for this project from X

