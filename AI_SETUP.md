# AI Setup Instructions

## Quick Start

The AI wizard can work with either OpenAI or Claude (Anthropic). Here's how to set it up:

### Option 1: Using Claude (Recommended)

1. Get your API key from: https://console.anthropic.com/
2. Create a `.env.local` file in the root directory
3. Add your key:
```
ANTHROPIC_API_KEY=your_key_here
AI_PROVIDER=anthropic
```

### Option 2: Using OpenAI

1. Get your API key from: https://platform.openai.com/api-keys
2. Create a `.env.local` file in the root directory
3. Add your key:
```
OPENAI_API_KEY=your_key_here
AI_PROVIDER=openai
```

### Option 3: Use Both (It will choose the best one)

```
ANTHROPIC_API_KEY=your_anthropic_key
OPENAI_API_KEY=your_openai_key
AI_PROVIDER=anthropic  # or 'openai' for preference
```

## Testing the AI Wizard

1. Make sure your `.env.local` file is set up
2. Restart the dev server: `npm run dev`
3. Go to: http://localhost:3000/ai-wizard
4. Enter any website URL to analyze

## How It Works

When you enter a website URL:

1. **Scrapes the website** - Extracts content, services, CTAs, pricing
2. **AI Analysis** - Claude/OpenAI analyzes the business type and target audience
3. **Generates Questions** - Creates optimized assessment questions for that industry
4. **Competitor Intel** - Identifies what's working in the industry
5. **Configuration** - Produces ready-to-use widget configuration

## Without API Keys

If you don't add API keys, the wizard will still work but use mock data for demonstration purposes.

## Costs

- **Claude**: ~$0.01-0.02 per analysis
- **OpenAI GPT-4**: ~$0.03-0.05 per analysis

## Advanced Features (Coming Soon)

- Facebook Ads Library integration
- Browser automation for JavaScript-heavy sites
- Competitor ad analysis
- A/B testing recommendations

## Troubleshooting

If the analysis isn't working:

1. Check the console for errors
2. Verify your API key is correct
3. Make sure you have credits in your AI account
4. The website must be publicly accessible (no login required)

## Security Note

Never commit your `.env.local` file to git! It's already in `.gitignore` for safety.