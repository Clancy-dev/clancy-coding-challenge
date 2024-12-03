import fs from 'fs'
import path from "path";

export function getCategories() {
    //filepath or where it is located
    const filePath = path.join(process.cwd(),"categories.json");
    // we be saying that check in the current working directory(cwd) and check for the file called categories.json
    //reading the content in that file
    const fileContent = fs.readFileSync(filePath,'utf8');
    //putting the file content in a format that javascript understands the object format aka normal javascript objects
    const categories = JSON.parse(fileContent)
    return categories;

}
