import { 
  type User, 
  type InsertUser, 
  type Product, 
  type InsertProduct,
  type NewsletterSubscription,
  type InsertNewsletter,
  type NewsArticle,
  type InsertNewsArticle
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Newsletter methods
  subscribeNewsletter(email: InsertNewsletter): Promise<NewsletterSubscription>;
  isEmailSubscribed(email: string): Promise<boolean>;
  
  // News methods
  getAllNews(): Promise<NewsArticle[]>;
  getNewsArticle(id: string): Promise<NewsArticle | undefined>;
  createNewsArticle(article: InsertNewsArticle): Promise<NewsArticle>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private newsletters: Map<string, NewsletterSubscription>;
  private newsArticles: Map<string, NewsArticle>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.newsletters = new Map();
    this.newsArticles = new Map();
    
    // Initialize with sample data
    this.initializeSampleProducts();
    this.initializeSampleNews();
  }

  private initializeSampleProducts() {
    const sampleProducts: InsertProduct[] = [
      { 
        name: 'iNdlovu Fedora', 
        price: '295.00', 
        image: 'indlovu', 
        material: 'Felt', 
        category: 'Traditional Artisan',
        itemCode: 'HAT-IND-001',
        stock: 4,
        description: 'Traditional Xhosa and Zulu beadwork on black felt. (Traditional name meaning: Elephant, for its strength and importance).'
      },
      { 
        name: 'iNgonyama Fedora', 
        price: '295.00', 
        image: 'ingonyama', 
        material: 'Straw', 
        category: 'Traditional Artisan',
        itemCode: 'HAT-ING-001',
        stock: 5,
        description: 'Traditional Xhosa and Zulu beadwork on straw. Pristine white straw construction with intricate geometric motifs.'
      },
      { name: 'Classic Fedora', price: '295.00', image: 'fedora', material: 'Felt', category: 'Wide Brim', itemCode: 'HAT-FED-001', stock: 10 },
      { name: 'Panama Summer', price: '325.00', image: 'panama', material: 'Straw', category: 'Wide Brim', itemCode: 'HAT-PAN-001', stock: 8 },
      { name: 'Derby Bowler', price: '275.00', image: 'derby', material: 'Wool', category: 'Classic', itemCode: 'HAT-DRB-001', stock: 12 },
      { name: 'Outback Leather', price: '395.00', image: 'leather', material: 'Leather', category: 'Adventure', itemCode: 'HAT-LTH-001', stock: 6 },
      { name: 'Herringbone Flat', price: '185.00', image: 'flatcap', material: 'Wool', category: 'Casual', itemCode: 'HAT-FLT-001', stock: 15 },
      { name: 'Vintage Cloche', price: '245.00', image: 'cloche', material: 'Felt', category: 'Elegant', itemCode: 'HAT-CLC-001', stock: 7 },
      { name: 'Camel Fedora', price: '295.00', image: 'fedora', material: 'Felt', category: 'Wide Brim', itemCode: 'HAT-FED-002', stock: 4 },
      { name: 'Ivory Panama', price: '325.00', image: 'panama', material: 'Straw', category: 'Wide Brim', itemCode: 'HAT-PAN-002', stock: 3 },
    ];

    sampleProducts.forEach(product => {
      const id = randomUUID();
      this.products.set(id, { 
        ...product, 
        id,
        artisanCost: product.artisanCost || null,
        shippingCost: product.shippingCost || null,
        description: product.description || null
      });
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  // Newsletter methods
  async subscribeNewsletter(newsletter: InsertNewsletter): Promise<NewsletterSubscription> {
    const id = randomUUID();
    const subscription: NewsletterSubscription = {
      id,
      email: newsletter.email,
      subscribedAt: new Date().toISOString(),
    };
    this.newsletters.set(newsletter.email, subscription);
    return subscription;
  }

  async isEmailSubscribed(email: string): Promise<boolean> {
    return this.newsletters.has(email);
  }

  // News methods
  private initializeSampleNews() {
    const sampleNews: InsertNewsArticle[] = [
      {
        title: 'The Art of Hat Blocking: A Timeless Technique',
        excerpt: 'Discover how our master craftsmen shape felt using traditional wooden blocks, a technique unchanged for over a century.',
        image: 'workshop',
        category: 'Craftsmanship',
        publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        title: 'Spring Collection 2024: Lightweight Elegance',
        excerpt: 'Introducing our newest Panama and straw hats, perfect for the warmer months ahead.',
        image: 'panama',
        category: 'New Collection',
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        title: 'Caring for Your Premium Felt Hat',
        excerpt: 'Expert tips on maintaining the shape, color, and longevity of your investment pieces.',
        image: 'material',
        category: 'Care Guide',
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    sampleNews.forEach(article => {
      const id = randomUUID();
      this.newsArticles.set(id, { ...article, id });
    });
  }

  async getAllNews(): Promise<NewsArticle[]> {
    return Array.from(this.newsArticles.values()).sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getNewsArticle(id: string): Promise<NewsArticle | undefined> {
    return this.newsArticles.get(id);
  }

  async createNewsArticle(insertArticle: InsertNewsArticle): Promise<NewsArticle> {
    const id = randomUUID();
    const article: NewsArticle = { ...insertArticle, id };
    this.newsArticles.set(id, article);
    return article;
  }
}

export const storage = new MemStorage();
