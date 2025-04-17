// app/api/employees/[id]/route.ts
import { NextResponse } from 'next/server';

let employees = [
  { id: 1, name: 'Alice', position: 'Manager' },
  { id: 2, name: 'Bob', position: 'Therapist' },
];

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  employees = employees.filter(emp => emp.id !== id);
  return NextResponse.json({ message: 'Deleted' });
}
