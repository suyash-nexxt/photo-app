import { Gallery, Prisma } from '@prisma/client';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

// GET /api/galleries
// Retrieve all galleries
export async function all(): Promise<Gallery[]> {
  const response = await fetch('/api/galleries');
  const json = await response.json();

  if (!response.ok) {
    throw json;
  }

  return json;
}

// GET /api/galleries/:id
// Retrieve a single gallery
export async function get(id: number): Promise<Gallery> {
  const response = await fetch(`api/galleries/${id}`);
  const json = await response.json();

  if (!response.ok) {
    throw json;
  }

  return json;
}

// POST /api/galleries/create
// Create a gallery
export async function create(
  gallery: Prisma.GalleryCreateInput
): Promise<Gallery> {
  const response = await fetch('api/galleries/create', {
    method: 'POST',
    body: JSON.stringify(gallery),
    headers,
  });

  const json = await response.json();

  if (!response.ok) {
    throw json;
  }

  return json;
}

// PATCH /api/galleries/:id/update
// Update a gallery
export async function update(
  id: number,
  gallery: Prisma.GalleryUpdateInput
): Promise<Gallery> {
  const response = await fetch(`/api/galleries/${id}/update`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(gallery),
  });

  const json = await response.json();

  if (!response.ok) {
    throw json;
  }

  return json;
}

// DELETE /api/galleries/:id/delete
// Delete a gallery
export async function destroy(id: number): Promise<Gallery> {
  const response = await fetch(`/api/galleries/${id}/delete`, {
    method: 'DELETE',
    headers,
  });

  const json = await response.json();

  if (!response.ok) {
    throw json;
  }

  return json;
}
