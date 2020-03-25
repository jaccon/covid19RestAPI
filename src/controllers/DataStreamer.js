const Config = require('../services/configuration');

module.exports = {

  async update(req, res, next ) {

    const request = require('request');
    
    const fs = require('fs');
    
    let file = fs.createWriteStream(`data.json`);

    await new Promise((resolve, reject) => {
        let stream = request({
            uri: Config.dataApi,
            headers: {
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
              'Accept-Encoding': 'gzip, deflate, br',
              'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
              'Cache-Control': 'max-age=0',
              'Connection': 'keep-alive',
              'Upgrade-Insecure-Requests': '1',
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
            },
            gzip: true
        }).pipe(file)
        .on('finish', () => {
            console.log(`The data is finished downloading.`);
            resolve();
        })
        .on('error', (error) => {
            reject(error);
        })
        })
        .catch(error => {
            console.log(`Something happened: ${error}`);
        });

    return res.status(200).json({'message': 'Updated! '});

    next()
    
  },
  
  async index(req, res){
    
    const fs = require('fs');

    let rawdata = fs.readFileSync('data.json');

    let data = JSON.parse(rawdata);

    return res.status(200).json({data});
   
  },
  
  async indexBr(req, res){

    const fs = require('fs');

    let rawdata = fs.readFileSync('data.json');

    let data = JSON.parse(rawdata);

    const filter = data["Brazil"]

    return res.status(200).json(filter);
    

  }


}