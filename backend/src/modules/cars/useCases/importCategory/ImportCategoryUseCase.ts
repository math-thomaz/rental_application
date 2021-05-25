import csvParse from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

// Objetivos
// Vamos precisar de uma interface IImportCategory contendo name e description;
// Dentro do constructor, instancie o ICategoriesRepository;
// Crie uma função que receberá como argumento o Express.Multer.File e vai retornar
// promise com IImportCategory[];
// Nesta função, precisamos retornar uma new Promise(), que receberá uma arrow function
// com dois argumentos: resolve e reject;
// Dentro da arrow function, precisará de:
// Uma const para receber o fs.createReadStream(), passando o file.path;
// Uma const para receber um array de IImportCategory[];
// Uma const para receber o csvParse();
// Agora, vai disparar a const do fs.createReadStream e utilizar o método pipe(),
// passando a const que instanciou o csvParse();
// Vai disparar a const que instanciou o csvParse() para usar o método .on(). Vamos
// utilizá-lo em três situações:

// 1ª situação: receberá como argumento o 'data' e uma arrow function async. Para cada (line),
// vamos retornar a seguinte informação:
// Declare uma const desestruturada em um [ array ], passando as informações da
// interface IImportCategory: name e description, que receberão o valor de line.
// Utilize o método .push() sobre a const que instanciou um array de IImportCategory[],
// passando um objeto com os mesmos name e description;

// 2ª situação: receberá como argumento o 'end', que receberá uma arrow function.
// Vamos retornar a seguinte informação:
// Dispare o unlink() de fs.promises, que receberá o file.path como argumento;
// Em seguida dispare o resolve(), passando a const que instanciou o array de
// IImportCategory[];

// 3ª situação: receberá como argumento o 'error', passando uma arrow function.
// Para cada err, vamos retornar a seguinte informação:
// dispare o reject(), passando o err como argumento;

// Vamos para o execute(), que também receberá o file: Express.Multer.File e retornará
// uma Promise<void>
// Declare uma const para disparar a função que acabamos de criar, passando o próprio
// file como argumento;
// Antes de dispararmos o método create(), vamos verificar se a categoria não existe,
// através do método findByName()

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  loadCategoriesFromFile(
    file: Express.Multer.File
  ): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const csvParseFile = csvParse();

      readStream.pipe(csvParseFile);

      csvParseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const loadCategories = await this.loadCategoriesFromFile(file);

    loadCategories.map(async (category) => {
      const { name, description } = category;

      const existCategory = await this.categoriesRepository.findByName(name);

      if (!existCategory) {
        await this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }
}

export { ImportCategoryUseCase };
