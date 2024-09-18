# PlanIT
An app that lets you enter your tasks into different categories and prioritize them with different colors.

## description
this project was intended to build a website for managing tasks. The website accomplishes that by letting a user create tasks and then setting the priority and status of the tasks. the task will appear on a different list depending on its status, and will have a different color depending on the priority.

## usage
once on the website simply click the add button to be presented with a window for adding tasks. If you want to choose a task from our dropdowns they are located at the bottom of the screen. 

## features
this app will let you customize the task by priority and status. its clean and easy to use by just choosing an option from the dropdowns.

## process of development
 we used tailwind CSS for a responsive layout. Our HTMl is sematically structured to logically display the elements. Javascript is hard at work within our site to move around tasks and change their properties. You'll also notice that the tasks remain on the page after it is reloaded. This is because the tasks are stored locally to ensure they are not lost. This was done by adding data objects to arrays injavascript and creating the tasks based on that data.

## challenges
 The javascript was challenging. Initially we had it structured to create tasks based on the user options selected at the time. It needed to be structured in a way that the localstorage data would determine how the tasks are created. This involved using arrays that held objects inside in order to store the data for each task created. That data also needed to be changed and manipulated when the user interacts. This involved breaking everything down into functions and eventListeners.  

## credit
 The Javascript was worked on by Riley with help from Calvin. Fabricio did the CSS, and Smith had the idea for the site and did the presentation. 