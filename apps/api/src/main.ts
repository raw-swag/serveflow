import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import { TransformInterceptor } from './common/transform.interceptor';
import { ConfigService } from '@nestjs/config';

export function configureCors(allowedOrigins: string[]) {
  return {
    origin: (
      incomingOrigin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      // Allow non-browser requests (e.g. mobile apps, curl, server-to-server) where incomingOrigin is undefined
      if (!incomingOrigin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(incomingOrigin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked request from unauthorized origin: ${incomingOrigin}`),
        false,
      );
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Request-Id'],
  };
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const allowedOrigins = configService.get<string[]>('CORS_ORIGINS') || [
    'http://localhost:3000',
    'http://localhost:4000',
  ];
  const port = configService.get<number>('PORT') || 4000;
  const prefix = configService.get<string>('API_PREFIX') || '/api/v1';

  const cleanPrefix = prefix.startsWith('/') ? prefix.substring(1) : prefix;
  app.setGlobalPrefix(cleanPrefix);

  app.enableCors(configureCors(allowedOrigins));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(port);
  console.log(`[ServeFlow] API engine listening on: http://localhost:${port}/${cleanPrefix}`);
}

// Only execute bootstrap when directly invoked as main entrypoint
if (require.main === module) {
  bootstrap();
}
