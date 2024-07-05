# NASCENT TAKE HOME TEST

## Assignment
Please thoroughly review the provided Assignment requirements PDF for the description.

## Candidate Notes
- Solution allows user to toggle between BTC and ETH trading pairs. Within the modal is an orderbook that displays bids and asks. To the right of the orderbook is a form to submit sell or buy orders, allowing user to input specific prices and quantities. Form validation prevents submitting an order with missing or inaccurate price or amount values. Upon submitting order, modal pops up to confirm the order was successfully sent. Once an order has been placed succesfully, it will show up in the trade window at the bottom of the app.
- Used TailwindCSS to style, as it is easily adaptable and quick on the fly to apply designs
- Used a loader from a library to place hold the orderbook while it's fetching data
- Unit tests for a utility function for rounding numbers, and the common tab component that is used multiple times in the app.

## About the Template

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode along with the mock server\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The mock server is running on [http://localhost:3001](http://localhost:3001).

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
