# Electric Survey

Electric Survey is a Django + React application that allows you to ask questions to a synthetic population and view their responses using filters and graphs.

## Getting Started

To get the app running on your local machine, you'll need to have [Docker Compose](https://docs.docker.com/compose/) installed.

1. Add your Grok API key to `/api/.env` by setting the variable `LLM_API_KEY`.

2. From the project root directory, run:

   ```sh
   docker compose up --build
   ```

3. Open your web browser and navigate to [http://localhost:3000/](http://localhost:3000/).

## Using the App

### Creating Questions

1. Initially, there will be no questions. To create a question, type your question text in the `Question text` field and press `Enter` or click the `Create` button.

2. You will be automatically redirected to the question detail page. Initially, there will be no responses. Because we are using Grok's free tier API, we are rate limited to 30 requests per minute. It may take up to a minute for the first 30 responses to appear. Responses will then continue to increase at a rate of 30 per minute until the synthetic population of 500 participants has been fully surveyed. This process takes approximately 17 minutes. You can continue to use the app while responses are being collected in the background.

### Filtering Responses

1. To filter responses, type the value you want to filter by in the relevant field under `Filter Responses`. Filters perform text matching from the start of the value, and multiple filters can be applied simultaneously.

2. The `Age` filter can be specified as a range, for example, `18-36` to return results for participants aged 18 to 36 inclusive.

3. For `Household Income`, you do not need to include the `£` symbol.

### Viewing Charts

1. Click on `Show Charts` at the top right of the results table to toggle between the results table and two charts: a pie chart and a bar chart. These charts will update live as you apply filters.

### Managing Multiple Questions

1. If you ask more questions while the initial question is still being surveyed, the app will make parallel calls to Grok's API. However, the rate limit applies to the entire app, so adding more questions will slow down the survey filling rate proportionately.

2. To stop the question asking process, use `docker compose down`, then `docker compose up` to restart the app. The surveying process will not restart, but existing responses will be preserved.
