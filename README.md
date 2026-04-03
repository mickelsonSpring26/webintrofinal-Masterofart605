# Epic Splatoon Randomizer!
## What?
This will be a website that generates a random weapon for a player to use while playing splatoon. In its simplest form it will just return a weapon to use, but more plans include allowing the user to decide if they want to have the kit selected for them ot they get to choose which one to do. A then more extended plan is to allow the user to filter a list and remove weapons they may not actually have in the game.
I may even have a simpler mode that just chooses a class or secial.
There is more outside of the scope of this that I would like to at least attempt that I will probably add later since I plan to actually use this, such as tracking stats the player has had with the weapon.
## Why?
This is actually an extention of a personal project I started and never finished a long time ago that was much of the same thing. At the time it was just a console project but I allways wanted to do more that that with it, I just didn't know how. Plus this can make it much more accessable.



## Schedule 
I'll be honest I have no Idea if this is a viable plan at all, but I as I get a feel for the progect I will move things around to make it work better, trying to prioratize the bigger stuff on days 2-5 to have less of a work load at the end. Also The **Bold** words are my requirements one or two things may not be listed because they will automatically happen as I go, like using **proper css selecorts* and the *italisized* lines are opptional, either just for now, or the whole duration of the progect.

1. April 01 (15%)
    - [x] **Shared Page Layout** Set up the basic html and styling for the web pages this includes
        - [x] **Nav** a nav bar to get to the other pages
        - [x] **A** links in the nake to make it work
        - [ ] **img** A fun logo for the corner, but just use a placeholder for now
        - [x] **aside** An Aside that will what the active page is used for
        - [x] **Section/article** contains the content of the page, as well as breaking it up inside
    - [ ] Still Needs:
        - [ ] **figure**
        - [x] **list**
    - [x] Some Stlying
    - [ ] Work on "reformatting old files" from next week if I'm done too fast
2. April 04 (30%)
    - [ ] Flesh out the main page with:
        - [ ] **form** A form that contains these inputs
            - [ ] **text** For the User's Name or names
            - [ ] **Number** The number of people to generate for at a time
            - [ ] **Select** Choose if you want kits or not
            - [ ] **Reset** Clears the inputs
            - [ ] **Submit** Submit the inputs
        - [ ] A place to contain the output, in for of a console to allow the user to look at past results
        - [ ] A box with the current weapon with a portion for "use stats"
    - [ ] **Domain** Handle collecting the input of the form
    - [ ] Take my old files and reformat them to work as arrays of objects
        - [ ] Name
        - [ ] IsKit
        - [ ] Class
        - [ ] *Special*
        - [ ] Stars
3. April 08 (40%)
    - [ ] Create a backend to take the files and convert them to a list the program can use
    - [ ] Use random to select an item from the list and send it to the frontend when **event Listener** activates
    - [ ] **Filter** Use a filter to remove weapons with kits before the random
    - [ ] **Read Query String** To track a username, and use **local Storage** to save that users preferance.
4. April 11 (50%)
    - [ ] **multiple pages** Page 2 list of weapons
        - [ ] create what appears to be a table with a row for each weapon that contains it's stats
        - [ ] **search bar** filters the table and **mofdifies the dom**
        - [ ] *buttons to sort the table by that row*
5. April 15 (70%)
    - [ ] Buffer Week, Catch up if I need to, if not start working on user costomized lists
        - [ ] *check box on page 2 to allow list editing*
        - [ ] *I suppose **Drag and drop** to take stuf from avialable list and put it in a custom list*
        - [ ] ***Locally Store*** *this as the user's custom list*
        - [ ] *Add and option on page 1 to use the list instead of the random*
            - [ ] *Takes a random selection from the users list*
        - [ ] *When there is no user the user can make a custom list, The custom list is created blank with a new user*
6. April 18 (80%)
    - [ ] if I had to use the buffer week then do the *optional* stuff from there this week, But if I did get it done... Break page 2 into 2 pages, one that has the detailed stats, and one for eddting the list that is more bare bones, (it would look better less crammed)
    - [ ] *Add extra stuff to page 2 stats*
7. April 22 (90%)
    - [ ] Final touchups in the style and HTML department All things listed here I can do while doing Style eariler, I just wanted it all in one spot
        - [ ] Entire layout is **Flex**
        - [ ] Buttons and boxes highlight when **hovered** and have propper **transition**
        - [ ] Page 2 rows grow slightly when hoverd. Every other row (**nth child**) is a different color
        - [ ] Navbar across top
        - [ ] Aside on the left
        - [ ] Page one has a recreation of a the computer console in the center
        - [ ] Replacing the placeholder I mentioned before

