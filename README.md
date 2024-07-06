# Dynamic Email Composition Platform

## Overview

The Dynamic Email Composition Platform is a powerful tool designed to simplify the creation and management of email campaigns. Built with modern web technologies, this platform allows users to build email templates using MJML-based drag-and-drop elements, publish campaigns, and track campaign events such as opens, clicks, and deliveries.

## Features

- **Drag-and-Drop Email Builder:** Easily create responsive email templates using MJML-based components.
- **Campaign Management:** Publish email campaigns and manage them efficiently.
- **Event Tracking:** Monitor campaign performance with detailed tracking of events like opens, clicks, and deliveries.

## Technologies Used

- **Frontend:** Vue 3
- **Backend:** Fastify
- **Database:** Prisma with PostgreSQL
- **Monorepo Management:** Turborepo

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- pnpm (v6 or later)
- PostgreSQL

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Khalil-Bchir/Dynamic-Email-Compostion-platform.git
   cd Dynamic-Email-Compostion-platform
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up the database:**

   Ensure PostgreSQL is running and create a new database for the project. Update the `.env` file with your database connection details.

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   ```

4. **Run database migrations:**

   ```bash
   pnpm prisma migrate dev
   ```

### Running the Application

To start the application in development mode, use Turborepo:

```bash
pnpm turbo dev
```

### Testing the Application

1. **Create an email template:**

   Use the drag-and-drop editor to design your email template. Save the template for use in campaigns.

2. **Publish a campaign:**

   Create a new campaign using the saved email template. Define the recipient list and schedule the campaign for delivery.

3. **Track campaign events:**

   Monitor the campaign's performance by tracking opens, clicks, deliveries, and other relevant events.

## Deployment

The Dynamic Email Composition Platform is deployed with the frontend on [Vercel](https://dynamic-email-compostion-platform-app.vercel.app) and the backend on [Render](https://render.com).

## Email Sending and Tracking

Previously, this platform used Brevo and its transactional webhooks for tracking and email sending. In the current demo version, the tracking feature is not available. Email sending functionality is operational using SendGrid. For full tracking capabilities, please configure your SendGrid account accordingly.

## Contributing

We welcome contributions to improve the Dynamic Email Composition Platform! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact [Khalil Bchir](https://github.com/Khalil-Bchir).