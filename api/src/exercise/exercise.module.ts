import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [ExerciseController],
  providers: [ExerciseService, PrismaService],
  imports: [UsersModule],
})
export class ExerciseModule {}
