# SearchAPI.site

### Description

[SearchAPI.site](https://searchapi.site) is a tool that provides API to search on some popular platforms such as Google, Youtube, Bing, Yahoo, etc.

> From the author: I made it for N8N or any automation workflows.

## API Docs

https://searchapi.site/api-docs

## Stack

- [x] Node.js (TypeScript)
- [x] Express.js
- [x] Prisma (PostgreSQL)
- [x] Auth (Lucia)
- [x] Zod
- [x] Template Engine (EJS)
- [x] Styling with TailwindCSS
- [x] Commitlint
- [x] Swagger UI

## Features
- [x] Google - Web Search
  - [x] Search a single keyword
  - [ ] Search multiple keywords
- [x] Google - Image Search
- [x] Google - YouTube Search
- [ ] Google - Maps Search
- [x] Bing - Web Search
- [ ] Bing - Image Search
- [ ] Reddit
- [ ] X/Twitter
- [ ] Facebook Search
- [ ] Facebook Group Search
- [ ] Instagram
- [ ] TikTok

## Development

Create `.env` from `.example.env`

Then:

```bash
bun i
bun dev
# OR
npm i
npm run dev
```

## Docker

```bash
docker build -t local/bun-express-starter -f Dockerfile .
docker run -p 3000:3000 local/bun-express-starter
# OR
docker compose up
```

## Deploy with [DXUP](https://dxup.dev)

```bash
dx up
# dx up --prod
```

## CI/CD

- [x] Github Actions: Create Pull Request to `main` branch will trigger a build and push to `preview` environment
- [x] Github Actions: Merge Pull Request to `main` branch will trigger a build and push to `production` environment

## Author

Please feel free to contribute to this project!

- X: [Goon Nguyen](https://x.com/goon_nguyen)
- CTO at [TOP GROUP](https://wearetopgroup.com), [DIGITOP](https://digitop.vn) & [XinChao Live Music](https://xinchao.world)

## Check out my other products

- [IndieBoosting.com](https://indieboosting.com) - A platform that help you reach your target audience, and accelerate growth effortlessly.
- [DigiCord AI](https://digicord.site) - The Most Useful AI Chatbot on Discord
- [BoostTogether.com](https://boosttogether.com) - The Power of WE in Advertising
- [TopRanking.ai](https://topranking.ai) - AI Directory, listing AI products
- [ZII.ONE](https://zii.one) - Personalized Link Shortener
- [VidCap.xyz](https://vidcap.xyz) - Extract Youtube caption, download videos, capture screenshot, summarize,…
- [ReadTube.me](https://readtube.me) - Write blog articles based on Youtube videos
- [AIVN.Site](https://aivn.site) - Face Swap, Remove BG, Photo Editor,…
- [GetViral.Now](https://getviral.now) - KOL booking better together!
- [SaveDB.site](https://savedb.site) - API to backup your database and store it in the cloud

Thank you!