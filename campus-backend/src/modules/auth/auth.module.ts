import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtGuard } from '../../guards/jwt.guard';
import { JwtStrategy } from './strategies/jwtStrategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { RolesGuard } from '../../guards/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '2000s' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}
