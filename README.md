# SaveDB.site

### Description

[SaveDB.site](https://savedb.site) is a tool that provides API to backup databases and upload to cloud storages.

> *"Just save it somewhere and hope we will never need it."*

### Support databases
- [x] PostgreSQL
- [ ] MySQL
- [ ] MariaDB
- [ ] MongoDB

### Support cloud storages
- [x] AWS S3
- [x] Cloudflare R2
- [ ] Google Cloud Storage
- [ ] Azure Blob Storage
- [ ] MinIO
- [ ] Backblaze B2

### Workflow:

We made this as simple as possible: connect to a database, backup it, upload it to cloud storage. **That's it!**

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

- [ ] Github Actions: Create Pull Request to `main` branch will trigger a build and push to `preview` environment
- [ ] Github Actions: Merge Pull Request to `main` branch will trigger a build and push to `production` environment

## Privacy Policy
- We don't store any data
- We don't collect any data
- We don't use any data

## Author

Please feel free to contribute to this project!

- X: [Goon Nguyen](https://x.com/goon_nguyen)
- CTO at [TOP GROUP](https://wearetopgroup.com), [DIGITOP](https://digitop.vn) & [XinChao Live Music](https://xinchao.world)

## Check out my other products

- [DigiCord AI](https://digicord.site) - The Most Useful AI Chatbot on Discord
- [IndieBacklink.com](https://indiebacklink.com) - Indie Makers Unite: Feature, Support, Succeed
- [BoostTogether.com](https://boosttogether.com) - The Power of WE in Advertising
- [TopRanking.ai](https://topranking.ai) - AI Directory, listing AI products
- [ZII.ONE](https://zii.one) - Personalized Link Shortener
- [VidCap.xyz](https://vidcap.xyz) - Extract Youtube caption, download videos, capture screenshot, summarize,…
- [ReadTube.me](https://readtube.me) - Write blog articles based on Youtube videos
- [AIVN.Site](https://aivn.site) - Face Swap, Remove BG, Photo Editor,…
- [GetViral.Now](https://getviral.now) - KOL booking better together!

Thank you!