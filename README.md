# INFINITE-SCROLL APP

## Description

#### A simple **infinite-scroll** web application that allows users to browse and favourite photos and videos. This app uses the [Pexels](https://www.pexels.com/) to fetch both photos and videos, offering a seamless and responsive user experience. Users can browse items (photos/videos), favourite them, and have their favourites persist across page reloads using **LocalStorage**. The app supports infinite scrolling, where new items are fetched automatically when the user scrolls to the bottom of the page.

## Key Features

- **Photo and Video Browsing**: The app allows users to browse photos and videos fetched from the [Pexels](https://www.pexels.com/).
- **Responsive Design**: The app is fully responsive and works across desktop, tablet, and phone breakpoints.
- **Infinite Scroll**: The app fetches more data only when the user reaches the bottom of the page.
- **Favourites**: Users can mark items as favourite, and these favourites are saved in the browser's LocalStorage so they persist on page reload.
- **Lazy Loading**: Images are lazily loaded to save bandwidth, with different image resolutions loaded based on screen size and user interactions.
- **Modal Window**: Clicking on an item (photo/video) opens a modal with more details and the ability to toggle its favourite status.
- **Search**: Users can search for specific photos or videos by keyword, and the results are filtered dynamically based on the search term.

## Technologies Used

- **React**: For building the user interface
- **TypeScript**: For static typing and better developer experience
- **Vite**: A fast build tool and development server for modern web projects.
- **CSS**: Custom styles for the application (no CSS frameworks)
- **Pexels API**: To fetch photos and videos
- **LocalStorage API**: For storing favourites persistently

## Installation

#### 1: Clone the repository to your local machine:

<div style="border: 2px solid #333; border-radius: 5px; padding: 10px; background-color: #2d2d2d; color: #f1f1f1; font-family: 'Courier New', Courier, monospace;">
  <span style="color: #f4f4f4; font-weight: bold;">bash</span><br>
  <br>
  <span style="color: #66d9ef;">$</span> git clone https://github.com/KestutisRuockus/vinted-web-academy-homework.git<br>
</div>

#### 2: Navigate to the project folder:

<div style="border: 2px solid #333; border-radius: 5px; padding: 10px; background-color: #2d2d2d; color: #f1f1f1; font-family: 'Courier New', Courier, monospace;">
  <span style="color: #f4f4f4; font-weight: bold;">bash</span><br>
  <br>
  <span style="color: #66d9ef;">$</span> cd vinted-web-academy-homework<br>
</div>

#### 3: Install dependencies:

<div style="border: 2px solid #333; border-radius: 5px; padding: 10px; background-color: #2d2d2d; color: #f1f1f1; font-family: 'Courier New', Courier, monospace;">
  <span style="color: #f4f4f4; font-weight: bold;">bash</span><br>
  <br>
  <span style="color: #66d9ef;">$</span> npm install<br>
</div>

## Configuration

#### 1: Sign up for a [Pexels API](https://www.pexels.com/api/) API key.

#### 2: In root folder create '.env' file.

#### 3: Create API KEY variable:

##### In the '.env' file, declare a variable: 'VITE_PEXELS_API_KEY=your_api'.

## Run the development server:

<div style="border: 2px solid #333; border-radius: 5px; padding: 10px; background-color: #2d2d2d; color: #f1f1f1; font-family: 'Courier New', Courier, monospace;"> <span style="color: #f4f4f4; font-weight: bold;">bash</span><br> <br> <span style="color: #66d9ef;">$</span> npm run dev<br> </div>

#### Your app should now be live at [http://localhost:5173](http://localhost:5173).

## Ideas for Expansion

### · Featured Collections Page

#### This page would display curated collections of photos and videos, handpicked by Pexels, based on themes

### · Live Updates for Favourite Status (For better UX)

#### When a user toggles the favourite status of a photo or video in the modal, the change should immediately reflect in parent component without needing a page reload.
