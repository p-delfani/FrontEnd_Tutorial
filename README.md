# HTML and CSS: A Complete Beginner-to-Expert Guide

Welcome to this comprehensive tutorial designed to take you from a complete beginner to a professional in HTML and CSS — the essential technologies of the web.

## Table of Contents

- [Introduction](#introduction)  
- [Understanding the Web](#understanding-the-web)  
- [HTML — HyperText Markup Language](#html-—-hypertext-markup-language)  
  - [What is HTML?](#what-is-html)  
  - [HTML Tags & Elements](#html-tags--elements)  
  - [Basic HTML Page Structure](#basic-html-page-structure)  
  - [Core HTML Elements](#core-html-elements)  
  - [Semantic HTML](#semantic-html)  
  - [HTML Forms](#html-forms)  
- [CSS — Cascading Style Sheets](#css-—-cascading-style-sheets)  
  - [CSS Basics](#css-basics)  
  - [Applying CSS](#applying-css)  
  - [CSS Selectors](#css-selectors)  
  - [CSS Box Model](#css-box-model)  
  - [Typography and Colors](#typography-and-colors)  
  - [Spacing: Margin and Padding](#spacing-margin-and-padding)  
  - [Display and Positioning](#display-and-positioning)  
  - [Flexbox & Grid](#flexbox--grid)  
- [Responsive Web Design](#responsive-web-design)  
- [Conclusion and Best Practices](#conclusion-and-best-practices)

---

## Introduction

This guide covers everything from the basics of HTML and CSS to advanced concepts and best practices. By the end, you will be comfortable building clean, semantic websites and styling them with modern CSS techniques.

---

## Understanding the Web

The web operates through communication between **clients** (browsers) and **servers**.

1. Browsers send requests to servers.
2. Servers respond with HTML, CSS, JavaScript, images, etc.
3. Browsers render these files into the visual webpages users see.

Browsers like Chrome, Firefox, and Edge interpret HTML for content and CSS for styling, making well-structured HTML essential for good results.

---

## HTML — HyperText Markup Language

### What is HTML?

HTML defines the **structure** and **content** of a webpage using elements. It is not a programming language but a markup language that tells browsers how to display content.

### HTML Tags & Elements

An element is usually written with an opening tag, content, and a closing tag:
html
<p>This is a paragraph.</p>
Some elements are self-closing:

html
Copy
Edit
<img src="image.jpg" alt="Example image" />
<br />
Basic HTML Page Structure
Every HTML page begins with this skeleton:

html
Copy
Edit
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My First Website</title>
</head>
<body>
  <h1>Welcome to My Page</h1>
  <p>This is where content appears.</p>
</body>
</html>
<!DOCTYPE html> declares HTML5.

<html> is the root element.

<head> contains metadata like character encoding and viewport settings.

<title> sets the browser tab title.

<body> contains all visible page content.

Core HTML Elements
Text Content
Use headings to structure your page hierarchically:

html
Copy
Edit
<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Sub-subheading</h3>
Paragraphs and text formatting:

html
Copy
Edit
<p>This is a paragraph.</p>
<strong>Bold</strong> and <em>Italic</em> text for emphasis.
Links
html
Copy
Edit
<a href="https://example.com">Visit Example</a>
Images
html
Copy
Edit
<img src="cat.jpg" alt="A cat sitting on a chair" />
Lists
Unordered list:

html
Copy
Edit
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
Ordered list:

html
Copy
Edit
<ol>
  <li>First</li>
  <li>Second</li>
</ol>
Grouping Elements
Use <div> for block containers and <span> for inline:

html
Copy
Edit
<div>This is a block container.</div>
<span>This is inline text.</span>
Semantic HTML
Use semantic elements for meaning and accessibility:

<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>

Benefits include better SEO, accessibility, and code clarity.

HTML Forms
Forms collect user input:

html
Copy
Edit
<form action="/submit" method="POST">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" />
  
  <label for="password">Password:</label>
  <input type="password" id="password" name="password" />
  
  <input type="submit" value="Login" />
</form>
Always pair inputs with labels for accessibility.

CSS — Cascading Style Sheets
CSS Basics
CSS styles HTML elements using selectors and properties:

css
Copy
Edit
p {
  color: #333;
  font-size: 16px;
}
Applying CSS
Three methods:

Inline:

html
Copy
Edit
<p style="color: red;">Red text</p>
Internal (in <style> tags inside <head>):

html
Copy
Edit
<style>
  p { color: blue; }
</style>
External (recommended):

html
Copy
Edit
<link rel="stylesheet" href="style.css" />
CSS Selectors
Target elements in different ways:

Element selector: h1

Class selector: .box

ID selector: #header

Descendant: div p

Child: div > p

Pseudo-class: a:hover

CSS Box Model
Every element is a box with:

Content

Padding (inside space)

Border

Margin (outside space)

Example:

css
Copy
Edit
.card {
  padding: 20px;
  border: 1px solid #ccc;
  margin: 10px;
}
Typography and Colors
Example:

css
Copy
Edit
body {
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.6;
  background-color: #f9f9f9;
  color: #222;
}
Colors can be defined by names, hex, RGB, or HSL.

Spacing: Margin and Padding
Use shorthand for multiple values:

css
Copy
Edit
margin: 20px 10px 5px 0; /* top, right, bottom, left */
padding: 10px;
Display and Positioning
display: block, inline, inline-block, none, flex, grid

position: static, relative, absolute, fixed, sticky

Example fixed header:

css
Copy
Edit
.fixed-header {
  position: fixed;
  top: 0;
  width: 100%;
  background: white;
}
Flexbox & Grid
Flexbox for one-dimensional layouts:

css
Copy
Edit
.container {
  display: flex;
  justify-content: space-between;
}
Grid for two-dimensional layouts:

css
Copy
Edit
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
Responsive Web Design
Make websites look great on any device:

Use relative units (%, em, vw, vh) instead of pixels.

Add viewport meta tag:

html
Copy
Edit
<meta name="viewport" content="width=device-width, initial-scale=1.0">
Use media queries to adapt styles:

css
Copy
Edit
@media (max-width: 600px) {
  body {
    font-size: 14px;
  }
}
Conclusion and Best Practices
Write semantic, accessible HTML.

Use external CSS for maintainability.

Keep code clean and readable.

Test on multiple devices and browsers.

Use browser developer tools for debugging.

Follow naming conventions like BEM for CSS classes.

Validate your code with online validators.









# Task 1 - Personal Profile Website

## Overview
This is a static personal profile website built using only HTML and CSS. The website was developed as part of **Task 1**, and is designed to serve as a simple online resume or portfolio. It showcases basic personal information, work samples, and other relevant details.

## Features
- Fully static and responsive layout
- Clean, minimal design focused on readability
- Sections for personal introduction, portfolio/projects, and contact information
- Built without any JavaScript or frameworks — pure HTML and CSS

## Purpose
The main goal of this website is to provide a simple and professional online presence. It allows visitors to learn more about the individual, view selected works or projects, and find ways to get in touch.

## How to Use
1. Clone or download the repository.
2. Open the `index.html` file in any modern web browser.
3. Customize the content (text, images, links) as needed to fit your own profile.

## Folder Structure
project-folder/
│
├── index.html # Main page
├── style.css # Custom CSS styles
└── assets/ # (Optional) Folder for images, icons, etc.


## License
This project is for personal use and educational purposes. No license is attached by default.
