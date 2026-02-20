
# Polling App — Local Setup Guide

A full-stack polling application built with Next.js, Apollo GraphQL, Prisma, and PostgreSQL, orchestrated with Docker Compose.


## Prerequisites

Make sure you have the following installed before proceeding:

- [Docker Desktop] (includes Docker Compose)
- [Node.js 20+]

---


## Quick Start (Docker — Recommended)

### 1. Clone the repository

### 2. Start everything

```bash
docker compose up --build
```

This will:
- Start PostgreSQL and wait until it's healthy
- Start the GraphQL server at `http://localhost:4000/graphql`
- Start the Next.js frontend at `http://localhost:3000`




## What You Can Do

The app is designed to be flexible — you don't need an account to participate.

### Browsing Polls
- View all available polls on the **Polls page**
- Click into any poll to see its **Poll Details page** — view the question, options, and current vote breakdown
- No login required to browse

### Voting
- Vote on any poll from the **Voting page**
- **One vote per poll** — once you've voted you cannot change it
- Vote as a **guest** (no account needed), as an **anonymous user**, or as a **logged-in user**
  - Guest votes are counted but not tied to any identity
  - Anonymous mode hides your username even if you're logged in
  - Logged-in votes are recorded under your username

### Creating Polls
- Create a poll from any mode — **guest**, **anonymous**, or **logged in**
- Set a title, description, and add your answer options
- Choose **anonymous mode** to hide your identity as the poll creator
- Logged-in users have their username shown as the creator (unless anonymous mode is on)

### Accounts
- **Register** with a username to get a persistent identity across sessions
- **Log in** to have your votes and created polls tied to your account
- Logging in is optional — the full app works without an account

---
