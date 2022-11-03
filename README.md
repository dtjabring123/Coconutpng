# Coconut.png

Welcome to the repository for Coconut.png which will be used as the form of continuous integration for our SDP Project: Wits Overflow

## The Team

The Group Members and their roles are listed below:

2353785 - Duran Reddy {NoName-0512} (Database Implementation and Admin)

2323965 - Nelson Okafor {ebucs} (Front-End)

2358894 - Yoshailen Michael {Lord-Y14} (Back-End)  

2302997 - Dylan Tjabring {dtjabring123} [SCRUM MASTER] (Testing)

## Hosting
The project was developed using local hosting, however, as a polished feature, we decided to host it online. The link to the website is:
 
https://witsoverflow-5e429.web.app/

Should the client want to host it on their own domain, this can be easily set up and configured

## Security
The project is using Firestore's Firebase Database as a means of authentication and database storage. As this requires a 'token' to link the application to database, leaving it visible in a public repository is not very secure. Unfortunately, it is not possible to hide the configuration token as then the Test-Driven-Development and Continuous Integration tools will fail. As such, we implemented security rules using Firebase's Security Rules Specification tool. These can be summartised to:

Note, that these restrictions apply for registered users that are logged in and are not banned
1. Any user can read and create questions; responses and comments.
2. Any user will have the ability to create a report or a ban request (necessary due to the auto creation of bans), but only admins will be able to view the reports and bans.
3. The reading and writing of the user docs can only be done by the specified user or an admin.

## Documentation
Most documentation can be found within the Wiki of this repository. Unfortunately, due to picture size and compression, some of the UML diagrams have become distorted and thus reduced their readability. To remedy this, the diagrams in their full factor were submitted (alongside all other documentation not included in the Wiki) to Moodle.

##Badges
[![Coconutpng](https://circleci.com/gh/dtjabring123/Coconutpng.svg?style=shield)](https://app.circleci.com/pipelines/github/dtjabring123/Coconutpng)
[![codecov](https://codecov.io/gh/dtjabring123/Coconutpng/branch/main/graph/badge.svg?token=JXHN6KRQH0)](https://codecov.io/gh/dtjabring123/Coconutpng)



