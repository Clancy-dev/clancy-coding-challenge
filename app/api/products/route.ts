import fs from 'fs'
import path from "path";

export function getProducts() {
    //filepath or where it is located
    const filePath = path.join(process.cwd(),"products.json");//we be saying that check in the current working directory(cwd) and check for the file called products.json
    //reading the content in that file
    const fileContent = fs.readFileSync(filePath,'utf8');
    //putting the file content in a format that javascript understands the object format aka normal javascript objects
    const products = JSON.parse(fileContent)
    return products;

}
