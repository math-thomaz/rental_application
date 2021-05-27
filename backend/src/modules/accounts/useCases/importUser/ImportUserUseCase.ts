import { hash } from "bcryptjs";
import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IImportUser {
  name: string;
  email: string;
  password: string;
  driver_license: string;
}

@injectable()
class ImportUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  loadUsersFromFile(file: Express.Multer.File): Promise<IImportUser[]> {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(file.path);
      const users: IImportUser[] = [];

      const csvParseFile = csvParse({
        from_line: 2,
      });

      readStream.pipe(csvParseFile);

      csvParseFile
        .on("data", async (line) => {
          const [name, email, password, driver_license] = line;
          users.push({ name, email, password, driver_license });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(users);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const loadUsers = await this.loadUsersFromFile(file);

    loadUsers.map(async (user) => {
      const { name, email, password, driver_license } = user;

      const existUser = await this.usersRepository.findByEmail(email);

      if (!existUser) {
        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
          name,
          email,
          password: passwordHash,
          driver_license,
        });
      }
    });
  }
}

export { ImportUserUseCase };
