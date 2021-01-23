# Wolt backend
Wolt Summer 2021 Internship backend assignment
> In this assignment you get to follow in the footsteps of Wolt developers and create a Discovery page. In the backend version you will generate new / popular / nearby restaurant lists from the given data by taking the location of a customer into account.

I completed this task with NodeJs (Express) using TypeScript.

## How to run the code
On the first time install the node modules using
```
npm install
```
Then you can launch the site using
```
npm run build && npm start
```
The server is running at `localhost:4200`

Example request: `localhost:4200/discovery?lat=60.1709&lon=24.941`

**Other commands**

```
npm run dev
```
To run dev server.
```
npm run test
```
To run tests.
```
npm run lint
```
To run linter.

## How it works

1. The server calculates the distances between every restaurant and the given coordinate and if the distance is less than 1.5 kilometers, the restaurant is added to a list of nearby restaurants.
2. Next it gets the 10 most popular, the 10 newest (must be younger than 4 months) and the 10 closest restaurants from the nearby restaurants list and makes separate lists for each one.
  - The restaurants that are currently online are preferred so for example if a restaurant is more popular than another but isn't online, the less popular gets on the list.
  - If there isn't 10 online restaurants in the nearby list for a category, offline restaurants are included in the list after the online ones.
3. After this it constructs all three lists into one JSON object and sends it to the user.
