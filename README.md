# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c524665f-4567-4f69-8da4-f861dc4391f7

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c524665f-4567-4f69-8da4-f861dc4391f7) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### Saving contact form submissions

This project now ships with a lightweight Node.js server that stores contact form submissions as JSON files on disk.

Start it locally alongside the Vite dev server:

```sh
# Terminal 1 – API for persisting form submissions
npm run server

# Terminal 2 – Frontend
npm run dev
```

By default the frontend posts submissions to the same origin at `/api/contact`. If your API lives on a different host (for
example when running the provided Node.js server locally on port 3001), set the `VITE_CONTACT_ENDPOINT` environment variable
to the full endpoint URL before building or starting the frontend. Alternatively, define `VITE_CONTACT_API_BASE_URL` (e.g.
`https://example.com`) to automatically append `/api/contact`.

### Connecting to WordPress Contact Form 7

To send submissions directly to a WordPress site that uses Contact Form 7, configure the following environment variables
before building or starting the frontend:

```sh
VITE_CONTACT_API_ENDPOINT=wordpress
VITE_WORDPRESS_CONTACT_ENDPOINT="https://your-site.example/wp-json/contact-form-7/v1/contact-forms/<ID>/feedback"
# Optional: override the field name for the preferred date input if your form uses a custom name
# VITE_WORDPRESS_FIELD_PREFERRED_DATE=preferred-date
# Uncomment if the WordPress endpoint is protected by HTTP Basic authentication
# VITE_WORDPRESS_AUTH_USER=your-username
# VITE_WORDPRESS_AUTH_PASSWORD=your-password
```

When `VITE_CONTACT_API_ENDPOINT` is set to `wordpress`, the frontend automatically switches to the Contact Form 7 submission
flow, including support for optional Basic authentication headers when credentials are provided.

If your Contact Form 7 instance uses different field names, you can override specific mappings with environment variables.
For example, when the desired field for "ご希望の日時" is configured as `your-message` instead of `preferred-date`, set
`VITE_WORDPRESS_FIELD_PREFERRED_DATE=your-message` before building the site.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c524665f-4567-4f69-8da4-f861dc4391f7) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
