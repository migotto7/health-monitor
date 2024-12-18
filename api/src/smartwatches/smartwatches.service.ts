import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateFakeSmartwatchData } from './helpers/smartwatches.faker_helper';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SmartwatchesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async findOrCreate(code: string, userId: number) {
    const smartwatch = await this.prisma.smartwatch.findFirst({
      where: { code },
    });

    if (smartwatch) {
      await this.usersService.registerSmartWatch(userId, code);
      return smartwatch;
    }

    const watch = await this.prisma.smartwatch.create({
      data: { code, ...generateFakeSmartwatchData() },
    });

    await this.usersService.registerSmartWatch(userId, code);
    return watch;
  }

  async updateAllValues() {
    const smartwatches = await this.prisma.smartwatch.findMany();

    if (smartwatches.length === 0) return;

    for (const smartwatch of smartwatches) {
      await this.prisma.smartwatch.update({
        where: { code: smartwatch.code },
        data: generateFakeSmartwatchData(),
      });
    }
  }

  onModuleInit() {
    setInterval(async () => {
      await this.updateAllValues();
    }, 5000);
  }
}
