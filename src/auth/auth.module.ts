import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthResolver } from './resolver/auth.resolver';

@Module({
    imports: [
        UsersModule,
        ConfigModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            // global: true,
            useFactory: async (configService: ConfigService) => ({
                signOptions: { expiresIn: '24h' },
                secret: configService.get<string>('JWT_SECRET', 'defaultSecret'),
            }),
        }),
    ],
    providers: [JwtStrategy, LocalStrategy, AuthService, AuthResolver],
    exports: [AuthService],
})
export class AuthModule { }
