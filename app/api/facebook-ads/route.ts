import { NextRequest, NextResponse } from 'next/server'
import { scrapeFacebookAds, scrapeIndustryAds } from '@/lib/facebook-ads-scraper'

export async function POST(req: NextRequest) {
  try {
    const { searchTerm, industry, location } = await req.json()
    
    if (!searchTerm && !industry) {
      return NextResponse.json({ error: 'Search term or industry required' }, { status: 400 })
    }
    
    let results
    
    if (industry) {
      // Search for industry competitors
      results = await scrapeIndustryAds(industry)
      
      // Aggregate insights across all searches
      const totalAds = results.reduce((sum: number, r: any) => sum + r.adsFound, 0)
      const allOffers = results.flatMap((r: any) => r.insights.commonOffers)
      const allPrices = results.flatMap((r: any) => r.insights.pricePoints)
      
      return NextResponse.json({
        success: true,
        industry,
        location,
        totalAdsFound: totalAds,
        searches: results,
        aggregatedInsights: {
          commonOffers: [...new Set(allOffers)],
          pricePoints: [...new Set(allPrices)],
          topAdvertisers: results.flatMap((r: any) => r.ads.map((a: any) => a.advertiser)).filter(Boolean).slice(0, 10)
        }
      })
    } else {
      // Search for specific business
      const data = await scrapeFacebookAds(searchTerm)
      
      return NextResponse.json({
        success: true,
        ...data
      })
    }
  } catch (error) {
    console.error('Facebook Ads API error:', error)
    return NextResponse.json({ 
      error: 'Failed to scrape Facebook Ads',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Facebook Ads Scraper Ready',
    capabilities: [
      'Search specific businesses',
      'Search by industry (body contouring, aesthetics, etc)',
      'Extract ad copy and offers',
      'Identify pricing strategies',
      'Analyze urgency tactics',
      'Find competitor guarantees'
    ],
    usage: {
      specificBusiness: 'POST with {searchTerm: "business name"}',
      industry: 'POST with {industry: "body contouring", location: "london"}'
    }
  })
}