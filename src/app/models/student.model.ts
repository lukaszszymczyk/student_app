export class Student {
  _id: string;
  full_name: string;
  field_of_study: FieldType;
  faculty: string;
  university: string;
}

export interface FieldType {
  _id: string;
  name: string;
}
