import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import chalk from 'chalk';
import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { UserService } from '../../shared/models/user/user-service.interface.js';
import { DefaultRentOfferService, RentOfferModel, RentOfferService } from '../../shared/models/rent-offer/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { DefaultUserService, UserModel } from '../../shared/models/user/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';
import { RentOffer } from '../../shared/types/index.js';

export class ImportCommand implements Command {

  private userService: UserService;
  private rentOfferService: RentOfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.rentOfferService = new DefaultRentOfferService(this.logger, RentOfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(rentOffer: RentOffer) {
    const user = await this.userService.findOrCreate({
      ...rentOffer.creator,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.rentOfferService.create({
      title: rentOffer.title,
      description: rentOffer.description,
      publicationDate: rentOffer.publicationDate,
      city: rentOffer.city,
      preview: rentOffer.preview,
      photos: rentOffer.photos,
      isPremium: rentOffer.isPremium,
      isFavourites: rentOffer.isFavourites,
      rank: rentOffer.rank,
      housingType: rentOffer.housingType,
      roomsCount: rentOffer.roomsCount,
      guestsCount: rentOffer.guestsCount,
      price: rentOffer.price,
      conveniences: rentOffer.conveniences,
      creatorId: user.id,
      commentsCount: rentOffer.commentsCount,
      coordinates: rentOffer.coordinates
    });

  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(chalk.redBright(`Can't import data from file: ${filename}`));
      console.error(chalk.redBright(getErrorMessage(error)));
    }
  }
}
