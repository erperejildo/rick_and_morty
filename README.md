# Getting Started with Create React App

This project is using React and Redux.

You can test it online here:
https://rick-dani-morty.netlify.app

## Commands

- Start project locally: `npm start` (go to http://localhost:3000)
- Runt tests: `npm test`

## Flow

The app has 2 views: list (with all characters displayed) and details (showing information from one specific character).

When we load the list, we fetch all characters, saving them into the store. When this happens, the call is not triggered again.

When moving to details page from the list, we send the character id, so we have access to it. In case we load this page first, we fetch the characters and get the correct one. If from here we move to the list, we don't fetch them.

In details we also fetch the information about the first episode. The character is updated then into the store so if we check again the same character, this information is not fetched again.

Searching, ordering and filtering are available for the list. Mobile and Desktop supported.
