# Lewis Structures App for Teachers

## Description
Welcome to the Purseev implementation of this Lewis Structures App that allows users to draw Lewis Structures between atoms.

The app allows you to drag-and-drop atoms on a stage, drag lines between unpaired electrons,
and check structures to see if they are valid.

After submission of a structure, a progress bar marks that question as either correct (green) or incorrect (red).
Users can still submit and receive feedback on that same molecular structure, though their score will not change.

Each game has five rounds, after which point users can start a new game which resets their score.

## Why We Built This Project
Chemistry teachers and instructors face a difficult problem in that there are some skills for which it is difficult to provide instant feedback. One of those skills is drawing Lewis Structures. Students can either work directly with an instructor or tutor, or they can do practice problems and check their answers with an answer key.

Teachers are aware that many students do not practice correctly when using textbook problems and answer keys. Students often look at the answers and come to the conclusion that, because they can rationalize a given solution, they understand how to draw the structures. On formal assessments, such as in-person tests and quizzes, students 
often are surprised when they cannot replicate the structures they have seen in answer keys.

Students need to be able to practice the skill of drawing Lewis Structures and receiving immediate feedback without a teacher's or instructor's presence. 

This game allows students to draw bonds, delete them, and redraw them while getting immediate feedback upon submission. Students can then continue to work on the same structure and receive feedback. This places the focus on learning, rather than on getting the answer correctly the first time. 

## Note for Educators
Please note that there is a prior level to this game that has not yet been deployed that assesses students' ability to draw the valence electrons around an element symbol in such a way as to clearly show which electrons can participate in bonding. Therefore please note that this game relies on drawing valence electrons in the following manner:

- Draw one electron on each side of an invisible box around the element symbol.
- Do not put two electrons on one side of the invisible box until each side has one electron.
- Each side can have a maximum of 2 electrons.
- Only unpaired electrons can bond.

In this game, the purpose is to allow students to begin to familiarize themselves with the concept of the octet principle by visually seeing that single electrons must be bonded to another single electron in order to be considered paired.

Please help us improve this teaching tool by filling out [this survey][1] so we can better help students and teachers in the future! 

[1]: https://forms.gle/9XQETpKJN6jKNrc88

## Game Play
- Click "Start New Game" to make API call, which returns a molecular formula and generates the required atoms.
- Drag and drop atoms into desired positions.
- Click and drag lines between unpaired electrons.
- Click a bond to delete it.
- Click the reset arrow to delete all bonds.
- Click the "Submit" button to receive feedback on structure's validity.
- You may continue to edit bonds until you click the "Next Molecule" button.
- After 5 questions reset your score and start again with the "Start New Game" button.

## Deployment
This project makes calls to our API that holds molecular formula data. At this time only the molecular formulas are 
contained in the database, though eventually these molecular formulas will also be ranked by difficulty and contain 
images of the correct structure. The API can be reached by visiting https://lewis-structures.purseev-api.com/lewis_structures_main 
with endpoints "/molecules" or "/molecules/<molecule_id>"

The game can be played by the public at https://www.purseev.com.


## Instructions

- Fork this repository
- Clone your forked repository
- If you have not already, install yarn with `npm install --global yarn`
- Run `yarn install` to install project dependencies
- Commit and push
- Run project on your local machine with `yarn start`

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# purseev-lewis-structures-front-end
