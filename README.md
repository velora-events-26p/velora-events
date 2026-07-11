# Velora Events

Velora Events is a modern event discovery and management platform designed to help users explore, discover, and engage with different events. The platform provides an organized way for users to browse events, view event details, and interact with an intuitive interface.


---

# Project Overview

Finding relevant events can often be difficult due to scattered information across different platforms. Velora Events aims to provide a centralized platform where users can easily discover upcoming events based on categories, locations, and interests.

The project focuses on creating a clean and engaging user experience while demonstrating important frontend development concepts such as:

- Component-based architecture
- Responsive design
- Routing
- Reusable UI components
- Collaborative Git workflow

---

# Features

## Event Discovery

Users can explore available events through a structured interface designed for easy navigation.

Planned functionality includes:

- Browse upcoming events
- View event details
- Search events
- Explore featured events



---


## Navigation

The application uses client-side routing to provide smooth navigation between pages.

Available pages include:

- Home
- Events
- Contact
- Login
- Not Found (404)

---

## Error Handling

A custom 404 page has been implemented to handle invalid routes.

The page provides:

- Clear error messaging
- Navigation back to the homepage

---

# Future Improvements

The following features can be added in future versions:

## Live Event Countdown

Display countdown timers for upcoming events.



## Event Booking System

Allow users to:

- Reserve tickets
- View booking history
- Receive confirmation details

---


# Technology Stack

## Frontend

- React.js
- JavaScript
- Tailwind CSS
- React Router

## Development Tools

- Vite
- Git
- GitHub

---

# Design System

Velora Events uses a modern and elegant design system focused on simplicity, readability, and accessibility.

## Color Palette

### Primary Colors

#### Amber

Used for:

- Primary buttons
- Highlights
- Important actions
- Branding elements



---

### Stone

Used for:

- Backgrounds
- Text
- Borders
- Secondary elements


---

## Typography

The project uses:


Poppins


Poppins was chosen because it provides:

- Modern appearance
- Excellent readability
- Clean UI presentation
- Professional branding style

---

# Project Structure

```text
velora-events/
│
├── public/
│   └── images/
│       └── events/
│
├── src/
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   │
│   │   └── ui/
│   │       ├── badge.jsx
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── input.jsx
│   │       ├── label.jsx
│   │       └── other shadcn components
│   │
│   ├── context/
│   │   └── ThemeContext.jsx
│   │
│   ├── data/
│   │   └── events.json
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Events.jsx
│   │   ├── EventDetails.jsx
│   │   ├── BookEvent.jsx
│   │   ├── MyTickets.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   │
│   ├── lib/
│   │   └── utils.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── components.json
├── eslint.config.js
├── index.html
├── jsconfig.json
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```
---


## Collaboration and Contributions

Velora Events is a collaborative React project. Contributions that improve event discovery, booking functionality, authentication, responsiveness, accessibility, user interface consistency, or documentation are welcome.

To keep the codebase organized and reduce merge conflicts, contributors should work on separate feature branches and submit their changes through pull requests.

### How to Contribute

1. *Clone the repository*

   Team members who have access to the organization repository can clone it directly:

    ```bash
   git clone https://github.com/velora-events-26p/velora-events.git
   ```
   

   External contributors should first fork the repository, then clone their fork.

2. *Navigate into the project folder*

   ```bash
   cd velora-events
   ```

3. *Install the project dependencies*

   ```bash
   npm install
   ```
   

4. *Create a feature branch*

   Create a separate branch for the feature, fix, or improvement you are working on:

   ```bash
   git checkout -b feature/your-feature-name
   ```

   

5. *Sync your branch with main*

   Before starting or continuing your work, ensure that your feature branch has the latest changes from main:

   ```bash
   git pull origin main
   ```

6. *Make your changes*

   Keep each branch focused on one feature or issue. Avoid combining unrelated updates in the same branch.

   Contributors should avoid changing shared files without first communicating with the team.

   

7. *Test the project locally*

   Start the development server:

   ```bash
   npm run dev
   ```

   Before submitting your work, confirm that:

   - The application runs without errors
   - There are no unnecessary console errors
   - All imports and file paths are correct
   - The main routes work correctly
   - Event cards display the correct information
   - Event details open using the correct event ID
   - Search and category filtering work as expected
   - Login and signup links work correctly
   - Booking and ticket features still work where implemented
   - The application is responsive across different screen sizes
   - The stone-and-amber design theme is followed consistently

8. *Stage and commit your changes*

   Stage your changes:

   ```bash
   git add .
   ```

   Create a clear conventional commit:

   ```bash
   git commit -m "feat: add event details page"
   ```


9. *Push your branch*

   When pushing the branch for the first time:

   ```bash
   git push -u origin feature/your-feature-name
   ```

   For later updates to the same branch:

   ```bash
   git push
   ```

10. *Open a pull request*

    Open a pull request from your feature branch into main.

    The pull request should clearly explain:

    - What was added or changed
    - Which files were affected
    - How the feature was tested
    - Any known issues
    - Any remaining work


## Testing

- Confirmed that each event opens using its correct ID
- Tested invalid event IDs
- Confirmed that the layout is responsive
- Confirmed that there are no console errors


Pull requests should be reviewed and tested before being merged into main.

Contributors should not push directly to main unless the team has agreed that the change is part of the initial project setup.



### Collaboration Notes

Before making a major change, communicate with the team to avoid duplicated work or conflicting implementations.

Each contributor should mainly work on their assigned files. Changes involving routes, global styles, dependencies, shared layout components, or the main project structure should be discussed with the team lead first.

After a pull request is merged into main, other contributors should update their branches:

```bash
git checkout feature/your-feature-name
git pull origin main
```

If the repository uses an organization repository as upstream, update the branch using:

```bash
git checkout feature/your-feature-name
git pull upstream main
```



## Deployment

Velora Events can be deployed using:

- Vercel
- Netlify
- GitHub Pages

Before deployment, create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## License

Licensed under the MIT license