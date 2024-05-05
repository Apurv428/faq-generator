# Table of Contents
- [Table of Contents](#table-of-contents)
- [FAQ Generator](#faq-generator)
  - [Features](#features)
  - [Demo](#demo)
  - [Installation](#installation)
  - [How to use the FAQ Generator?](#how-to-use-the-faq-generator)
  - [Conclusion](#conclusion)

# FAQ Generator

The FAQ Generator is a tool designed to generate frequently asked questions (FAQs) from text. It leverages the power of GROQ's models to analyze the content and automatically generate questions and answers based on that content. The tool aims to reduce the workload of developers and make life easier for them.

## Features

- Automatically generates FAQs from text.
- Provides a user-friendly web interface for input and output.
- Option to copy the faqs on clipboard

## Demo

https://github.com/Apurv428/faq-generator/assets/84929607/f6ce223c-b84a-4579-9ab9-e4b115b30b09

## Installation

If you want to examine the source code or change some things according to your needs, you can install it by following these steps:

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/Apurv428/faq-generator
   ```

2. Navigate to the project folder:
   ```bash
   cd faq-generator
   ```

3. Install the required dependencies for client:
   ```bash
   npm i

4. Install the required dependencies for server:
   ```bash
   cd api
   pip install -r requirements.txt
   ```

5. Now you need to set up environment variables by creating a .env file in the project root directory and adding the following variables:
  
  - GROQ_API_KEY

6. As the last step, you can run the program on your local machine by entering this command into your console:
   ```bash
   npm run dev
   ```
   You can access the interface by navigating to http://localhost:3000 in your web browser.

## How to use the FAQ Generator?

The tool has a very simple interface. It has a search bar where the user enters the text and a generate button that initiates the backend process. Once the FAQs are generated, they will be displayed on the page. The user can copy the FAQs to the clipboard.

## Conclusion

In conclusion, the FAQ Generator tool provides a seamless solution for automatically generating frequently asked questions from text. The FAQ Generator simplifies the process of FAQ generation and enhances developer productivity.
