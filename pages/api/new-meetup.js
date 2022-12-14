//api/new-meetup
//POST/api/new-meetup
import { MongoClient } from 'mongodb';
async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const client = await MongoClient.connect(
      'mongodb+srv://iryna:6RwyAY296nVZqKVL@nextjsreactcourse.du60gme.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();
    const meetupsCollections = db.collection('meetups');
    const result = await meetupsCollections.insertOne(data);
    console.log(result);
    client.close();
    res.status(201).json({ message: 'Meetup added' });
  }
}

export default handler;
