# Grocery List

<details>
<summary>Problem Statement</summary>

- Source: https://equalexperts.github.io/ee-tech-interviews-uk/grocery-list-problem.html
- Version: 5b8d0fd276b6d288905ed2f63a934e057e8feca2

## Overview

This is a full-stack exercise with a backend API and a web front end. You will need to manage your time so you have an end to end solution at the end of the exercise.

Please write code delivering the requirements that follow. Write code that you would be happy delivering to a paying client, keeping in mind the simplicity comments below.

You should not find this test to be particularly difficult. It is designed to be a straightforward coding exercise and it should take you no more than 90 minutes. One thing we are interested in is to see which compromises you make to stay in this sort of timeframe. It’s more important that we can see how the development would continue than for every feature to be present.

## What we are looking for:

**Test Coverage:** The solution should be developed “test-first”, and should have excellent unit tests and test coverage.

**Simplicity:** We value simplicity as an architectural virtue and a development practice. Solutions should reflect the difficulty of the assigned task, and should not be overly complex. Layers of abstraction, patterns, or architectural features that aren’t called for should not be included.

**Self-explanatory code:** The solution you produce must speak for itself. Multiple paragraphs explaining the solution are a sign that it isn’t straightforward enough to understand purely by reading code, and are not appropriate.

## Deliverable

**Include a readme:** Please include a readme file in the root of the project which states any requirements and commands needed to run the code. Assume the reviewer is unfamiliar with your choice of framework and/or build tools and maybe using a different IDE.

**This version number:** Please include the version number 5b8d0fd276b6d288905ed2f63a934e057e8feca2 in a README file with your submission so we know what version of the instructions you’ve been given.

## The problem

We’d like you to write a basic grocery list comprising a backend API and a web frontend with Equal Experts branding. You can use whatever frameworks you prefer, or not use frameworks at all.

We’re expecting the grocery list to be persisted by a service but in an effort to simplify this we’re happy if the service just holds data in memory.

The grocery list could have functionality like Google Keep where we can add lines, view a list, strike through when a purchase has been made or similar. Or you may take an alternative approach.

</details>

---

## Description

A basic branded grocery list app with the following functionality

- create a list
- view a list
- delete a list
- add items to a list
- delete items from a list
- mark items as completed on a list

## Conclusion

[See discussion](https://github.com/dideler/equal-experts-challenge/discussions/3)

## Setup

1. Install dependencies with `npm install`
2. Run tests with `npm run test`
   1. Run unit tests with `npm run test:unit`
   2. Run feature tests with `npm run test:feature`
3. Run static checks with `npm run check` (unused CSS, a11y hints, TS errors)
4. Run the code formatter with `npm run format`
5. Run the dev server with `npm run dev`

## Production

The app is not deployed to a production environment.
However, you can create a production build with `npm run build`.
Preview the build with `npm run preview`.
