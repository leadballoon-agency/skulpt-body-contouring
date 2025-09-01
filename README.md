# Skulpt Body Contouring - ProMax Lipo Assessment Tool

A sophisticated, gamified assessment tool for qualifying leads for ProMax Lipo treatments, specifically targeting post-weight-loss clients (especially those using GLP-1 medications like Ozempic/Mounjaro).

## Features

- **Personalised Journey**: Captures user name and creates personalised experience
- **Smart Qualification**: Self-qualifying assessment that identifies ideal candidates
- **Points System**: Gamified experience without being childish
- **Database Integration**: Tracks complete client journey from assessment to booking
- **WhatsApp Integration**: Exclusive access to before/after photos post-assessment
- **Booking System**: Integrated booking modal with tracking

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript for maximum performance
- **Deployment**: Vercel with serverless functions
- **Database**: Vercel Postgres for persistent data storage
- **Analytics**: Event tracking for conversion optimization

## Setup

1. Clone the repository:
```bash
git clone https://github.com/leadballoon-agency/skulpt-body-contouring.git
cd skulpt-body-contouring
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your Vercel Postgres credentials
   - Update WhatsApp number if needed

4. Deploy to Vercel:
```bash
vercel
```

## Database Schema

### assessments table
- Stores complete assessment data
- Tracks qualification status
- Links to client journey events

### client_journey table
- Tracks all user interactions
- Events: assessment_completed, whatsapp_clicked, booking_opened, etc.
- Enables conversion funnel analysis

## Key Features

### Qualification Logic
- **Perfect for ProMax**: Loose skin from rapid weight loss
- **Good candidates**: Skin tightening, toning, cellulite
- **Not suitable**: Pigmentation issues (recommends alternatives)

### UK-Specific
- Uses UK spellings throughout
- WhatsApp number: +44 7700 173390
- Focus on GLP-1 weight loss epidemic

## Analytics Events

- `assessment_completed`: User completes assessment
- `whatsapp_clicked`: User requests before/afters
- `booking_opened`: User opens booking modal
- `booking_completed`: User completes booking (when integrated)

## Environment Variables

Required in production:
- `POSTGRES_URL`: Database connection string
- `WHATSAPP_NUMBER`: WhatsApp business number

## Deployment

The site auto-deploys to Vercel on push to main branch.

Production URL: [Your Vercel URL]

## License

Private repository - All rights reserved