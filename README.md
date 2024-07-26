# HumanForce-Assessment
This contains the technical assessment for Human force

Playwright must be installed before test can be run

`npx playwright test` to run the test
feature test plan is stored in the features folder

node v17 or higher would be required to run the tests due to the `fetch` function used

Tests have been configured to run in serial mode instead of parallel. Though not an ideal 
practice, it has been set up this way to re-use some of the set values from above
instead of relying on ids or values set up in the petstore API
