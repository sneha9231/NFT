// pages/api/mint-nft.js
const { exec } = require('child_process');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Execute the script from the scripts directory
      exec('node scripts/mint-nft.js', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing script: ${error.message}`);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }

        console.log('Script executed successfully:', stdout);
        res.status(200).json({ message: 'Script execution initiated.' });
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
