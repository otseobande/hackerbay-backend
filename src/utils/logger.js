import winston from 'winston';

const { format } = winston;

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.json(),
  ),
  transports: [
    new winston.transports.Console({
      format: format.simple(),
    }),
  ],
});

export default logger;
