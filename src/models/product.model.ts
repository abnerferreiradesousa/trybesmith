import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../interfaces/product.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Product[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Products');
    const [rows] = result;
    return rows as Product[];
  }

  public async create(name: string, amount: string): Promise<Product> {
    const result = await this.connection
      .execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const [rows] = result;
    const { insertId } = rows;
    return {
      id: insertId,
      name,
      amount,
    };
  }

  public async update(orderId: number, id: number): Promise<number> {
    const result = await this.connection
      .execute<ResultSetHeader>(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
      [orderId, id],
    );
    const [rows] = result;
    const { insertId } = rows;
    return insertId;
  }
}