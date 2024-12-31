import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EditorModule } from './editor/editor.module';
import config from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      cache: true,
      expandVariables: true,
    }),
    EditorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
