# HTML and CSS: A Complete Beginner-to-Expert Guide

## Table of Contents

* [Introduction](#introduction)
* [Understanding the Web](#understanding-the-web)
* [HTML — HyperText Markup Language](#html--hypertext-markup-language)

  * [What is HTML?](#what-is-html)
  * [HTML Tags & Elements](#html-tags--elements)
  * [Basic HTML Page Structure](#basic-html-page-structure)
  * [HTML Attributes](#html-attributes)
  * [Common HTML Pitfalls](#common-html-pitfalls)
* [Core HTML Elements](#core-html-elements)

  * [Text Content](#text-content)
  * [Links](#links)
  * [Images](#images)
  * [Lists](#lists)
  * [Grouping Elements](#grouping-elements)
* [Semantic HTML](#semantic-html)
* [HTML Forms](#html-forms)
* [CSS — Cascading Style Sheets](#css--cascading-style-sheets)

  * [CSS Basics](#css-basics)
  * [Applying CSS](#applying-css)
  * [CSS Selectors](#css-selectors)
  * [CSS Box Model](#css-box-model)
  * [Typography and Colors](#typography-and-colors)
  * [Spacing: Margin and Padding](#spacing-margin-and-padding)
  * [Display and Positioning](#display-and-positioning)
  * [Flexbox & Grid](#flexbox--grid)
  * [Advanced Styling Techniques](#advanced-styling-techniques)
* [Responsive Web Design](#responsive-web-design)
* [Conclusion and Best Practices](#conclusion-and-best-practices)

---

## Introduction

Welcome to this complete guide to learning HTML and CSS, the foundational technologies of web development. Whether you're a complete beginner or looking to advance your skills, this document provides an in-depth explanation of concepts, syntax, and best practices.

---

## Understanding the Web

Before diving into HTML and CSS, it's important to understand how the web works. Websites are collections of files stored on servers, which are accessed through browsers. When you enter a URL, your browser sends a request to the server to load the content. That content is written using HTML, styled with CSS, and (optionally) made interactive using JavaScript.

---

## HTML — HyperText Markup Language

### What is HTML?

HTML (HyperText Markup Language) is the standard language used to create and structure the content on the web. It uses elements enclosed in tags to define different parts of a web page, such as headings, paragraphs, links, and images.

### HTML Tags & Elements

HTML elements are defined by tags. A typical HTML tag looks like this:

```html
<p>This is a paragraph.</p>
```

* `<p>` is the opening tag
* `</p>` is the closing tag
* Everything in between is the content

### Basic HTML Page Structure

A simple HTML document structure:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>
```

### HTML Attributes

Attributes provide additional information about HTML elements. They are written inside the opening tag:

```html
<img src="image.jpg" alt="A description of the image">
```

Common attributes include:

* `id`
* `class`
* `style`
* `href`
* `src`

### Common HTML Pitfalls

* Not closing tags properly
* Nesting elements incorrectly
* Forgetting the `alt` attribute for images
* Using deprecated tags like `<center>`

---

## Core HTML Elements

### Text Content

* `<h1>` to `<h6>` — Headings
* `<p>` — Paragraph
* `<strong>`, `<em>` — Emphasis

### Links

```html
<a href="https://example.com">Visit Example</a>
```

### Images

```html
<img src="logo.png" alt="Company Logo">
```

### Lists

* Ordered: `<ol>` + `<li>`
* Unordered: `<ul>` + `<li>`

### Grouping Elements

* `<div>` — Block container
* `<span>` — Inline container

---

## Semantic HTML

Use meaningful tags:

* `<header>`, `<nav>`, `<main>`, `<footer>`
* Improves SEO and accessibility

---

## HTML Forms

Used to collect user input:

```html
<form action="/submit" method="post">
  <input type="text" name="username">
  <input type="submit">
</form>
```

---

## CSS — Cascading Style Sheets

### CSS Basics

CSS controls how HTML elements are displayed. You can apply it in three ways:

* Inline: `<h1 style="color: red;">`
* Internal: `<style>` in `<head>`
* External: link to `.css` file

### Applying CSS

```html
<link rel="stylesheet" href="style.css">
```

### CSS Selectors

* `*` — universal
* `p` — type selector
* `.class` — class selector
* `#id` — id selector

### CSS Box Model

Each element is a box with:

* `content`
* `padding`
* `border`
* `margin`

### Typography and Colors

```css
body {
  font-family: Arial;
  color: #333;
  background-color: #f9f9f9;
}
```

### Spacing: Margin and Padding

* `margin`: space outside element
* `padding`: space inside element

### Display and Positioning

* `display: block | inline | flex | grid`
* `position: static | relative | absolute | fixed`

### Flexbox & Grid

Modern layout systems:

```css
.container {
  display: flex;
  justify-content: space-between;
}
```

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

### Advanced Styling Techniques

* CSS Variables
* Media Queries
* Transitions & Animations
* Pseudo-classes/elements (`:hover`, `::before`)

---

## Responsive Web Design

Design that adapts to screen sizes:

```css
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
}
```

Use flexible layouts, % widths, and `rem` units.

---

## Conclusion and Best Practices

* Separate content (HTML) from style (CSS)
* Use external stylesheets
* Keep CSS organized and modular
* Test on multiple browsers and devices
* Use tools like [W3C Validator](https://validator.w3.org/) and [Can I Use](https://caniuse.com/)

---










# Mastering Flexbox in CSS: A Complete Guide

## Table of Contents

* [Introduction](#introduction)
* [What is Flexbox?](#what-is-flexbox)
* [Why Use Flexbox?](#why-use-flexbox)
* [The Flex Container](#the-flex-container)

  * [display: flex](#display-flex)
  * [flex-direction](#flex-direction)
  * [flex-wrap](#flex-wrap)
  * [flex-flow](#flex-flow)
  * [justify-content](#justify-content)
  * [align-items](#align-items)
  * [align-content](#align-content)
* [The Flex Items](#the-flex-items)

  * [order](#order)
  * [flex-grow](#flex-grow)
  * [flex-shrink](#flex-shrink)
  * [flex-basis](#flex-basis)
  * [flex](#flex)
  * [align-self](#align-self)
* [Common Use Cases](#common-use-cases)
* [Responsive Design with Flexbox](#responsive-design-with-flexbox)
* [Best Practices](#best-practices)
* [Conclusion](#conclusion)

---

## Introduction

Flexbox, or the Flexible Box Module, is a powerful CSS layout model that allows developers to design complex layouts with ease. Unlike traditional box models, Flexbox excels in aligning and distributing space among items in a container, especially when the size of the items is unknown or dynamic.

---

## What is Flexbox?

Flexbox is a one-dimensional layout system that arranges items in rows or columns. It simplifies the process of aligning elements, distributing space, and creating responsive interfaces without relying on floats or positioning hacks.

---

## Why Use Flexbox?

* Easy vertical and horizontal centering
* Control over spacing and alignment
* Dynamic resizing and reordering
* Better layout for different screen sizes

---

## The Flex Container

To start using Flexbox, you need to define a flex container:

```css
.container {
  display: flex;
}
```

All direct children of this container become flex items.

### display: flex

Defines a flex container and enables flex context for all its children.

```css
display: flex;      /* Default: row */
display: inline-flex; /* Behaves like inline-block */
```

### flex-direction

Determines the direction of the main axis (row or column):

```css
flex-direction: row;        /* Default */
flex-direction: row-reverse;
flex-direction: column;
flex-direction: column-reverse;
```

### flex-wrap

Controls whether the flex items should wrap or not:

```css
flex-wrap: nowrap;       /* Default */
flex-wrap: wrap;
flex-wrap: wrap-reverse;
```

### flex-flow

A shorthand for `flex-direction` and `flex-wrap`:

```css
flex-flow: row wrap;
```

### justify-content

Aligns items along the main axis:

```css
justify-content: flex-start;   /* Default */
justify-content: flex-end;
justify-content: center;
justify-content: space-between;
justify-content: space-around;
justify-content: space-evenly;
```

### align-items

Aligns items along the cross axis:

```css
align-items: stretch;   /* Default */
align-items: flex-start;
align-items: flex-end;
align-items: center;
align-items: baseline;
```

### align-content

Aligns multiple rows (when wrapped) along the cross axis:

```css
align-content: stretch;   /* Default */
align-content: flex-start;
align-content: flex-end;
align-content: center;
align-content: space-between;
align-content: space-around;
```

---

## The Flex Items

### order

Defines the order of flex items:

```css
.item {
  order: 2;
}
```

### flex-grow

Defines the ability of an item to grow relative to others:

```css
.item {
  flex-grow: 1;
}
```

### flex-shrink

Defines the ability of an item to shrink relative to others:

```css
.item {
  flex-shrink: 1;
}
```

### flex-basis

Defines the default size of an item before remaining space is distributed:

```css
.item {
  flex-basis: 200px;
}
```

### flex

Shorthand for `flex-grow`, `flex-shrink`, and `flex-basis`:

```css
.item {
  flex: 1 1 200px;
}
```

### align-self

Overrides `align-items` for individual flex items:

```css
.item {
  align-self: center;
}
```

---

## Common Use Cases

* Centering elements
* Equal-width columns
* Responsive navbars
* Layout with fixed and flexible widths

---

## Responsive Design with Flexbox

Use `flex-wrap`, percentages, and media queries to adapt layout for various screen sizes:

```css
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
```

---

## Best Practices

* Use `flex` shorthand for brevity
* Avoid overusing `align-self` unless needed
* Combine Flexbox with media queries for better responsiveness
* Always test layout on various devices

---

## Conclusion

Flexbox offers a flexible and efficient way to layout, align, and distribute space among items. It's a must-know skill for any modern web developer. Start practicing it in your projects to fully harness its power.




---

# Bootstrap: A Complete Professional Guide from Zero to Mastery

## Table of Contents

1. [Introduction](#introduction)
2. [What is Bootstrap?](#what-is-bootstrap)
3. [Why Use Bootstrap?](#why-use-bootstrap)
4. [Installation and Setup](#installation-and-setup)
5. [Bootstrap Grid System](#bootstrap-grid-system)
6. [Responsive Design](#responsive-design)
7. [Typography and Utilities](#typography-and-utilities)
8. [Components](#components)
9. [JavaScript Plugins](#javascript-plugins)
10. [Forms](#forms)
11. [Helpers and Utilities](#helpers-and-utilities)
12. [Customization and Theming](#customization-and-theming)
13. [Best Practices](#best-practices)
14. [Performance Optimization](#performance-optimization)
15. [Bootstrap with JavaScript Frameworks](#bootstrap-with-javascript-frameworks)
16. [Conclusion](#conclusion)

---

## Introduction

Bootstrap is one of the most popular front-end frameworks in the world. Originally developed by Twitter, it provides a powerful and responsive grid system, extensive prebuilt components, and strong JavaScript plugins to accelerate frontend development. This guide covers everything from basic setup to advanced customization and real-world integration.

---

## What is Bootstrap?

Bootstrap is an open-source HTML, CSS, and JavaScript framework designed to simplify the development of responsive, mobile-first websites. It offers a collection of reusable components—buttons, navbars, modals, alerts, and more—and a powerful grid system to layout content efficiently.

---

## Why Use Bootstrap?

* **Speed**: Build responsive websites quickly with pre-designed components.
* **Consistency**: Maintain visual consistency across all UI elements.
* **Cross-browser compatibility**: Supports all modern browsers.
* **Responsiveness**: Mobile-first design philosophy out of the box.
* **Customizable**: Easy to override and extend.

### Bootstrap vs Tailwind CSS

| Feature            | Bootstrap     | Tailwind CSS       |
| ------------------ | ------------- | ------------------ |
| Component-Based    | Yes           | No (Utility-first) |
| Utility Classes    | Limited       | Extensive          |
| JavaScript Plugins | Built-in      | Not included       |
| Theming Support    | Strong (SCSS) | Config-based       |
| Learning Curve     | Low           | Medium             |

---

## Installation and Setup

### Option 1: CDN (Quick Start)

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

### Option 2: Using NPM

```bash
npm install bootstrap
```

### Option 3: Manual Download

Download from [https://getbootstrap.com](https://getbootstrap.com) and link `bootstrap.min.css` and `bootstrap.bundle.min.js` in your project.

---

## Bootstrap Grid System

Bootstrap uses a 12-column responsive grid based on flexbox.

```html
<div class="row">
  <div class="col-md-6">Half Width</div>
  <div class="col-md-6">Half Width</div>
</div>
```

### Grid Classes

* `.container`, `.container-fluid`
* `.row`
* `.col`, `.col-6`, `.col-md-4`, etc.

---

## Responsive Design

Bootstrap provides responsive breakpoints:

| Breakpoint  | Class Prefix   | Screen Width |
| ----------- | -------------- | ------------ |
| Extra small | `xs` (default) | <576px       |
| Small       | `sm`           | ≥576px       |
| Medium      | `md`           | ≥768px       |
| Large       | `lg`           | ≥992px       |
| Extra large | `xl`           | ≥1200px      |
| XXL         | `xxl`          | ≥1400px      |

Use classes like `d-none d-md-block` or `col-lg-6` to control layout.

---

## Typography and Utilities

Bootstrap offers utilities for typography, spacing, colors, etc.

```html
<h1 class="display-4 text-primary">Welcome</h1>
<p class="lead text-muted">This is a subtitle</p>
```

Utilities include:

* `.text-center`, `.text-uppercase`
* `.mt-3`, `.mb-4`, `.p-2`
* `.bg-light`, `.text-danger`

---

## Components

### Common Components

* Buttons: `<button class="btn btn-primary">Click</button>`
* Alerts: `<div class="alert alert-warning">Warning!</div>`
* Cards, Modals, Tooltips, Dropdowns, Navs, Pagination, etc.

Each component is highly customizable and ready to use.

---

## JavaScript Plugins

Bootstrap provides built-in JavaScript-powered components:

* **Modals**
* **Tooltips**
* **Collapse (accordion, sidebar)**
* **Carousels**
* **Toasts**

Example:

```html
<button data-bs-toggle="modal" data-bs-target="#exampleModal">Open Modal</button>
```

---

## Forms

Bootstrap enhances form elements with structured layouts and validation styles:

```html
<form>
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email">
  </div>
</form>
```

Supports:

* Form groups, labels, help texts
* Validation states
* Input groups and layout grids

---

## Helpers and Utilities

Bootstrap includes helper classes:

* **Display**: `.d-none`, `.d-flex`, `.d-inline-block`
* **Positioning**: `.position-relative`, `.top-0`, `.start-50`
* **Sizing**: `.w-100`, `.h-50`
* **Overflow, shadows, borders, etc.**

---

## Customization and Theming

Bootstrap is fully customizable with SCSS variables.

Steps:

1. Install `sass`
2. Create custom `_variables.scss`
3. Import before Bootstrap in your SCSS file

```scss
$primary: #ff5733;
@import "bootstrap";
```

Use tools like Bootstrap Customize or Theming Kits to generate themes.

---

## Best Practices

* Use grid and utility classes for layout
* Don’t override core classes unless necessary
* Leverage components before creating custom ones
* Use semantic HTML structure
* Use accessibility attributes (`aria-*`) for better UX

---

## Performance Optimization

* Only import required modules when using SCSS
* Minify CSS/JS for production
* Defer or lazy-load JS
* Use PurgeCSS to remove unused classes
* Leverage CDN caching for faster load times

---

## Bootstrap with JavaScript Frameworks

### React

Use `react-bootstrap` or plain Bootstrap classes

### Angular

Use `ng-bootstrap` or manually integrate with Bootstrap bundle

### Vue

Use `bootstrap-vue` or native classes

Bootstrap is framework-agnostic and works with any front-end ecosystem.

---

## Conclusion

Bootstrap is a battle-tested framework that enables rapid UI development with built-in responsiveness, accessibility, and cross-browser consistency. Whether you're a beginner building a portfolio or a professional crafting a SaaS dashboard, mastering Bootstrap ensures faster delivery and beautiful design without reinventing the wheel.

Customize it, extend it, and use it to build anything from landing pages to full-scale applications.







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



---



# Task2-FlexBoxProject-Chatbox

A modern, professional chatbox UI built with **HTML5** and **CSS3** (using **Flexbox**, **CSS Variables**, **Google Fonts**, **Animations**, and **Dark Mode**).  
Designed for full responsiveness, accessibility, and a polished user experience without any JavaScript.

---




##  Features

- Fully responsive and mobile-friendly Flexbox layout  
- Dark mode support via CSS variables and media query  
- Smooth fade-in animations for chat messages  
- Google Fonts integration for clean typography  
- Accessible HTML with proper roles and keyboard focus styles  
- Custom scrollbar styling for a modern feel  
- Clean, minimalistic design focused on usability  

---

##  Technologies Used

- HTML5 semantic elements  
- CSS3 with Flexbox layout  
- CSS Variables for theming  
- CSS Animations and transitions  
- Google Fonts (Inter)  
- Responsive design with media queries  

---

##  Key CSS Concepts

- `display: flex`, `flex-direction`, `gap` and `flex-grow` for layouts  
- CSS Variables for easy theming and dark mode support  
- Pseudo-elements (`::after`) for speech bubble tails  
- Accessibility enhancements using `tabindex`, `aria-label` and focus styles  
- Scrollable containers with smooth scrolling and custom scrollbar  
- Media queries for mobile responsiveness  
- Animation with `@keyframes` and `animation-delay` for staggered fade-in  

---

## Code Explanation

### index.html

- Uses `<aside>` for sidebar chat list and `<main>` for chat window for semantic clarity  
- Chat list items are keyboard navigable with `tabindex="0"` and highlight on focus  
- Chat messages container has `aria-live="polite"` to notify screen readers about new messages  
- Input has an accessible label via `aria-label`  
- Buttons have `type="submit"` and proper labels for screen readers  

### styles.css

- Uses CSS variables (`:root`) for colors to enable light/dark theming easily  
- `chat-container` uses `display: flex` with fixed width and height for desktop, responsive on smaller screens  
- Sidebar uses vertical flex layout with gap and scroll overflow  
- Chat window is a vertical flex container with growing message area and fixed header/footer  
- Messages styled with different colors, aligned left/right via `align-self`  
- Speech bubble arrow created with `::after` pseudo-elements and CSS borders  
- Scrollbar is customized for WebKit browsers  
- Dark mode styles apply via `prefers-color-scheme: dark` media query  
- Animations fade in messages with delay for a dynamic effect  

---




