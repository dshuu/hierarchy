const fs = require('fs')
const path = require('path')
const readline = require('readline')
const stream = require('stream')

let outStream = fs.createWriteStream('output.txt'),
inStream = fs.createReadStream(path.join(__dirname,'./promise.html'))

const readliner = readline.createInterface({
  input:inStream,
  terminal:true
})

readliner.on('line',chunk=>{
  console.log('chunk==>',chunk);
  outStream.write(chunk+'\n')
})

readliner.on('close',()=>{
  console.log('a');
})
