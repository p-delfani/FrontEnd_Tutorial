HTML and CSS: A Complete Beginner-to-Expert Guide

Table of Contents

Introduction

Understanding the Web

HTML — HyperText Markup Language

What is HTML?

HTML Tags & Elements

Basic HTML Page Structure

HTML Attributes

Common HTML Pitfalls

Core HTML Elements

Text Content

Links

Images

Lists

Grouping Elements

Semantic HTML

HTML Forms

CSS — Cascading Style Sheets

CSS Basics

Applying CSS

CSS Selectors

CSS Box Model

Typography and Colors

Spacing: Margin and Padding

Display and Positioning

Flexbox & Grid

Advanced Styling Techniques

Responsive Web Design

Conclusion and Best Practices

Introduction

Welcome to this complete guide to learning HTML and CSS, the foundational technologies of web development. Whether you're a complete beginner or looking to advance your skills, this document provides an in-depth explanation of concepts, syntax, and best practices.

Understanding the Web

Before diving into HTML and CSS, it's important to understand how the web works. Websites are collections of files stored on servers, which are accessed through browsers. When you enter a URL, your browser sends a request to the server to load the content. That content is written using HTML, styled with CSS, and (optionally) made interactive using JavaScript.

HTML — HyperText Markup Language

What is HTML?

HTML (HyperText Markup Language) is the standard language used to create and structure the content on the web. It uses elements enclosed in tags to define different parts of a web page, such as headings, paragraphs, links, and images.

HTML Tags & Elements

HTML elements are defined by tags. A typical HTML tag looks like this:

<p>This is a paragraph.</p>

<p> is the opening tag

</p> is the closing tag

Everything in between is the content

Basic HTML Page Structure

A simple HTML document structure:

<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>

HTML Attributes

Attributes provide additional information about HTML elements. They are written inside the opening tag:

<img src="image.jpg" alt="A description of the image">

Common attributes include:

id

class

style

href

src

Common HTML Pitfalls

Not closing tags properly

Nesting elements incorrectly

Forgetting the alt attribute for images

Using deprecated tags like <center>

Core HTML Elements

Text Content

<h1> to <h6> — Headings

<p> — Paragraph

<strong>, <em> — Emphasis

Links

<a href="https://example.com">Visit Example</a>

Images

<img src="logo.png" alt="Company Logo">

Lists

Ordered: <ol> + <li>

Unordered: <ul> + <li>

Grouping Elements

<div> — Block container

<span> — Inline container

Semantic HTML

Use meaningful tags:

<header>, <nav>, <main>, <footer>

Improves SEO and accessibility

HTML Forms

Used to collect user input:

<form action="/submit" method="post">
  <input type="text" name="username">
  <input type="submit">
</form>

CSS — Cascading Style Sheets

CSS Basics

CSS controls how HTML elements are displayed. You can apply it in three ways:

Inline: <h1 style="color: red;">

Internal: <style> in <head>

External: link to .css file

Applying CSS

<link rel="stylesheet" href="style.css">

CSS Selectors

* — universal

p — type selector

.class — class selector

#id — id selector

CSS Box Model

Each element is a box with:

content

padding

border

margin

Typography and Colors

body {
  font-family: Arial;
  color: #333;
  background-color: #f9f9f9;
}

Spacing: Margin and Padding

margin: space outside element

padding: space inside element

Display and Positioning

display: block | inline | flex | grid

position: static | relative | absolute | fixed

Flexbox & Grid

Modern layout systems:

.container {
  display: flex;
  justify-content: space-between;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

Advanced Styling Techniques

CSS Variables

Media Queries

Transitions & Animations

Pseudo-classes/elements (:hover, ::before)

Responsive Web Design

Design that adapts to screen sizes:

@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
}

Use flexible layouts, % widths, and rem units.

Conclusion and Best Practices

Write semantic HTML

Separate content (HTML) from style (CSS)

Use external stylesheets

Keep CSS organized and modular

Test on multiple browsers and devices

Use tools like W3C Validator and Can I Use

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
