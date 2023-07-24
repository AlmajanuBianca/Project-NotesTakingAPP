# Project-NotesTakingAPP

Used:
-> vscode
-> backend: nodejs, javascript
-> frontend: react, html, css
-> database: mariadb

Functions:
--------------------------------------------- SIGN IN
-> Check if both fields corresponding to email and password are filled in + ALERT if not
-> Check the existence of the account in the database + ALERT if it does not exist
-> Store data about the user in localStorage


--------------------------------------------- SIGN UP
-> Check if all fields are completed + ALERT if not
-> Check if the email is written properly with @stud.ase.ro + ALERT if not
-> Check the uniqueness of the email in the database + ALERT if email repeats itself
-> Create a user in the database
-> Store data about the user in localStorage


--------------------------------------------- MAIN PAGE
-> Displays the user's email in the upper left corner
-> The user can access his list of notes
-> The user can create a study group and add colleagues to his group
-> The user can filter the notes (by tag (type of course/seminar activity), by keywords in the body of the note, by subject, by the date the note was created, the filtering conditions being applied simultaneously) and then is able to view the notes obtained after filtering. If no note meets the conditions imposed by the user, the full list of notes will be displayed
-> Shows the study groups the user belongs to with 3 options (leaving the study group, adding new members and viewing notes related to the respective group)
-> Leaving involves 1 check: if the user is the administrator of the respective study group, then his exit means the definitive deletion of the study group along with the elimination of all members and notes, but if he is just a simple member, then it does not affect the study group in any way
-> Adding new members can only be done by the administrator of the respective study group
-> Viewed notes are all notes that have been shared with the study group by any of its members
-> The user can log out from the upper right corner


--------------------------------------------- THE NOTES TAKING PAGE
-> The user can add new notes to his notes list, which will be automatically saved in the database
-> The user can view his entire list of notes both in the preview mode, which is of the react markdown type, and also in the editing mode
-> The editing mode involves editing the text of the note, the title, the type of course/seminar activity and the subject automatically updating both in markdown (down in the preview) and in the list. When the user clicks on the save button, all changes are automatically saved in the database, changing the date with the date of the last change + SAVE ALERT
-> The user can delete his notes, they disappear both from the list and from the database
-> The user has the possibility to integrate content from other sources to take notes, such as accessing a YouTube link, the video appearing in the lower half of the page and the body of the note in the upper half, the note being saved automatically
-> The user has the option to add attachments, such as adding from a pdf (having the pdf on the right, and the body of the note on the left, this being saved automatically)


--------------------------------------------- CREATE A STUDY GROUP
-> Check if all required fields are completed + ALERT
-> Check if the emails entered: exist in the database, are not repeated and none of them are the email of the user who created the study group + ALERTS
-> At least one colleague must be added to the group, and the user who creates the group is automatically added as an administrator (only he can add other people and if he leaves the study group, the study group itself is deleted)
-> Once the study group is created, it returns to the main page where the user can see it in the list of study groups


--------------------------------------------- THE FILTERING PROCESS
-> Checks if filter conditions have been selected then applies them simultaneously displaying the selection result. If there are notes that correspond, it displays those, if not, then it displays the full list
-> When the list of organized notes is displayed, the user has the option to view the note in markdown mode
-> The user can upload the note to a study group by entering the study group ID that also appears on the main page. It requires 3 checks: the study group must exist in the database, the user must be part of the study group and the note he wants to add to the study group must not have already been added (because any note in the group is automatically modified the moment the user to whom it belongs edits it).
-> The user has the option to share the note with a colleague by entering his email. This process involves the creation of a new note with a new ID and the user ID corresponding to the email of the colleague so that the changes made by one user do not affect the note of the other user + 2 checks: the email must exist in the database, it must not belong to the current user


--------------------------------------------- THE NOTES IN THE STUDY GROUP
-> Any member can view the notes from the study group he belongs to
-> Only the member who added the note can delete it
