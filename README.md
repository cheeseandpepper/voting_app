# Voting App

## Summary

This is a very quick implementation, of a voting app with the following rules:
 - Must be signed in to vote
 - Can see the results whether signed in or not
 - Results are in the format of name | count
 - User can vote only once
 - User can choose existing candidate or add a new (adding a new constitutes a vote)
 - 10 Users are seeded, 0-9 with email address user0@example.com and zip code 00000. Repeat pattern for each user.

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
- Passwords are stored in plain text for demo purposes and seeded via the seeds file. This is not cool, and I would put more time into auth. This is fake auth for demonstration purposes. There are 10 users available. See `db/seeds.rb` 
- Controllers are handling a bit too much logic. I would extract much of this into service classes in the real world.
- I started down a path of some sort of similarity full_name matching. The most crude implementation I could support would be to attempt to parse a full name and attempt to break it into first/middle/last, then if not found by full name, attempt to find by first/last. That's not very specific, and probably has a low success rate. My next inclination would be to use pg_search with a tsvector index, but this uses sqlite and I didn't have time to set that up. (I did see sqlite has a full text option, but I've never used it). I'd also consider elasticsearch fuzzy matching. And finally, to make it nice for the user, have a suggestion like "Did you mean [Canonical Name]?" and that would help. 
- I leveraged AI tooling for **much** of the frontend code. There were a lot of specific UI elements that I would need a lot more time to implement. 