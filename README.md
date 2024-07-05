## Notes
- Allows user to toggle between BTC and ETH trading pairs. Within the modal is an orderbook that displays bids and asks. To the right of the orderbook is a form to submit sell or buy orders, allowing user to input specific prices and quantities. Form validation prevents submitting an order with missing or inaccurate price or amount values. Upon submitting order, modal pops up to confirm the order was successfully sent. Once an order has been placed succesfully, it will show up in the trade window at the bottom of the app.
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


