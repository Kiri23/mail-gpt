# Mail GPT: Conceptualizing a Comprehensive Media Aggregator

This repository documents the initial development and research for Mail GPT, an ambitious media aggregator project. Starting with email integration, the project aims to evolve into a comprehensive platform for aggregating and summarizing various media sources, including YouTube videos, Twitter posts, Medium articles, and newsletters.

## Project Vision

The goal is to create a personalized media feed that:
- Aggregates content from multiple sources (email, YouTube, Twitter, Medium, newsletters)
- Categorizes content by topics (e.g., web development, computer vision AI, financials)
- Provides AI-powered summaries of content
- Offers a daily digest of important media based on user interests
- Enables content search and retrieval (e.g., "Show me all emails from PyImageSearch from May to June")

## Current Progress

### Implemented Features
- Email integration with Microsoft Outlook using Microsoft Graph API
- Authentication with Microsoft Authentication Library (MSAL) for Node.js
- Basic email retrieval system

### Research and Conceptual Work
- Exploring vector databases for content clustering
- Investigating OpenAI APIs for content summarization
- Researching integration possibilities for various media sources

## Technical Exploration

1. **Microsoft Graph API and OAuth 2.0**
   - Different authentication flows
   - Authorization Code flow for delegated permissions

2. **NestJS and Express.js**
   - Backend structure
   - Dependency injection and modular architecture

3. **Vector Databases and AI Integration (Research Phase)**
   - Vector representations for content
   - Options like Supabase and OpenAI for vector creation and storage

## Key Challenge Overcome

### Microsoft Authentication Timeouts

**Challenge:** Persistent timeout errors when attempting to authenticate with Microsoft services for personal Outlook accounts, preventing successful implementation of the authentication flow. Lack of clear documentation of why this was happening

**Solution Process:**
1. **Extensive Research and Learning:**
   - Dove deep into Azure Active Directory concepts and Microsoft Graph API documentation
   - Studied authentication flows and their network dependencies
   - Investigated potential causes of persistent timeouts in API calls

3. **Source Code Investigation:**
   - Spent a full day investigating the source code of MSAL Node library
   - Traced the execution flow to understand how authentication requests were being made
   - Identified the network layer as a potential point of failure

4. **Network Protocol Discovery and Resolution:**
   - Discovered that the timeout issue was related to IP protocol version conflicts
   - Implemented a solution to force IPv4 usage, resolving the authentication timeouts:

   ```javascript
   const msalConfig = {
     // ... other config
     system: {
       customAgentOptions: {family: 4},
       // ... other options
     }
   };
   ```

**Key Learnings:**
- Gained in-depth understanding of Azure active directory and Microsoft Graph
- Developed skills in troubleshooting complex, multi-layered technical issues
- Enhanced ability to read and understand third-party library source code
- Improved knowledge of how IP protocol versions can impact application behavior

This experience demonstrates my ability to persist through challenging technical problems, dive deep into source code and documentation, and think creatively to find solutions. It showcases my skills in working with third-party APIs, understanding low-level networking concepts, and implementing secure authentication flows, even when faced with non-obvious obstacles.

## Project Structure

- `src/emails/`: Email integration logic
- `src/auth/`: Microsoft services authentication
- `src/config/`: Configuration and environment variables
- `src/views/`: Handlebars templates for web interface

## Conceptual Features (Not Yet Implemented)

1. **Multi-source Integration:** Expansion to YouTube, Twitter, Medium, and newsletters.

2. **AI-Powered Summarization:** Potential use of OpenAI APIs for content summaries.

3. **Content Clustering:** Plans for vector databases to group related content.

4. **Personalized Daily Digest:** AI-driven system for relevant content compilation.

5. **Advanced Search:** Content retrieval based on specific criteria.

6. **Automatic Categorization:** Content categorization with user modification options.

## For Potential Collaborators and Recruiters

This project demonstrates:
- Microsoft Azure Active Directory and Microsoft Graph
- Secure authentication flow implementation
- Interest in AI and machine learning technologies
- Methodical approach to learning new technologies

While largely conceptual, this project shows vision for complex systems and a structured approach to technology exploration.

## Setup and Installation (Email Integration Component)

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example`)
4. Register an application in Azure AD (instructions in `docs/azure-setup.md`)
5. Run the application: `npm start`

Insights, suggestions, or contributions to these research areas are welcome!