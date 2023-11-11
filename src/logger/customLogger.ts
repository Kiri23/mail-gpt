import { Injectable, ConsoleLogger, LoggerService } from '@nestjs/common';

@Injectable()
export class CustomLogger extends ConsoleLogger implements LoggerService {
  log(message: string, context?: string) {
    // Custom logic goes here
    super.log(message, context); // Call the base class method to retain default behavior
  }

  // You can also override error, warn, debug, and verbose methods similarly
  error(message: string, trace: string, context?: string) {
    // Custom logic for error messages
    super.error(message, trace, context);
  }
}
