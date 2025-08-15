import { NextRequest, NextResponse } from 'next/server';
import { mockNFTs } from '@/lib/data/nfts';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // Filter by category if provided
    let filteredNFTs = mockNFTs;
    if (category && category !== 'all') {
      filteredNFTs = mockNFTs.filter(nft => nft.category === category);
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json({
      success: true,
      data: filteredNFTs,
      total: filteredNFTs.length,
      categories: [...new Set(mockNFTs.map(nft => nft.category))],
    });

  } catch (error) {
    console.error('Error fetching NFTs:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Error al obtener los NFTs',
        data: [],
        total: 0
      },
      { status: 500 }
    );
  }
}