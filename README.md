Another project from TOP curiculum.

The goal of this project was to use ES6 modules in order to separate functinalities of the code and reduce saturation of the main script.

I have split the classes for todos and projects, each in their own module.

I have also created another module for DOM related methods.

\*\*\* Functinallities:

Add project with a title and a due date.

Add todos for each project. A click on a project will render its todos with a title, due date and a checkbox

The challenging part of this project was figuring out how to process the data, having todos inside of their projects. I chose the approach of creating 3 classes. One for todos, one for projects, and one for Project Manager. In this way, todos deal with their data, projects del with todos data, and Project Manager deals with projects data.

Refactoring with ES6 modules was a challenge, but made me understand the power of using them. The biggest benefits that I can see at this point are better organized code and reduced utilisation of the this keyword which results in a cleaner and more readable code.

Finally, this projects data is saved in local storage. This was my first time working with this API and It was quite challenging finding the correct way to read the data from the local storage, and display it back when the application starts.

This is the project that made me learn the most at this point. Still a long way to go, but getting more confident each day.
