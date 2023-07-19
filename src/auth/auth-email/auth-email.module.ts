import { Module, forwardRef } from '@nestjs/common';
import { AuthEmailService } from './auth-email.service';
import { AuthEmailController } from './auth-email.controller';
import { DbModule } from 'src/db/db.module';
import { AuthModule } from '../auth.module';
import { MailModule } from 'src/mail/mail.module';
import { UserModule } from 'src/user/user.module';
import { ApiConfigModule } from 'src/config/api-config.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    DbModule,
    MailModule,
    UserModule,
    ApiConfigModule,
    JwtModule,
  ],
  controllers: [AuthEmailController],
  providers: [AuthEmailService],
})
export class AuthEmailModule {}
