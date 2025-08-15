import { NextRequest, NextResponse } from 'next/server';
import { mockTestimonials } from '@/lib/data/testimonials';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    
    // Apply limit if provided
    let testimonials = mockTestimonials;
    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum) && limitNum > 0) {
        testimonials = mockTestimonials.slice(0, limitNum);
      }
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json({
      success: true,
      data: testimonials,
      total: testimonials.length,
    });

  } catch (error) {
    console.error('Error fetching testimonials:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Error al obtener los testimonios',
        data: [],
        total: 0
      },
      { status: 500 }
    );
  }
}