# Technical Assignment: Growth Group

## Optimized Virtualized Masonry Grid with Detailed Photo View

### Objective
Create a Single Page Application (SPA) that showcases your React skills, particularly in implementing a responsive, optimized, and virtualized masonry grid layout along with a detailed view for photos.

[View the test details](./test.pdf)

### Installation
1. Install dependencies:
   ```bash
   npm i
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to the URL shown in the console, such as:
   ```
   http://localhost:5173/
   ```

### Tests
Run the test suite:
```bash
npm run test
```

### Features
- **DDD with Hexagonal Architecture:** Use of Domain-Driven Design (DDD) with Hexagonal Architecture for a clean and scalable code structure.
- **Lazy Loading:** Deferred loading of resources to improve the initial performance of the application  without using an external library.
- **Infinite Scroll:** Implementation of infinite scroll to load more photos as the user scrolls without using an external library.
- **Responsiveness:** The application is fully responsive across devices. I created a CSS Reset. Using **styled-components**  without using an external UI Kit.
- **Error Handling**: Every request show a message when it fails, managing the error properly. 
- **Testing:** Implementation of tests to ensure the quality and stability of the application. Using **Jest** and **React Testing Library** for testing.
- **Web Vitals Monitoring:** Integrated tools to analyze performance metrics such as CLS, FCP, INP, LCP, and TTFB for an enhanced user experience.

### How I Ensured the Application's Performance and Any Tools or Techniques I Used
- **Lazy Loading using IntersectionObserver:** To ensure smooth performance and reduce initial loading time, I used the IntersectionObserver API to lazy-load images only when they are about to enter the viewport. This minimizes the number of images loaded at once and improves overall page load times.
- **Infinite Scroll:** I implemented infinite scroll by detecting the scroll height of the page applying **requestAnimationFrame** to improve the performance. When the user reaches the bottom, a new page request is triggered to fetch additional images. This allows for a continuous user experience without reloading the page.
- **Image Size:** Smaller image sizes are used for the gallery and larger sizes for the detailed view, which contributes to smoother scrolling in the gallery.






