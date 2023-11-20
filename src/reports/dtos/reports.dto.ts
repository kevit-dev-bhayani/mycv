import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  year: number;
  @Expose()
  model: string;
  @Expose()
  price: number;
  @Expose()
  id: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  make: string;
  @Expose()
  mileage: number;
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
  @Expose()
  approved: boolean;
}
