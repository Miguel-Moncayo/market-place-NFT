import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    // Validate required fields
    const { name, email, subject, message } = body;
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'El formato del email no es válido' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Save to database using Prisma
    // 2. Send email using a service like SendGrid, Nodemailer, etc.
    // 3. Log the contact form submission
    
    // For demonstration, we'll just log to console
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // Simulate database save (in a real app, you would use Prisma)
    // Example:
    // const contact = await prisma.contact.create({
    //   data: {
    //     name,
    //     email,
    //     subject,
    //     message,
    //   },
    // });

    // Simulate email sending
    // In a real app, you would use a service like SendGrid, Nodemailer, etc.
    console.log(`Email would be sent to: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);

    // Return success response
    return NextResponse.json(
      { 
        message: 'Mensaje enviado exitosamente',
        data: {
          name,
          email,
          subject,
          timestamp: new Date().toISOString(),
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Método no permitido' },
    { status: 405 }
  );
}