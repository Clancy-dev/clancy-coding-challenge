//step 7 Models
//If you want to create a model for products the model name should be product(singular)
// Products => Product
//If you want to create a model for Courses the model name should be Course(singular)
// Courses => Course

//Note: But remember to create a model we need to first create a schema. And to create a schema we must import that schema from mongoose as below, model and existing models.
import { Schema,model,models } from "mongoose";

const coarseSchema = new Schema(
    {
        title: String,
        description: String,
        image: String,
        // tags: [String],
        // if you want more you can add them but for now we only want title and description.

    },
    {
        // you can also attach this one to show the date when it was created and when it was updated by creating timestamps as below
        timestamps:true

    }
);

//After we have finished creating our schema then we are now free to create our model as below
//Note: Remember it should start with a capital letter and and it should be singular.eg Course
// const Course = models.Course Note it checks the database if the model exists and if it doesn't then it we declare the model which takes in to things the Course and the courseSchema

const Product = models.Product || model("Product",coarseSchema)
export default Product; //This helps us to use it in any place.

//After that above step we can now start to perform our crud operations.
