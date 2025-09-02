const mongoose = require('mongoose');
const Book = require('./models/book.js');
const Author = require('./models/author.js');
const Category = require('./models/category.js');

mongoose.connect("mongodb+srv://amohned346:KJKDsSxLEeHjYova@cluster0.ma3bbjx.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    await Book.deleteMany({});
    await Author.deleteMany({});
    await Category.deleteMany({});

    // Create authors
    const author1 = new Author({
      name: 'J.K. Rowling',
      bio: 'British author best known for the Harry Potter series',
      birthDate: new Date('1965-07-31')
    });

    const author2 = new Author({
      name: 'George R.R. Martin',
      bio: 'American novelist and short-story writer',
      birthDate: new Date('1948-09-20')
    });

    const author3 = new Author({
      name: 'Agatha Christie',
      bio: 'English writer known for her detective novels',
      birthDate: new Date('1890-09-15')
    });

    const author4 = new Author({
      name: 'Sam Kean',
      bio: 'Sam Kean is the New York Times-bestselling author of seven books. He spent years collecting mercury from broken thermometers as a kid, and now lives in Washington, D.C. His stories have appeared in The Best American Science and Nature Writing, The New Yorker, The Atlantic, and Slate, among other places, and his work has been featured on NPR’s “Radiolab”, “Science Friday”, and “All Things Considered.” The Bastard Brigade was a “Science Friday” book of the year, while Caesar’s Last Breath was the Guardian science book of the year.',
      birthDate: new Date('1890-09-15')
    });
    const author5 = new Author({
      name: 'Riley Black',
      bio: 'Riley Black has been heralded as “one of our premier gifted young science writers” and is the critically-acclaimed author of Skeleton Keys, My Beloved Brontosaurus, Written in Stone, and When Dinosaurs Ruled. An online columnist for Scientific American, Riley has become a widely-recognized expert on paleontology and has appeared on programs such as Science Friday, HuffingtonPost Live, and All Things Considered. Riley has also written on nerdy pop culture.',
      birthDate: new Date('1890-09-15')
    });

    const [savedAuthor1, savedAuthor2, savedAuthor3,savedAuthor4,savedAuthor5] = await Author.insertMany([author1, author2, author3,author5,author4]);

    const category1 = new Category({ name: 'Fantasy', description: 'Fantasy books' });
    const category2 = new Category({ name: 'Mystery', description: 'Mystery novels' });
    const category3 = new Category({ name: 'Adventure', description: 'Adventure stories' });
    const category4 = new Category({ name: 'Science', description: 'Science (from the Latin scientia, meaning “knowledge”) is the effort to discover, and increase human understanding of how the physical world works. Through controlled methods, science uses observable physical evidence of natural phenomena to collect data, and analyzes this information to explain what and how things work.' });

    const [savedCategory1, savedCategory2, savedCategory3,savedCategory4] = await Category.insertMany([category1, category2, category3,category4]);


    const book1 = new Book({
      title: 'Harry Potter and the Philosopher\'s Stone',
      description: 'Harry Potter has no idea how famous he is. That\'s because he\'s being raised by his miserable aunt and uncle who are terrified Harry will learn that he\'s really a wizard, just as his parents were. But everything changes when Harry is summoned to attend an infamous school for wizards, and he begins to discover some clues about his illustrious birthright. From the surprising way he is greeted by a lovable giant, to the unique curriculum and colorful faculty at his unusual school, Harry finds himself drawn deep inside a mystical world he never knew existed and closer to his own noble destiny.',
      publishDate: new Date('1997-06-26'),
      pageCount: 223,
      author: savedAuthor1._id,
      coverImage:"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1474154022i/3.jpg",
      categories: [savedCategory1._id, savedCategory3._id],
      price: 12.99,
      stock: 50
    });
    const book5 = new Book({
      title: 'Dinner with King Tut',
      description: 'From the mighty pyramids of Egypt to the majestic temples of the Aztec, we have a good idea of what the past looked like. But what about our other senses: The tang of Roman fish sauce, and the springy crust of Egyptian sourdough? The boom of medieval cannons and clash of Viking swords? The breathless plays of an Aztec ballgame, and the chilling reality that the losers might also lose their lives?',
      publishDate: new Date('2025-07-08'),
      coverImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1742517406i/221179212.jpg",
      pageCount: 464,
      author: savedAuthor4._id,
      categories: [savedCategory4._id],
      price: 16.99,
      stock: 34
    });
    const book6 = new Book({
      title: 'When the Earth Was Green: Plants, Animals, and Evolution\'s Greatest Romance',
      description: 'Winner, A Friend of Darwin Award,\n 2024 A gorgeously composed narrative nonfiction book about the longstanding relationship between prehistoric plants and life on Earth.\nImmaculately framed by ancient stone, the leaves look as if they were pressed between the gray pages of a great geological diary. If we were to see the plant alive, we would simply pass it by, but the fossil is a whisper from a time more than 55 million years ago, when alligators dwelled within the Arctic Circle and gigantic dragonflies buzzed through the air. This little plant is an entry-point into this lost world. Past, present, and future, this ancient specimen has roots in all of them.',
      publishDate: new Date('2025-02-25'),
      coverImage: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1718938521i/211003956.jpg",
      pageCount: 464,
      author: savedAuthor5._id,
      categories: [savedCategory4._id],
      price: 16.99,
      stock: 34
    });

    const book2 = new Book({
      title: 'A Game of Thrones',
      description: 'In a land where summers can last decades and winters a lifetime, trouble is brewing. The cold is returning, and in the frozen wastes to the North of Winterfell, sinister and supernatural forces are massing beyond the kingdom’s protective Wall. At the center of the conflict lie the Starks of Winterfell, a family as harsh and unyielding as the land they were born to. Sweeping from a land of brutal cold to a distant summertime kingdom of epicurean plenty, here is a tale of lords and ladies, soldiers and sorcerers, assassins and bastards, who come together in a time of grim omens. Amid plots and counterplots, tragedy and betrayal, victory and terror, the fate of the Starks, their allies, and their enemies hangs perilously in the balance, as each endeavors to win that deadliest of conflicts: the game of thrones.',
      coverImage:"https://m.media-amazon.com/images/I/81d1Rl84ccL._UF1000,1000_QL80_.jpg",
      publishDate: new Date('1996-08-01'),
      pageCount: 694,
      author: savedAuthor2._id,
      categories: [savedCategory1._id],
      price: 15.99,
      stock: 30
    });

    const book4 = new Book({
      title: 'A Storm of Swords',
      description:"Here is the third volume in George R. R. Martin’s magnificent cycle of novels that includes A Game of Thrones and A Clash of Kings. As a whole, this series comprises a genuine masterpiece of modern fantasy, bringing together the best the genre has to offer. Magic, mystery, intrigue, romance, and adventure fill these pages and transport us to a world unlike any we have ever experienced. Already hailed as a classic, George R. R. Martin’s stunning series is destined to stand as one of the great achievements of imaginative fiction.",
      coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqoK8L5uHeYpBbDGeX4SSCWH7sWNcK2kL5cg&s',
      publishDate: new Date('1998-08-01'),
      pageCount: 694,
      author: savedAuthor2._id,
      categories: [savedCategory1._id],
      price: 15.99,
      stock: 30
    });

    const book3 = new Book({
      title: 'Murder on the Orient Express',
      description: 'Just after midnight, a snowdrift stops the famous Orient Express in its tracks as it travels through the mountainous Balkans. The luxurious train is surprisingly full for the time of the year but, by the morning, it is one passenger fewer. An American tycoon lies dead in his compartment, stabbed a dozen times, his door locked from the inside.\nOne of the passengers is none other than detective Hercule Poirot. On vacation.\nIsolated and with a killer on board, Poirot must identify the murderer—in case he or she decides to strike again.',
      isbn: '9780007119318',
      publishDate: new Date('1934-01-01'),
      pageCount: 274,
      coverImage:"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1733926500i/853510.jpg",
      author: savedAuthor3._id,
      categories: [savedCategory2._id],
      price: 9.99,
      stock: 40
    });

    await Book.insertMany([book1, book2, book3,book4,book5,book6]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
});