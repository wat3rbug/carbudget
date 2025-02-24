<h1> Carbudget website</h1>

<h2>Purpose</h2>

This website was built because my wife and I had a debate about how much money was being spent on a project car I was building.  Its a 1990 BMW 325i that has the original motor, but I wanted to turbo charge it.  Since I didn't know the exact numbers and she was eyeballing it, I decided to build this website as a way of tracking expenses related to the project.  It is meant to have mulitple users with multiple cars each, with multiple projects for each car.  The projects start out with an estimated project cost, and then individual tasks are added to the project, each with their own costs.  It took a few days because of the initial learning curve and the time it takes to get the edge cases to work.  The code isn't that complicated.  Theres no advanced algorithmns other than the complexity associated with making SQL calls with multiple joins to produce the desired results.

<b>NOTE:  This is not meant to be built for the wild as there is essentially no authentication.</b> I wasn't trying to show how trendy I can be while trying to keep up with the latest authentication trend, merely that I can design for multiple users.

<h2>Current Goals - <i>last updated 23 Feb 2025</i></h2> 
<ul>
  <li>Make a cars page, with optional photo<ul><li>Need the photo section working. It worked a few years ago, but needs s rework.</li></ul></li>
  <li>Need a projects page, so that projects can be added or modified as well as their predicted budgets</li>
  <li>Need a tasks page that keeps track of tasks associated with various projects.  
    <ul>
      <li>It needs the car link to show a photo of the car.</li>
      <li>It needs buttons for adding tools, parts, and procedures</li>
    </ul>
  </li>
  <li>Vendors page needs to move to the back of the list</li>
  <li>Parts page needs a rework.  
    <ul><li>Its missing shipping and arrival dates and some of the buttons dont work(they used to work).</li>
    </ul>
  </li>
  <li>Tools Page needs a rework as well, for the same reasons as the parts page.</li>
  <li>Possibly make an inventory page, which may reference where a part or tool is going</li>
  <li>Make the preference page.  I believe this is where I stopped because I got really involved in work and no longer had time to contribute to this project.</li>
</ul>

<h2>Notable directories</h2>

<ul>
  <li>config - handles the configurations related to the services required
    <ul>
      <li>web - has the base configuration needed for the website -think training website and basic functionality</li>
      <li>database - has the scripts needed to build permissions for use aw well as tables for the website</li>
    </ul>
  </li>
  <li>html - has the bulk of the website, the js directory, repo directory, etc.</li>
</ul>


