# Voting App

## Summary

This is a very quick implementation, of a voting app with the following rules:
 - Must be signed in to vote
 - Can see the results whether signed in or not
 - Results are in the format of name | count
 - User can vote only once
 - User can choose existing candidate or add a new (adding a new constitutes a vote)

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd voting-app-interview-exercise-main
   ```

2. **Install Ruby gems:**
   ```bash
   bundle install
   ```

3. **Install JavaScript dependencies:**
   ```bash
   yarn install
   ```

4. **Set up the database:**
   ```bash
   rails db:setup
   # or, if you already have a database:
   rails db:migrate
   rails db:seed
   ```

5. **Run the Rails server:**
   ```bash
   rails server
   ```

6. **(Optional) Run the Webpack dev server for React hot reloading:**
   ```bash
   ./bin/webpack-dev-server
   ```

7. **Visit the app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running Tests

- **Rails model and request specs:**
  ```bash
  bundle exec rspec
  ```

- **(Optional) JavaScript/React tests:**
  If you add frontend tests, run them with:
  ```bash
  yarn test
  ```

## Project Structure

- `app/models/` — Rails models (User, Candidate, Vote)
- `app/controllers/` — Rails controllers (Sessions, Votes, Home)
- `app/javascript/components/` — React components (Home, SignInForm, VoteForm, Results)
- `spec/` — RSpec tests

## Notes
- Passwords are stored in plain text for demo purposes and seeded via the seeds file. This is not cool, and I would put more time into auth. This is fake auth for demonstration purposes.
- Controllers are handling a bit too much logic. I would extract much of this into service classes in the real world.
- I leveraged AI tooling for **much** of the frontend code. There were a lot of specific UI elements that I would need a lot more time to implement. 