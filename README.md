# AI-Powered News Aggregator

This web application aggregates news from multiple sources, summarizes articles using AI, categorizes them, and provides personalized recommendations based on user interests.

## Features

-   **News Aggregation:** Fetches news from various sources (Google News, Bing News, NewsAPI, RSS feeds).
-   **AI-Powered Summarization:** Uses OpenAI's API (GPT) or PrivateGPT to summarize articles.
-   **Categorization:** Automatically categorizes news articles.
-   **Personalized Recommendations:** Provides news recommendations based on user interests.
-   **User Authentication:** Supports OAuth (Google, GitHub) and JWT authentication.
-   **Responsive Frontend:** Built with React (Next.js optional) and Tailwind CSS.
-   **Backend API:** Developed with Node.js and Express.js.
-   **Database:** Uses MongoDB for data storage.
-   **Caching:** Implements Redis for efficient data caching.
-   **Docker Support:** Containerized application for easy deployment.

## Technologies Used

-   **Frontend:**
    -   React (or Next.js)
    -   Tailwind CSS
-   **Backend:**
    -   Node.js
    -   Express.js
-   **Database:**
    -   MongoDB
-   **Caching:**
    -   Redis
-   **AI:**
    -   OpenAI API (GPT) or PrivateGPT
    -   (Optional) LangChain
-   **Authentication:**
    -   OAuth (Google, GitHub)
    -   JWT
-   **Containerization:**
    -   Docker
    -   Docker Compose

## Setup Instructions

### Local Setup (Without Docker)

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Configure environment variables:**

    -   Create a `.env` file in the `backend` directory.
    -   Add the following environment variables:

        ```
        PORT=<your_port>
        MONGO_URI=mongodb://localhost:27017/ai-news
        REDIS_URL=redis://localhost:6379
        OPENAI_API_KEY=<your_openai_api_key> (or PrivateGPT settings)
        GOOGLE_CLIENT_ID=<your_google_client_id> (if using OAuth)
        GOOGLE_CLIENT_SECRET=<your_google_client_secret> (if using OAuth)
        GITHUB_CLIENT_ID=<your_github_client_id> (if using OAuth)
        GITHUB_CLIENT_SECRET=<your_github_client_secret> (if using OAuth)
        JWT_SECRET=<your_jwt_secret> (if using JWT)
        NEWSAPI_KEY=<your_newsapi_key> (if using NewsAPI)
        ```

4.  **Start the backend server:**

    ```bash
    npm run dev
    ```

5.  **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

6.  **Configure frontend environment variables:**

    -   Create a `.env.local` file in the `frontend` directory.
    -   Add the following environment variable:

        ```
        NEXT_PUBLIC_API_URL=<your_backend_api_url>
        ```

7.  **Start the frontend development server:**

    ```bash
    npm run dev
    ```

8.  **Database Setup:**
    -   Ensure MongoDB and Redis are running locally.

### Docker Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2.  **Configure environment variables:**
    - Create a `.env` file in the main project directory (same level as docker-compose.yml)
    - Add the following environment variables:

        ```
        OPENAI_API_KEY=<your_openai_api_key> (or PrivateGPT settings)
        GOOGLE_CLIENT_ID=<your_google_client_id> (if using OAuth)
        GOOGLE_CLIENT_SECRET=<your_google_client_secret> (if using OAuth)
        GITHUB_CLIENT_ID=<your_github_client_id> (if using OAuth)
        GITHUB_CLIENT_SECRET=<your_github_client_secret> (if using OAuth)
        JWT_SECRET=<your_jwt_secret> (if using JWT)
        NEWSAPI_KEY=<your_newsapi_key> (if using NewsAPI)
        ```

3.  **Build and run the Docker containers:**

    ```bash
    docker-compose up --build
    ```

4.  **Access the application:**

    -   The frontend will be available at `http://localhost:3000`.

## Usage

1.  Open your browser and navigate to `http://localhost:3000` (or the appropriate port).
2.  Register or log in using OAuth or JWT.
3.  Browse news articles, view summaries, and get personalized recommendations.
4.  Customize your interests to refine recommendations.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Submit a pull request.

## License

[MIT](LICENSE) (or your chosen license)

## Future Improvements

-   Implement more advanced recommendation algorithms.
-   Add support for more news sources.
-   Improve the user interface and user experience.
-   Add user settings for customizing news preferences.
-   Implement push notifications for breaking news.
-   Add more robust error handling and logging.
-   Add more advanced AI features, such as sentiment analysis.
-   Add support for more languages.
