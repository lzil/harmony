############# 2015 6.470 PROJECT - I_CAN_PHYSICS #############

#INTENT:
To build a website that allows users to compose and edit music together and at the same time.

#TO-DO:
-database of music
-Profile: CSS, make it so "save changes" saves everything instead of just the last textbox
-Editor: keyboard, positioning of playback/download/etc. Limitation of chatbox to last 10 messages. Box showing who made the last edit.
-Tutorial: everything.
-About us: everything.


#PATHS:
So the most confusing stuff will probably be in the /physics folder. Important directories/locations of relevant files:

-physics/app/views/static_pages		:where some .html files are. Contains "home" (main page), "dashboard" (dashboard).
-physics/app/views/users			:where other .html files are. Contains "show" (which is user profile), "index" (list of users).
-physics/app/assets/stylesheets		:where ALL your .css/.css.scss files go. Please merge into "style.css.scss" and ensure that class names don't conflict; ignore other files here.
-physics/app/assets/javascript		:where ALL your .js files go. Simply move files into this folder and all pages will have access to them.
-physics/app/assets/images			:where ALL your images go. Simply move files into this folder and all pages will have access to them, with use of <%= image_tag "image-name-here.jpg" %>.

Everything else just talk to Liang about.
