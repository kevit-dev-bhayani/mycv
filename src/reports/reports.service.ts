import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';
@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  createEstimate({ make, lng, lat, year, mileage }: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('lng - :lng BETWEeN -5 AND 5', { lng })
      .andWhere('approved IS TRUE')
      .andWhere('lat - :lat BETWEeN -5 AND 5', { lat })
      .andWhere('year - :year BETWEeN -3 AND 3', { year })
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawMany();
  }

  async changeApproval(id: number, approve: boolean) {
    console.log(id);
    const report = await this.repo.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException('report not found');
    }
    report.approved = approve;
    return this.repo.save(report);
  }
}
