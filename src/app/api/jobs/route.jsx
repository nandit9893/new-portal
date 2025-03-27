import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Directory to save job data
const JOBS_DIR = path.join(process.cwd(), 'data', 'jobs');

export async function POST(request) {
  try {
    // Create data directory if it doesn't exist
    await fs.mkdir(JOBS_DIR, { recursive: true });

    const formData = await request.formData();
    
    const jobData = {
      id: Date.now().toString(),
      jobTitle: formData.get('jobTitle'),
      company: formData.get('company'),
      category: formData.get('category'),
      location: formData.get('location'),
      jobType: formData.get('jobType'),
      experience: formData.get('experience'),
      jobDescription: formData.get('jobDescription'),
      skills: JSON.parse(formData.get('skills')),
      keyResponsibilities: JSON.parse(formData.get('keyResponsibilities')),
      jobPackage: formData.get('jobPackage'),
      selectedTags: JSON.parse(formData.get('selectedTags')),
      createdAt: new Date().toISOString()
    };

    // Handle file upload if present
    const file = formData.get('companyLogo');
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${jobData.id}-${file.name}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(path.join(uploadDir, filename), buffer);
      jobData.companyLogo = `/uploads/${filename}`;
    }

    // Save job data to JSON file
    const jobFilePath = path.join(JOBS_DIR, `${jobData.id}.json`);
    await fs.writeFile(jobFilePath, JSON.stringify(jobData, null, 2));

    return NextResponse.json({ 
      message: 'Job created successfully', 
      jobId: jobData.id 
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}