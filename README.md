# Timesheet System ( In-progress )

This project is a timesheet management system where employees can add and commit their hours on a daily basis by selecting projects or non-project tasks. Employees can also add hours on a weekly basis. The system includes a mechanism to manage maximum weekly hours, handle overtime, and manage approval workflows.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

The timesheet system allows employees to add and commit their working hours for different tasks. Employees can select either project or non-project tasks, provide details, and track their hours on a daily and weekly basis. There is a maximum weekly hours limit, and any hours beyond this limit are counted as overtime. The system includes a workflow for submitting hours for approval, where managers can approve or challenge the submitted hours, adding comments for each day.

## Features

- Add and commit hours on a daily basis by selecting project or non-project tasks.
- Track hours on a weekly basis with a maximum weekly hours limit.
- Handle overtime calculations when committed hours exceed the weekly limit.
- Submit hours for approval, with a workflow for manager review.
- Managers can approve or challenge submitted hours, with comments.
- Employees can justify or reconsider hours if challenged by a manager.
- Separate page for managing projects and weekly hours.
- Employees can view their previous week's hours.
- Admin role with full access to manage projects, weekly hours, and view all data.
- Manager role to approve or challenge employee hours.
- Employee role to commit hours.
- Login system with email authentication for admins, managers, and employees.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Radix UI](https://www.radix-ui.com/)
- [React Query](https://react-query.tanstack.com/)
- [React Context](https://legacy.reactjs.org/docs/context.html)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Class Validator](https://github.com/typestack/class-validator)
- [Class Transformer](https://github.com/typestack/class-transformer)
- ...

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm
- yarn ( I didn't apply/check that, because unfortunately I am a windows user )

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```

2. Install dependencies for the frontend:
    ```bash
    cd frontend
    npm install
    ```

3. Install dependencies for the backend:
    ```bash
    cd backend
    npm install
    ```

4. Create a `.env` file in the `server` and `front` directory and add your environment variables:
    ```env
    DATABASE_URL=your-database-url
    JWT_SECRET=your-jwt-secret
    
    NEXTAUTH_SECRET=your-nextauth-secret
    ```

## Usage

### Running the Development Server

1. Start the backend server:
    ```bash
    cd backend
    npm run start:dev
    ```

2. Start the frontend server:
    ```bash
    cd frontend
    npm run dev
    ```

## Folder Structure

Provide an overview of the project's folder structure.

```
timesheet-pro/
├── timesheet-server/
│   ├── src/
│   │   ├── auth/
│   │   ├── hours/
│   │   ├── project/
│   │   ├── record/
│   │   ├── schemas/
│   │   ├── app.service.ts
│   │   ├── app.module.ts
│   │   ├── app.controller.ts
│   │   ├── main.ts
│   │   └── ...
│   ├── test/
│   ├── .env
│   ├── package.json
│   └── ...
├── timesheet-front/
│   ├── app/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── hours/
│   │   ├── images/
│   │   ├── lib/
│   │   ├── project/
│   │   ├── store/
│   │   ├── timesheet/
│   │   ├── utils/
│   │   ├── layout.tsx
│   │   ├── NavBar.tsx
│   │   ├── page.tsx
│   │   ├── ValidationSchemas.tsx
│   │   └── ...
│   ├── public/
│   ├── .env
│   ├── package.json
│   └── ...
├── README.md
├── LICENSE
└── ...
```

## Contributing

(not recommended, because work is in-progress)

If you want to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

Email - [hafnan03@gmail.com](mailto:hafnan03@gmail.com)
