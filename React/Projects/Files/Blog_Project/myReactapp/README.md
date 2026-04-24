# SabzBlog – Programming Articles Platform

SabzBlog is a simple React-based blog interface built for learning component-based development in React. The project displays programming articles and educational content in a clean and structured layout.

This project was created as part of a learning exercise and demonstrates how to build reusable components and render dynamic content using React.

## Features
- Component-based architecture with React
- Dynamic rendering of article data
- Reusable UI components (Header, Footer, Article, Button)
- Conditional rendering for subscription plans
- Simple blog-style layout for articles

## Technologies Used
- React
- JavaScript (ES6+)
- CSS

## Project Structure
src/
  components/
    Header/
    Footer/
    Article/
    Button/
  App.jsx
  App.css

## How It Works
The application stores article data inside an array of objects. Each article includes:

- title
- author
- image
- price

These objects are passed as props to the `Article` component, which renders each article dynamically on the page.

Example article object:

{
  title: "Build Your First Resume Project with Python",
  author: "Saeidi Rad",
  img: "/images/example.jpg",
  price: 0
}

## Installation

Clone the repository:

git clone https://github.com/your-username/sabzblog.git

Go to the project folder:

cd sabzblog

Install dependencies:

npm install

Run the development server:

npm run dev

## Project Sections
- Hero section introducing the platform
- Articles section displaying recent programming articles
- Header for navigation
- Footer for page layout

## License
The source code of this project is based on educational materials from the SabzLearn website and is used for learning and practice purposes only.
